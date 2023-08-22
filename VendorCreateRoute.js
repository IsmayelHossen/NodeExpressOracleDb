const express = require("express");
const RouteCheckUsingJWT = require("./RouteCheckUsingJwt");
const DBQuery = require("./setup");
const fs = require("fs");
const Vendor_create_router = express.Router();
const jwt = require("jsonwebtoken");
//route for vendor management main
Vendor_create_router.get(
  "/Vendor_data",

  async function (req, res, next) {
    console.log("from authenticate jwt token" + req.name + req.Email);

    console.log(req.headers.authorization);
    const query1 = "select*from vendor_create";
    const params = [];

    // const result1 = await db_query(query1, params);
    const result1 = await DBQuery(query1);
    // const result1 = await db_query(query1, params);
    console.log(req.hostname);
    res.status(200).append("name", "ismayel").json(result1);
  }
);
//route for vendor management copy
Vendor_create_router.get(
  "/Vendor_data1",
  RouteCheckUsingJWT,
  async function (req, res, next) {
    console.log(req.hostname);
    console.log(req.headers.email + req.headers.name);
    console.log(req.headers.authorization);
    const query1 = "select*from vendor_info";
    const params = [];

    // const result1 = await db_query(query1, params);
    const result1 = await DBQuery(query1);
    // const result1 = await db_query(query1, params);

    res.status(200).append("name", "ismayel").json(result1);
  }
);
// vendor specific data get for update
Vendor_create_router.get(`/Vendor_data/:id`, async function (req, res, next) {
  console.log("hello");
  console.log(req.headers.authorization);
  const query1 = `select*from vendor_create where id=${req.params.id}`;
  //const params = [];
  const result1 = await DBQuery(query1);
  // const result1 = await db_query(query1, params);
  res.status(200).json(result1);
});

// vendor search data
Vendor_create_router.get(
  `/Vendor_search/:search`,
  async function (req, res, next) {
    const query1 = `select*from vendor_info where lower(VENDOR_NAME) LIKE '%${req.params.search}%' 
    OR lower(AGREEMENT_TYPE) LIKE  '%${req.params.search}%'  OR lower(CATEGORY_TYPE) LIKE  '%${req.params.search}%'
    OR lower(PROCUREMENT_TYPE) LIKE  '%${req.params.search}%'   `;
    //const params = [];
    const result1 = await DBQuery(query1);
    // const result1 = await db_query(query1, params);
    res.status(200).json(result1);
  }
);

//create table query
Vendor_create_router.get("/createTable", async function (req, res, next) {
  console.log("hello");
  const query1 =
    "CREATE TABLE employees(id NUMBER, name VARCHAR2(50), email VARCHAR2(100) )";
  const params = [];
  const result1 = await DBQuery(query1);
  res.status(200).json({
    success: "create table",
  });
});

// vendor add post method
Vendor_create_router.post("/add_vendor", async function (req, res, next) {
  console.log(req.body);
  console.log(req.headers.name);
  console.log(req.get("content-type"));
  const agreement_type = req.body.agreement_type;
  const category_type = req.body.category_type;
  const procurement_type = req.body.procurement_type;
  const vendor_name = req.body.vendor_name;

  query = `INSERT INTO vendor_info(AGREEMENT_TYPE,CATEGORY_TYPE,PROCUREMENT_TYPE,VENDOR_NAME)
     VALUES('${agreement_type}','${category_type}','${procurement_type}','${vendor_name}')`;
  //const query1 =
  // "INSERT INTO employees(id,name, email ) VALUES('2','maisha','salam@gmail.com')";
  const result = await DBQuery(query);
  res.status(200).json({
    success: true,
    data: req.body,
  });
});
// vendor update query
Vendor_create_router.put("/vendor/update/:id", async function (req, res) {
  const id = req.params.id;

  console.log(req.body);
  console.log(`ID=${req.params.id}`);
  const AGREEMENT_TYPE = req.body.agreement_type;
  const CATEGORY_TYPE = req.body.category_type;
  const PROCUREMENT_TYPE = req.body.procurement_type;
  const VENDOR_NAME = req.body.vendor_name;
  console.log(VENDOR_NAME);
  query = `UPDATE vendor_info SET VENDOR_NAME='${VENDOR_NAME}',AGREEMENT_TYPE='${AGREEMENT_TYPE}',
  PROCUREMENT_TYPE='${PROCUREMENT_TYPE}',CATEGORY_TYPE='${CATEGORY_TYPE}' WHERE ID=${id} `;
  //const query1 =
  // "INSERT INTO employees(id,name, email ) VALUES('2','maisha','salam@gmail.com')";
  const result = await DBQuery(query);
  res.status(200).json({
    success: true,
    data: req.body,
  });
});

//vendor details add
Vendor_create_router.post("/add_vendor/details", async function (req, res) {
  console.log(req.body);
  console.log(req.headers.vendor_id);

  const vendor_id = req.body.vendor_id;
  const memo_no = req.body.memo_no;
  const date = req.body.date;
  const tender_date = req.body.tender_date;
  const total_amount = req.body.total_amount;
  const contact_file = req.body.contact_file;
  const noa_file = req.body.noa_file;
  const dlp = req.body.dlp;
  const performance_status = req.body.performance_status;
  const payment_status = req.body.payment_status;
  const noa_acceptor = req.body.noa_acceptor;
  const noa_cc = req.body.noa_cc;
  const product_details = req.body.product_details;
  const remark = req.body.remark;
  const working_typpe = req.body.working_typpe;
  const branch = req.body.branch;
  const address = req.body.address;

  const query = `INSERT INTO VENDOR_DETAILS(VENDOR_ID,MEMO_NO,DATE1,TENDER_DATE,TOTAL_AMOUNT,CONTACT_FILE,NOA_FILE,DLP,
    PERFORMANCE_SECURITY,PAYMENT_STATUS,FINANCIAL_YEAR,NOA_ACCEPTOR,NOA_CC,VENDOR_ENTRY_ID,VENDOR_ENTRY_DESIGNATION,
  STORE_ACCEPTOR_ID,PRODUCT_DETAILS,REMARKS,STATUS,WORKING_TYPE,BRANCH,ADDRESS) 
  VALUES('${vendor_id}','${memo_no}','${date}','${tender_date}','${total_amount}','${contact_file}','${noa_file}','${dlp}','${performance_status}','${payment_status}','4','${noa_acceptor}','${noa_cc}','4','spport','2','${product_details}','${remark}',1,'${working_typpe}','${branch}','${address}')
    `;
  const result = await DBQuery(query);
  res.status(200).json({
    success: true,
    data: result,
  });
});
//get vendor details
Vendor_create_router.get("/Vendor_details", async function (req, res) {
  console.log(req.headers.vendor_id);
  // const token = req.headers.authorization.split(" ")[1];
  // const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
  // const { name, Email } = decoded;
  // console.log(name + Email);
  console.log(req.socket.remoteAddress);
  const vendor_id = req.headers.vendor_id;
  console.log(req);
  // const query = `SELECT VENDOR_DETAILS.*,MULTIFILE.* FROM VENDOR_DETAILS  JOIN MULTIFILE on  VENDOR_DETAILS.ID=MULTIFILE.VENDORDETAILS_ID WHERE VENDOR_DETAILS.VENDOR_ID=${vendor_id}`;
  const query = `SELECT*FROM VENDOR_DETAILS WHERE VENDOR_ID=${vendor_id} `;
  const result = await DBQuery(query);

  res.status(200).json({
    success: true,
    data: result,
  });
});
//get vendor file data
Vendor_create_router.get("/viewfileData/:id/:type", async function (req, res) {
  if (req.params.type == "contract File") {
    const type = "contract";
    const query = `SELECT*FROM multifile WHERE VENDORDETAILS_ID=${req.params.id} AND  category='${type}'`;
    const result = await DBQuery(query);
    console.log(result);
    res.status(200).json({
      success: true,
      data: result,
    });
  } else {
    const type = "noa";
    const query = `SELECT*FROM multifile WHERE VENDORDETAILS_ID=${req.params.id} AND  category='${type}'`;
    const result = await DBQuery(query);
    res.status(200).json({
      success: true,
      data: result,
    });
  }
});
Vendor_create_router.delete(
  "/vendor_details_delete/:id",
  async function (req, res) {
    console.log(req.headers.vendor_id);
    const details_id = req.params.id;

    const get_allfilename = `SELECT*FROM multifile WHERE VENDORDETAILS_ID=${details_id}`;
    const fileName = await DBQuery(get_allfilename);
    console.log(fileName);
    if (fileName.length > 0) {
      fileName.map(async (row, index) => {
        const filepath = `public/uploads/${row.FILENAME}`;

        await fs.unlink(filepath, () => {});
      });
    }
    const query1 = `DELETE FROM multifile WHERE VENDORDETAILS_ID=${details_id}`;
    const result1 = await DBQuery(query1);
    const query = `DELETE FROM VENDOR_DETAILS WHERE ID=${details_id}`;
    const result = await DBQuery(query);

    res.status(200).json({
      success: true,
      data: "Data deleted",
    });
  }
);

//vendor delete method
Vendor_create_router.delete(
  "/delete_vendor/:delete",
  async function (req, res) {
    console.log(req.params.delete);
    const query = `delete from vendor_info where ID=${req.params.delete}`;
    const result = await DBQuery(query);
    console.log(result);

    if (result != undefined && result.errorNum == 2292) {
      res.status(200).json({
        success: false,
      });
    } else {
      res.status(200).json({
        success: true,
      });
    }
  }
);

//vendor file delete
Vendor_create_router.delete(
  "/file_delete/:id/:filename",
  async function (req, res) {
    console.log(req.params.id);
    console.log(req.params.filename);

    const sql = `DELETE FROM multifile WHERE  ID='${req.params.id}'`;
    const result = await DBQuery(sql);
    const filepath = `public/uploads/${req.params.filename}`;

    await fs.unlink(filepath, () => {
      res.status(200).json({
        success: true,
        message: "Deleted data suceessfully",
      });
    });
  }
);
//vendor branch
Vendor_create_router.post("/branch/add", async function (req, res) {
  const { branch_name, address, vendor_id } = req.body;
  console.log(req.body);
  query = `INSERT INTO VENDOR_BRANCH(VENDOR_ID,BRANCH_NAME,ADDRESS)
     VALUES('${vendor_id}','${branch_name}','${address}')`;
  //const query1 =
  // "INSERT INTO employees(id,name, email ) VALUES('2','maisha','salam@gmail.com')";
  const result = await DBQuery(query);
  res.status(200).json({
    success: true,
    data: req.body,
  });
});
Vendor_create_router.get("/branch/get", async function (req, res) {
  const query = `SELECT VENDOR_INFO.VENDOR_NAME,VENDOR_BRANCH.* from VENDOR_INFO join VENDOR_BRANCH on VENDOR_INFO.ID=VENDOR_BRANCH.VENDOR_ID`;
  const result = await DBQuery(query);
  res.setHeader("name", "kamal354");
  res.status(200).json({
    success09: true,
    data: result,
  });
});
Vendor_create_router.get("/branch/get1", async function (req, res) {
  const vendor_id = req.headers.vendor_id;
  const query = `SELECT VENDOR_INFO.VENDOR_NAME,VENDOR_BRANCH.* from VENDOR_INFO join VENDOR_BRANCH on VENDOR_INFO.ID=VENDOR_BRANCH.VENDOR_ID WHERE VENDOR_BRANCH.VENDOR_ID=${vendor_id}`;
  const result = await DBQuery(query);
  res.status(200).json({
    success09: true,
    data: result,
  });
});
Vendor_create_router.delete(
  "/branch_vendor_delete/:id",
  async function (req, res) {
    const branch_id = req.params.id;
    console.log(branch_id);
    const query = `DELETE FROM VENDOR_BRANCH WHERE ID=${branch_id}`;
    const result = await DBQuery(query);
    res.status(200).json({
      success: true,
      data: result,
    });
  }
);
// branch/update

Vendor_create_router.put("/branch/update/:id", async function (req, res) {
  const id = req.params.id;

  console.log(req.body);

  const BRANCH_NAME = req.body.branch_name;
  const ADDRESS = req.body.address;
  // console.log(VENDOR_NAME);
  query = `UPDATE vendor_branch SET BRANCH_NAME='${BRANCH_NAME}',ADDRESS='${ADDRESS}' WHERE ID=${id} `;
  //const query1 =
  // "INSERT INTO employees(id,name, email ) VALUES('2','maisha','salam@gmail.com')";
  const result = await DBQuery(query);
  res.status(200).json({
    success: true,
    data: req.body,
  });
});
//Vendor_branch_search

// vendor search data
Vendor_create_router.get(
  `/Vendor_branch_search/:search`,
  async function (req, res, next) {
    console.log(req.params.search);
    const search = req.params.search;
    // const query1 = `select from VENDOR_BRANCH.*,VENDOR_INFO.* FROM VENDOR_BRANCH JOIN VENDOR_INFO ON VENDOR_BRANCH.VENDOR_ID=VENDOR_INFO.ID where VENDOR_BRANCH.BRANCH_NAME LIKE '%C%'   `;
    const query = `SELECT VENDOR_INFO.VENDOR_NAME,VENDOR_BRANCH.* from VENDOR_INFO join VENDOR_BRANCH on VENDOR_INFO.ID=VENDOR_BRANCH.VENDOR_ID WHERE lower(VENDOR_BRANCH.BRANCH_NAME)  LIKE '%${search}%'
    OR  lower(VENDOR_INFO.VENDOR_NAME)  LIKE '%${search}%'  `;
    //const params = [];
    const result1 = await DBQuery(query);
    console.log(result1);
    // const result1 = await db_query(query1, params);
    res.status(200).json(result1);
  }
);

module.exports = Vendor_create_router;
