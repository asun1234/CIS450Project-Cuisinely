var config = require('./db-config.js');
//var mysql = require('mysql');

config.connectionLimit = 1000;
var connection = config;

//handling routes
function getAllPeps(req, res) {
    var query = `
      SELECT *
      FROM (SELECT recipetitle FROM recipes)
      WHERE rownum <= 100;
      `;
    connection.query(query, function(err, rows, fields) {
      if (err) {
        console.log('ENDPOINT DOES NOT WORK\n');
        console.log(err);
      }else {
        console.log('endpoint works!');
        console.log(rows);
        res.json(rows);
      }
    });
  };

  module.exports = {
    getAllPeps: getAllPeps
  }