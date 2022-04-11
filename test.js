const setup = require("./setup");
const morgan = require("morgan");
const express = require("express");
const router = require("express-promise-router")();
const oracledb = require("oracledb");
const cors = require("cors");
//multer use for work with multiple form data like file uload
const multer = require("multer");
const path = require("path");

oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

const app = express();
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(morgan("dev"));

// const middleware = (req, res, next) => {
//   console.log(`${req.method}-${req.ip}`);
//   // res.end();
//   //res.send("no query is available");
//   next();
// };
// app.use(middleware);
app.use(router);

// file upload functionality start
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
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
  limits: { fileSize: 1000000 },
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
      if (file.mimetype == "application/pdf") {
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

router.post(
  "/file_upload",
  upload.fields([
    { name: "img", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  async function (req, res, next) {
    // console.log(req.files);
    await res.send("file upload");
    //   upload.fields([
    //   { name: "img", maxCount: 1 },
    //   { name: "pdf", maxCount: 1 },
    // ])
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  }
);
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send(err.message);
  } else {
    res.send("success");
  }
});
// file upload functionality end

let connection = undefined;
async function db_query(query) {
  if (connection == undefined) {
    connection = await oracledb.getConnection({
      user: "system",
      password: "system123",
      connectString: "localhost/orcl",
    });
  }
  try {
    let result = await connection.execute(query);
    return result.rows;
  } catch (errors) {
    console.log("Query not executed");
  }
}

router.get("/allemployee", async function (req, res, next) {
  console.log("hello");
  const query = "select*from abc";
  const params = [];
  // const result = db_query(query);
  res.cookie("name", "kamalcvcvcvc");
  res.status(200).json({
    name: "ismayel",
  });
  //res.end("<h1>Front Page</h1>");
  // res.download("./img/abc.jpg");
});

router.get("/Vendor_data", async function (req, res, next) {
  console.log("hello");
  const query1 = "select*from vendor_create";
  const params = [];
  const result1 = await db_query(query1, params);
  // const result1 = await db_query(query1, params);

  res.status(200).append("name", "ismayel").json(result1);
});
// vendor specific data get for update
router.get(`/Vendor_data/:id`, async function (req, res, next) {
  console.log("hello");
  const query1 = `select*from vendor_create where id=${req.params.id}`;
  //const params = [];
  const result1 = await db_query(query1);
  // const result1 = await db_query(query1, params);
  res.status(200).json(result1);
});

// vendor search data
router.get(`/Vendor_search/:search`, async function (req, res, next) {
  console.log("hello");
  const query1 = `select*from vendor_create where companyname LIKE '%${req.params.search}%'
    `;
  //const params = [];
  const result1 = await db_query(query1);
  // const result1 = await db_query(query1, params);
  res.status(200).json(result1);
});

//create table query
router.get("/createTable", async function (req, res, next) {
  console.log("hello");
  const query1 =
    "CREATE TABLE employees(id NUMBER, name VARCHAR2(50), email VARCHAR2(100) )";
  const params = [];
  const result1 = await db_query(query1);
  res.status(200).json({
    success: "create table",
  });
});
//insert table query
router.get("/insertIntoEmloyees", async function (req, res, next) {
  console.log("hello");
  const query1 =
    "INSERT INTO employees(id,name, email ) VALUES('1','salam','salam@gmail.com')";
  const query2 = "select*from employees";
  const params = [];
  const result1 = await db_query(query1);
  const result2 = await db_query(query2);
  console.log(result1);
  res.status(200).json({
    success: "Insert data",
    data: result2,
  });
});
// vendor add post method
router.post("/add_vendor", async function (req, res, next) {
  console.log(req.body);
  console.log(req.headers.name);
  // console.log(req);
  const CompanyName = req.body.CompanyName;
  const ContactName = req.body.ContactName;
  const ContactTitle = req.body.ContactTitle;
  const Address = req.body.Address;
  const Street = req.body.Street;
  const Pcode = req.body.Pcode;
  const City = req.body.City;
  const Country = req.body.Country;
  const Mobile = req.body.Mobile;
  const Fax = req.body.Fax;
  const Website = req.body.Website;
  const Email = req.body.Email;
  const id = req.body.id;

  query = `INSERT INTO vendor_create(COMPANYNAME,CONTACTTITLE,CONTACTNAME,ADDRESS,STREET,PCODE,CITY,COUNTRY,MOBILE,FAX,WEBSITE,EMAIL,ID)
   VALUES('${CompanyName}','${ContactTitle}','${ContactName}','${Address}','${Street}','${Pcode}','${City}','${Country}','${Mobile}','${Fax}','${Website}', '${Email}','${id}')`;
  //const query1 =
  // "INSERT INTO employees(id,name, email ) VALUES('2','maisha','salam@gmail.com')";
  const result = await db_query(query);
  res.status(200).json({
    success: true,
    data: req.body,
  });
});
// vendor update query
router.put("/vendor/update/:id", async function (req, res) {
  const id = req.params.id;
  // console.log(req.params.id);
  console.log(req.body);
  const CompanyName = req.body.CompanyName;
  const ContactName = req.body.ContactName;
  const ContactTitle = req.body.ContactTitle;
  const Address = req.body.Address;
  const Street = req.body.Street;
  const Pcode = req.body.Pcode;
  const City = req.body.City;
  const Country = req.body.Country;
  const Mobile = req.body.Mobile;
  const Fax = req.body.Fax;
  const Website = req.body.Website;
  const Email = req.body.Email;

  query = `UPDATE vendor_create SET COMPANYNAME='${CompanyName}' ,CONTACTTITLE='${ContactTitle}' ,CONTACTNAME='${ContactName}',ADDRESS='${Address}',STREET='${Street}',PCODE='${Pcode}',CITY='${City}'
  ,COUNTRY='${Country}',MOBILE='${Mobile}',FAX='${Fax}',WEBSITE='${Website}',EMAIL='${Email}' WHERE ID=${id}
   `;
  //const query1 =
  // "INSERT INTO employees(id,name, email ) VALUES('2','maisha','salam@gmail.com')";
  const result = await db_query(query);
  res.status(200).json({
    success: true,
    data: req.body,
  });
});
//vendor delete method
router.delete("/delete_vendor/:delete", async function (req, res) {
  console.log(req.params.delete);
  const query = `delete from vendor_create where ID=${req.params.delete}`;
  const result = await db_query(query);
  res.status(200).json({
    success: true,
  });
});
// app.get("/all", (req, res) => {
//   oracledb.getConnection(
//     {
//       user: "system",
//       password: "system123",
//       connectString: "localhost/orcl",
//     },
//     function (error, connection) {
//       if (error) {
//         res.send(error);
//       } else {
//         connection.execute(`SELECT * FROM cdf`, [], function (error, result) {
//           if (error) {
//             res.send(error);
//           } else {
//             res.send(result.rows);
//           }
//         });

//         // release connection
//         connection.release(function (error) {
//           if (error) {
//             console.error(error);
//           } else {
//             console.log("Connection released");
//           }
//         });
//       }
//     }
//   );
// });

//const { format } = require("express/lib/response");

app.listen(4328, () => {
  console.log("server");
});
