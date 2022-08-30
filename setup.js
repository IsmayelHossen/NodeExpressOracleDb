const oracledb = require("oracledb");
const DBQuery = async function db_query(query) {
  let connection = undefined;
  if (connection == undefined) {
    connection = await oracledb.getConnection({
      user: "system",
      password: "system123",
      connectString: "localhost/orcl",
    });
  }
  try {
    let result = await connection.execute(query);
    // console.log(result);
    return result.rows;
  } catch (errors) {
    console.log("Query not executed");
    return errors;
  }
};

module.exports = DBQuery;
// module.exports = {
//   DBQuery,
//   a,
// };
