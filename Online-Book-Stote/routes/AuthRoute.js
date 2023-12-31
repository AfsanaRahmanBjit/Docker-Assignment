const express = require("express");
const routes = express();
const AuthController = require("../controller/AuthController");
const { authValidator } = require("../middleware/authValidator");


routes.post("/login", authValidator.login,AuthController.login);
routes.post("/sign-up", authValidator.signUp,AuthController.singnUp);
routes.post("/forget-password",AuthController.forgetPasswortEmail);
routes.post("/reset-password",AuthController.resetPassword);
routes.post("/password-validation",AuthController.passwordValidation);

module.exports = routes;