const nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "27678feeb0bb2d",
    pass: "e5a08bd89cbd38"
  }
});

module.exports = transport;
