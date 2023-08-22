const express = require("express");
const nodemailer = require("nodemailer");
const mailRoute = express.Router();

mailRoute.get("/send", (req, res, next) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp.gmail.com",
    // port: 465,
    // secure: true,

    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: "ismayel <ismayelhossen125@gmail.com>",
    to: "ismayelhossen123@gmail.com",
    subject: "Message title",
    text: "Plaintext version of the message",
    html: "<h2 style='color:red'>Verification Code:1234</h2>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      console.log("Email accpted: " + info.accepted);
    }
  });

  res.status(200).end(" mail sent successfully");
});

module.exports = mailRoute;
