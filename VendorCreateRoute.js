const express = require("express");
const RouteCheckUsingJWT = require("./RouteCheckUsingJwt");
const DBQuery = require("./setup");
const Vendor_create_router = express.Router();

//route for vendor management main
Vendor_create_router.get(
  "/Vendor_data",

  async function (req, res, next) {
    console.log("from authenticate jwt token" + req.name + req.Email);

    console.log(req.originalUrl);
    const query1 = "select*from vendor_create";
    const params = [];

    // const result1 = await db_query(query1, params);
    const result1 = await DBQuery(query1);
    // const result1 = await db_query(query1, params);

    res.status(200).append("name", "ismayel").json(result1);
  }
);
//route for vendor management copy
Vendor_create_router.get(
  "/Vendor_data1",
  RouteCheckUsingJWT,
  async function (req, res, next) {
    console.log(req.headers.email + req.headers.name);
    const query1 = "select*from vendor_create";
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
    const query1 = `select*from vendor_create where companyname LIKE '%${req.params.search}%' 
    OR city LIKE  '%${req.params.search}%'  OR PCODE LIKE  '%${req.params.search}%'
      `;
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
  const result = await DBQuery(query);
  res.status(200).json({
    success: true,
    data: req.body,
  });
});
// vendor update query
Vendor_create_router.put("/vendor/update/:id", async function (req, res) {
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
  const result = await DBQuery(query);
  res.status(200).json({
    success: true,
    data: req.body,
  });
});
//vendor delete method
Vendor_create_router.delete(
  "/delete_vendor/:delete",
  async function (req, res) {
    console.log(req.params.delete);
    const query = `delete from vendor_create where ID=${req.params.delete}`;
    const result = await DBQuery(query);
    res.status(200).json({
      success: true,
    });
  }
);
module.exports = Vendor_create_router;
