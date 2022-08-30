const express = require("express");
const FileUploadRoute = express.Router();
const fs = require("fs");
//multer use for work with multiple form data like file uload
const multer = require("multer");
const path = require("path");
const DBQuery = require("./setup");
// file upload functionality start
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    const fileext = path.extname(file.originalname);
    console.log(fileext);
    const filename =
      file.originalname.replace(fileext, "").toLowerCase() + "-" + Date.now();
    cb(null, filename + fileext);
  },
});
const upload = multer({
  // limits: { fileSize: 6000000 },
  // fileFilter: (req, file, cb) => {
  //   if (file.fieldname == "img") {
  //     if (
  //       file.mimetype == "image/jpeg" ||
  //       file.mimetype == "image/png" ||
  //       file.mimetype == "image/jpg"
  //     ) {
  //       cb(null, true);
  //     } else {
  //       cb(new Error("only jpg,png,jpeg format are available"));
  //     }
  //   } else if (file.fieldname == "pdf") {
  //     if (file.mimetype == "application/pdf") {
  //       cb(null, true);
  //     } else {
  //       cb(new Error("only pdf are available"));
  //     }
  //   } else {
  //     cb(new Error("unknown error"));
  //   }
  // },
  storage: storage,
});

FileUploadRoute.post(
  "/file_upload",
  upload.fields([
    { name: "img", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  async function (req, res, next) {
    // console.log(req.files);
    console.log(req.body);
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.files.pdf[0].filename);
    console.log(req.files.img[0].filename);
    // await res.redirect("http://localhost:3000/test2");
    // sql
    const sql = `INSERT INTO FILEUPLOAD(name,email,image,file1)VALUES('${req.body.name}','${req.body.email}',
    '${req.files.img[0].filename}','${req.files.pdf[0].filename}')`;
    const result = await DBQuery(sql);
    console.log(result);
    res.status(200).json({
      success: true,
      data: req.body,
      message: "successfully uploded",
    });

    //   upload.fields([
    //   { name: "img", maxCount: 1 },
    //   { name: "pdf", maxCount: 1 },
    // ])
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  }
);
FileUploadRoute.get("/getfile", async (req, res, next) => {
  const sql = "SELECT*FROM fileupload";
  const result = await DBQuery(sql);
  console.log(result);
  res.status(200).json(result);
});
FileUploadRoute.delete("/filedelete/:email/:image", async (req, res, next) => {
  const sql = `DELETE FROM fileupload WHERE  email='${req.params.email}'`;
  const result = await DBQuery(sql);
  // const filepath = path.join(__dirname, `public/uploads/${req.params.image}`);
  const filepath = `public/uploads/${req.params.image}`;

  await fs.unlink(filepath, () => {
    res.status(200).json({
      success: true,
      message: "Deleted data suceessfully",
    });
  });
});
module.exports = FileUploadRoute;
