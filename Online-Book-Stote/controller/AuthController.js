const express = require("express");
const { validationResult } = require("express-validator");
const { success, failure } = require("../output/statements");
const AuthModel = require("../model/AuthModel");
const UserModel = require("../model/UserModel");
const HTTP_STATUS = require("../constants/statusCodes");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const { log } = require("../server/logger");
const path = require("path");
const { promisify } = require("util");
const ejs = require("ejs");
const transport = require("../config/mail");
const ejsRenderFile = promisify(ejs.renderFile);
const crypto=require("crypto");
const { default: moongoose } = require("mongoose");

class AuthController {
  async login(req, res) {
    try {
      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return res
          .status(HTTP_STATUS.OK)
          .send(failure("Failed to log in", validation));
      }
      const { email, password } = req.body;

      const authUser = await AuthModel.findOne({ email })
        .populate("userID", "-createdAt -updatedAt")
        .select("-createdAt -updatedAt");

      if (!authUser) {
        return res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .send(failure("Please sign up to create an account"));
      }

      const passwordMatch = await bcrypt.compare(password, authUser.password);

      if (!passwordMatch) {
        return res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .send(failure("Please provide the correct Email and password."));
      }

      const responseAuth = authUser.toObject();
      delete responseAuth.password;
      //delete responseAuth._id;

      const jwt = jsonwebtoken.sign(responseAuth, process.env.SECRET_KEY, {
        expiresIn: "24h"
      });
      responseAuth.token = jwt;

      return res
        .status(HTTP_STATUS.OK)
        .send(success("You are Logged in successfully!!!", responseAuth));
    } catch (error) {
      console.log(error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send(failure("Internal Server Error"));
    }
  }
  async forgetPasswortEmail(req, res) {
    try {
      const { email } = req.body;
      if (!email || email === "") {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("Email is not send"));
      }
      const FindUser = await AuthModel.findOne({ email: email }).populate(
        "userID"
      );

      if (!FindUser) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("User with this email does not exist."));
      }

      const resetToken = crypto.randomBytes(32).toString("hex");

      FindUser.resetPasswordToken = resetToken;
      FindUser.resetPasswordExpire = Date.now() + 3600000; // Set the reset token to expire in 1 hour
      FindUser.resetPassword = true;
      await FindUser.save();

      const resetURL = path.join(
        process.env.REACT_APP_API_URL,
        "reset-password",
        resetToken,
        FindUser._id.toString()
      );
      const htmlBody = await ejsRenderFile(
        path.join(__dirname, "..", "views", "forgot-password.ejs"),
        {
          name: FindUser.userID.name,
          resetURL: resetURL
        }
      );
      const result = await transport.sendMail({
        from: "bjitresource@gmail.com",
        to: email,
        subject: "Password Reset Request",
        html: htmlBody
      });
      return res
        .status(HTTP_STATUS.OK)
        .send(success("Successfully requested for resetting password"));
    } catch (error) {
      console.log(error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send(failure("Internal Server Error"));
    }
  }

  async resetPassword(req, res) {
    try {
      const { token, userID, newPassword, confirmPassword } = req.body;

      const FindUser = await AuthModel.findOne({ userID: userID });
      if (!FindUser) {
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .send(failure("Invalid Request"));
      }

      const resetTokenExpireTimestamp = FindUser.resetPasswordExpire;
      const currentTimestamp = Date.now();

      if (FindUser.resetPasswordToken !== token || (resetTokenExpireTimestamp && resetTokenExpireTimestamp < currentTimestamp)) {
        return res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .send(failure("Invalid or expired token"));
      }

      if (newPassword !== confirmPassword) {
        return res
          .status(HTTP_STATUS.BAD_REQUEST)
          .send(failure("Password and confirm password do not match"));
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      FindUser.password = hashedPassword;
      FindUser.resetPassword = false;
      FindUser.resetPasswordToken = undefined;
      FindUser.resetPasswordExpire = undefined;

      await FindUser.save();

      return res
        .status(HTTP_STATUS.OK)
        .send(success("Password successfully updated"));
    } catch (error) {
      console.log(error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send(failure("Internal Server Error"));
    }
  }

  async passwordValidation(req, res) {
    try {
        const { token, userID } = req.body;
  
        const FindUser = await AuthModel.findOne({ userID: userID });
        if (!FindUser) {
            return res
            .status(HTTP_STATUS.NOT_FOUND)
            .send(failure("Invalid Request"));
        }
  
        if (FindUser.resetPasswordToken !== token || FindUser.resetPasswordExpire < Date.now()) {
            return res
            .status(HTTP_STATUS.UNAUTHORIZED)
            .send(failure("Invalid or expired token"));
        }
  
        
        return res
            .status(HTTP_STATUS.OK)
            .send(success("Request is still valid"));
      } catch (error) {
        console.log(error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send(failure("Internal Server Error"));
      }
    }
  

  async singnUp(req, res) {
    try {
      log(req.headers + "/ Authentication route was accessed for signning up");
      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return res
          .status(HTTP_STATUS.UNPROCESSABLE_ENTITY)
          .send(failure("Failed to add the user", validation));
      }
      const { name, email, password, phone } = req.body;

      const existingUser = await UserModel.findOne({ email: email });

      if (existingUser) {
        return res
          .status(HTTP_STATUS.CONFLICT)
          .send(failure("User already exists with this email ID"));
      }
      const user = await UserModel.create({
        name: name,
        email: email,
        phone: phone,
        balance: 0,
        role: 2,
        verified: true
      });

      const hashedPassword = await bcrypt.hash(password, 10);

      await AuthModel.create({
        email: email,
        password: hashedPassword,
        role: 2,
        verified: true,
        userID: user._id
      });

      return res
        .status(HTTP_STATUS.CREATED)
        .send(success("Registration successful!!!"));
    } catch (error) {
      console.log(error);
      return res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .send(failure("Internal Server Error"));
    }
  }
}
module.exports = new AuthController();
