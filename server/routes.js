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
  SELECT recipetitle
  FROM recipes
  WHERE id IN (SELECT recipeid FROM (SELECT recipeid
  FROM recipe_ingredients
  WHERE LOWER(ingredient) LIKE '%banana%'))
  AND timetaken < 30
  AND rating > 4.8
  ORDER BY rating DESC
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

//fix query later
function getCategories(req, res) {
  var query = `
  SELECT category
  FROM (SELECT category, COUNT(recipeid) AS count
  FROM recipe_categories
  GROUP BY category
  ORDER BY count DESC)
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