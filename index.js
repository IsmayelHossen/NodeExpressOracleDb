const morgan = require("morgan");
const express = require("express");
const dotenv = require("dotenv");
const DBQuery = require("./setup");
const Vendor_create_router = require("./VendorCreateRoute");
const FileUploadRoute = require("./fileUpload");
const LoginRegRouter = require("./LoginReg");
const VendorProductRoute = require("./VendorProductRoute");
const mailRoute = require("./MailsendRoute");
const router = express.Router({});
const oracledb = require("oracledb");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const FileUploadRoute_2 = require("./FileUpload2");
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;
const path = require("path");
var nodemailer = require("nodemailer");
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(morgan("dev"));
app.use(router);
// app.use(express.static(__dirname + "uploads"));
// app.use(cookieParser());
app.use(express.static("public"));

app.use("/vendor", Vendor_create_router);
app.use("/file2", FileUploadRoute_2);
app.use("/file", FileUploadRoute);
app.use("/product", VendorProductRoute);
app.use("/loginSignup", LoginRegRouter);
app.use("/mail", mailRoute);

console.log(DBQuery);
// Error Handler
// default error handler
// const errorHandler = (err, req, res, next) => {
//   if (res.headersSent) {
//     return next(err);
//   }
//   res.status(500).json({ error: err });
//   console.log(err);
// };

// app.use(errorHandler);
app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(200).json({
      error: err.message,
      msg: "something went wrong",
    });
  } else {
    res.send("success");
  }
});
// replace(/ /g, "")
// str = "01552152883 ismayel@mail.com";
// let replace = str.replace(/[^\w\@.]/gi, "");
// let match = str.match(/^(\+)?01[35-9]\d{8}/gi);
// let search = str.search(/^[01]]/gi);
// let abc = "hello bd fgg";
// console.log(match[0]);

// let array = [
//   {
//     title: "hello",
//     name: "Karim@gmail.com",
//     education: "abc",
//     mobile: "01952152883",
//   },
//   {
//     title: "$ismayel",
//     name: "jamal",
//     education: "ok",
//     mobile: "+88-01952152885",
//   },
//   {
//     title: "$mello",
//     name: "@gmail/.com",
//     education: "mawlana",
//     mobile: "01952152894",
//   },
// ];
// const search1 = array.filter((item) => {
//   const itemData = item.name + " " + item.title + " " + item.mobile;
//   //  console.log(itemData);
//   const searchData = "/.  &**#  @#$ hghghghg  gmail   ".replace(
//     /[^\w\@]/gi,
//     ""
//   );
//   // const searchData = "$".match(/\$/gi);
//   console.log(searchData);

//   return (
//     itemData
//       .trim()
//       .toLowerCase()
//       // .match(/(\+88)(-)01[34-9]\d{8}/);
//       // .match(/(\+88)(-)01[34-9]\d{8}/);
//       .includes(searchData)
//   );
// });
// array.shift();
// console.log(array);
//console.log(search1.length != 0 && search1);
// app.use("/static", express.static(path.join(__dirname, "public/uploads")));
// console.log(path.join(__dirname, "public"));

app.listen(process.env.PORT, () => {
  console.log("server");
});
