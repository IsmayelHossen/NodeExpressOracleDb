const express = require("express");
const DBQuery = require("./setup");
const VendorProductRoute = express.Router();

VendorProductRoute.post("/productsave", async (req, res, next) => {
  console.log(req.body);

  req.body.map(async (row, index) => {
    const id = Math.round(Math.random() * 100);
    const query = `INSERT INTO PRODUCT(COMPANY,CATEGORY,ID) VALUES('${row.Vendor_select}','${row.Product_Category}',${id})`;
    const result = await DBQuery(query);
  });
  // console.log($product);

  res.status(200).json({
    hello: "sdfsdf",
  });
});

module.exports = VendorProductRoute;
