const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const DBQuery = require("./setup");
const LoginRegRouter = express.Router();
//signup route
LoginRegRouter.post("/signup", async function (req, res, next) {
  console.log(req.body);
  try {
    const id = Math.floor(Math.random() * 100);
    const hasPassword = await bcrypt.hash(req.body.password, 10);
    query = `INSERT INTO userlogin(ID,NAME,EMAIL,PASSWORD)VALUES('${id}','${req.body.name}','${req.body.email}','${hasPassword}')`;
    // query = `INSERT INTO userlogin(ID,NAME,EMAIL,PASSWORD) VALUES(2,'ismayel','ismayelhossen123@gmail.com','0123');`;
    const result = await DBQuery(query);
    res.status(200).json({
      success: true,
      data: req.body,
      message: "Signup Successfully Done",
    });
  } catch {
    res.status(500).json({
      message: "Signup Failed",
    });
  }
});

//login route
LoginRegRouter.post("/login", async function (req, res, next) {
  const query = `SELECT*FROM USERLOGIN WHERE EMAIL='${req.body.email}' `;
  const findUser = await DBQuery(query);
  try {
    if (findUser && findUser.length > 0) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        findUser[0].PASSWORD
      );

      if (isValidPassword) {
        const token = jwt.sign(
          {
            name: findUser[0].NAME,
            Email: findUser[0].EMAIL,
          },
          process.env.JWT_TOKEN_SECRET,
          {
            expiresIn: 60 * 30,
          }
        );
        res.cookie("cookieName:ismayel", "1", {
          expires: new Date(Date.now() + 900000),
          httpOnly: true,
        });
        res.status(200).json({
          Success: true,
          access_token: token,
          message: "Login successfully",
        });
      } else {
        res.status(200).json({
          Success1: true,
          message: "Authentication failed user password wrong",
        });
      }
    } else {
      res.status(200).json({
        Success1: true,
        message: "Authentication failed user not found",
      });
    }
  } catch {
    await res.status(401).json({
      error: "Authentication failed",
    });
  }
});
module.exports = LoginRegRouter;
