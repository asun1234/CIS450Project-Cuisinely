var oracledb = require('oracledb');

oracledb.initOracleClient({ libDir: '/Users/angelasun1234/Downloads/instantclient_19_8' });

module.exports = oracledb.createPool({
  user: "admin",
  password: "TH7yR5AYe5WpKbZF",
  connectionString: "cis550proj.c91hlqvzcxsq.us-east-1.rds.amazonaws.com/CIS550DB",
  poolMax: 32,
  poolMin: 32,
  poolIncrement: 0,
  poolTimeout: 0,
}).catch(err => {
  throw new Error('Error initializing db connection: ', err);
});