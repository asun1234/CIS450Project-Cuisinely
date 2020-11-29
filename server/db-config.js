var oracledb = require('oracledb');

oracledb.initOracleClient({libDir: '/Users/angelasun1234/Downloads/instantclient_19_8'});

module.exports = oracledb.createPool({
    user: "admin",
    password: "TH7yR5AYe5WpKbZF",
    connectionString: "cis550proj.c91hlqvzcxsq.us-east-1.rds.amazonaws.com/CIS550DB"
  });