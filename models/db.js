const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Rc19931020",
  database: "unisole",
});

module.exports = connection;
