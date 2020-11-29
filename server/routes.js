var config = require('./db-config.js');

config.connectionLimit = 100;
var poolPromise = config;

//handling routes
function getTopTen(req, res) {
    var query = `
      SELECT *
      FROM (SELECT recipetitle FROM recipes ORDER BY rating DESC)
      WHERE rownum <= 10
      `;
  poolPromise
        .then(pool => {
          pool.getConnection()
              .then(connection => {
                connection.execute(query, function (err, rows, fields) {
                  if (err) {
                    console.log(err);
                  } else {
                    res.json(rows);
                  }
                });
              });
        })
        .catch(err => { throw new Error('Error initializing db connection: ', err);})
        ;
};


function getBananas(req, res) {
  var query = `
  SELECT *
  FROM (SELECT recipetitle FROM recipes
  WHERE LOWER(recipetitle) LIKE '%banana%'
  AND timetaken < 30 AND rating > 4.8)
  `;
poolPromise
      .then(pool => {
        pool.getConnection()
            .then(connection => {
              connection.execute(query, function (err, rows, fields) {
                if (err) {
                  console.log(err);
                } else {
                  res.json(rows);
                }
              });
            });
      })
      .catch(err => { throw new Error('Error initializing db connection: ', err);})
      ;
};

function getCategories(req, res) {
  var query = `
  SELECT *
  FROM (SELECT category FROM recipe_categories)
  WHERE rownum <= 10
  `;
poolPromise
      .then(pool => {
        pool.getConnection()
            .then(connection => {
              connection.execute(query, function (err, rows, fields) {
                if (err) {
                  console.log(err);
                } else {
                  res.json(rows);
                }
              });
            });
      })
      .catch(err => { throw new Error('Error initializing db connection: ', err);})
      ;
};

module.exports = {
  getTopTen: getTopTen,
  getBananas: getBananas,
  getCategories: getCategories
}