var mysql = require('mysql');

module.exports = mysql.createPool({
    connectionLimit: 10,
    port: "1521",
    host: "cis550proj.c91hlqvzcxsq.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "TH7yR5AYe5WpKbZF",
    SID: "CIS550DB"
  });