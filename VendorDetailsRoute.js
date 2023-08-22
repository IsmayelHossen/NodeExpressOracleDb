const express = require("express");
const VendorDetailsfileRoute = express.Router();
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
  //  limits: { fileSize: 2000000000 },
  fileFilter: (req, file, cb) => {
    if (file.fieldname == "img") {
      if (
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg"
      ) {
        cb(null, true);
      } else {
        cb(new Error("only jpg,png,jpeg format are available"));
      }
    } else if (file.fieldname == "pdf") {
      console.log(file);
      if (
        file.mimetype == "application/pdf" ||
        file.mimetype ==
          "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      ) {
        cb(null, true);
      } else {
        cb(new Error("only pdf are available"));
      }
    } else {
      cb(new Error("unknown error"));
    }
  },
  storage: storage,
});
const uploadSingleImage = upload.fields([
  { name: "pdf", maxCount: 2 },
  { name: "img", maxCount: 2 },
]);
VendorDetailsfileRoute.post(
  "/add_vendor/details",

  async function (req, res, next) {
    //  console.log(res);
    uploadSingleImage(req, res, async function (err) {
      if (err) {
        return res.status(200).send({ status: 400, message: err.message });
      }

      console.log(req.body);

      //  console.log(req.files);

      let {
        vendor_id,
        memo_no,
        date,
        tender_date,
        total_amount,
        dlp,
        performance_status,
        payment_status,
        noa_acceptor,
        noa_cc,
        product_details,
        remark,
        working_typpe,
        branch,
        address,
      } = req.body;
      const query = `INSERT INTO VENDOR_DETAILS(VENDOR_ID,MEMO_NO,DATE1,TENDER_DATE,TOTAL_AMOUNT,DLP,
        PERFORMANCE_SECURITY,PAYMENT_STATUS,FINANCIAL_YEAR,NOA_ACCEPTOR,NOA_CC,VENDOR_ENTRY_ID,VENDOR_ENTRY_DESIGNATION,
      STORE_ACCEPTOR_ID,PRODUCT_DETAILS,REMARKS,STATUS,WORKING_TYPE,BRANCH,ADDRESS) 
      VALUES('${vendor_id}','${memo_no}','${date}','${tender_date}','${total_amount}','${dlp}','${performance_status}','${payment_status}','4','${noa_acceptor}','${noa_cc}','4','spport','2','${product_details}','${remark}',1,'${working_typpe}','${branch}','${address}')
        `;
      const result = await DBQuery(query);

      const query12 = "SELECT max(ID) as id FROM VENDOR_DETAILS";
      const result2 = await DBQuery(query12);
      console.log(result2[0].ID);

      if (req.files.pdf.length > 0) {
        for (let i = 0; i < req.files.pdf.length; i++) {
          console.log(req.files.pdf[i]);
          const time_date = new Date().toLocaleString();
          const querypdf = `INSERT INTO  MULTIFILE(CATEGORY,FILENAME,VENDORDETAILS_ID,FILESIZE,TIMEDATE) 
            VALUES('contract','${req.files.pdf[i].filename}','${result2[0].ID}','${req.files.pdf[i].size}','${time_date}')
              `;
          const result = await DBQuery(querypdf);
        }
      }
      if (req.files.img.length > 0) {
        for (let i = 0; i < req.files.img.length; i++) {
          console.log(req.files.img[i].filename);
          console.log(req.files.pdf[i]);
          const time_date = new Date().toLocaleString();
          const queryimg = `INSERT INTO  MULTIFILE(CATEGORY,FILENAME,VENDORDETAILS_ID,FILESIZE,TIMEDATE) 
            VALUES('noa','${req.files.img[i].filename}','${result2[0].ID}','${req.files.img[i].size}','${time_date}')
              `;
          const result = await DBQuery(queryimg);
        }
      }

      res.status(200).json({
        success: true,
        message: "successfully uploded",
      });
    });
  }
);

module.exports = VendorDetailsfileRoute;
