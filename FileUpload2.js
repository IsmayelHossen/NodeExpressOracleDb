const express = require("express");
const FileUploadRoute_2 = express.Router();
//multer use for work with multiple form data like file uload
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "./uploads/"),
  filename: function (req, file, cb) {
    // null as first argument means no error
    cb(null, Date.now() + "-" + file.originalname);
  },
});

FileUploadRoute_2.post("/imageupload", async (req, res) => {
  try {
    // 'avatar' is the name of our file input field in the HTML form
    let upload = multer({
      storage: storage,
    }).single("avatar");
    upload(req, res, function (err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields
      console.log(req.file);
      if (!req.file) {
        res.status(200).json({
          RequiredSucces: true,
        });
      } else if (req.file.size > 1000000) {
        res.status(200).json({
          RequiredSize: true,
        });
      } else if (
        req.file.mimetype != "image/jpeg" &&
        req.file.mimetype != "image/png" &&
        req.file.mimetype != "image/jpg"
      ) {
        console.log(req.file.mimetype);
        res.status(200).json({
          RequiredFiletype: true,
        });
      } else {
        console.log(req.file);
        console.log(req.file.mimetype);
        res.status(200).json({
          success: true,
          message: "file Uploded successfully",
          data: req.body,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = FileUploadRoute_2;
