const mysql = require("mysql2");
const util = require('util');


const mySqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "shop"
});


const promiseQuery = (sql) => {
    return util.promisify(mySqlConnection.query).call(mySqlConnection, sql);
}

module.exports = { mySqlConnection, promiseQuery };