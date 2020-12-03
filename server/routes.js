var config = require('./db-config.js');

config.connectionLimit = 100;
var poolPromise = config;

function queryDB(res, query, input) {
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
      .catch(err => {
          throw new Error('Error initializing db connection: ', err);
      });
}

function getTopTen(req, res) {
    var query = `
      SELECT *
      FROM (SELECT recipetitle FROM recipes ORDER BY rating DESC)
      WHERE rownum <= 10
      `;
      queryDB(res, query, '')
};

function getCategories(req, res) {
  var query = `
  SELECT category
  FROM (SELECT category, COUNT(recipeid) AS count
  FROM recipe_categories
  GROUP BY category
  ORDER BY count DESC)
  WHERE rownum <= 10
  `;
  queryDB(res, query, '')
};

function getSearch(req, res) {
  var input = req.params.byTitle;
  var query = `
SELECT *
FROM (SELECT * FROM recipes WHERE LOWER(recipetitle) LIKE '%${input}%')
ORDER BY rating DESC
`;
queryDB(res, query, input)
};

function getSearchIngredient(req, res) {
  var input = req.params.byIngredient;
  var query = `
  SELECT *
  FROM recipes
  WHERE id IN (SELECT recipeid FROM (SELECT recipeid
  FROM recipe_ingredients
  WHERE LOWER(ingredient) LIKE '%${input}%'))
  ORDER BY rating DESC
`;
queryDB(res, query, input)
};

function getLowCal(req, res) {
  var query = `
  WITH low_cal_recipes AS 
  (SELECT recipeid, calories FROM nutrition_data 
    WHERE calories < 300),
    ans as (SELECT recipetitle, calories, r.rating
    FROM low_cal_recipes c JOIN recipes r ON recipeid = id
    ORDER BY calories ASC, r.rating DESC)
    SELECT * FROM ans WHERE rownum <= 30
    `;
    queryDB(res, query, '')
};

module.exports = {
  getTopTen: getTopTen,
  getCategories: getCategories,
  getSearch: getSearch,
  getSearchIngredient: getSearchIngredient,
  getLowCal: getLowCal
}