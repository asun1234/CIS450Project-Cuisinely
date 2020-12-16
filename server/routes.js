process.env.UV_THREADPOOL_SIZE = 100

var config = require('./db-config.js');
const secondsToWait = 65000;
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
    .then(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
          console.log('Done waiting, proceeding to use the connection');
        }, secondsToWait * 1000);
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
  WITH top_20_categories AS (
    SELECT category
    FROM (SELECT category, COUNT(recipeid) AS count
        FROM recipe_categories
        GROUP BY category
        ORDER BY count DESC)
    WHERE rownum <= 20
),
     avg_ratings AS (
         SELECT recipeid, category
         FROM recipe_categories
         WHERE category IN (SELECT category FROM top_20_categories)
     )
     SELECT INITCAP(category) as Category, ROUND(AVG(rating), 2) AS AverageRating
     FROM avg_ratings JOIN recipes ON recipeId = id
     GROUP BY category
     ORDER BY AVG(rating) DESC
  `;
  queryDB(res, query, '')
};

function getSearch(req, res) {
  var input = req.params.byTitle;
  var query = `
  SELECT *
  FROM (SELECT *
       FROM recipes
       WHERE LOWER(recipetitle) LIKE '%${input}%')
  ORDER BY rating DESC  
`;
  queryDB(res, query, input)
};

function getSearchIngredient(req, res) {
  var input = req.params.byIngredient;
  var query = `
  SELECT *
  FROM recipes r INNER JOIN recipe_ingredients ringr ON r.id=ringr.recipeid
  WHERE LOWER(ringr.ingredient) LIKE '%${input}%'
  ORDER BY rating DESC
`;
  queryDB(res, query, input)
};

function getLowCal(req, res) {
  var query = `
  SELECT * FROM lowCalRecipes
  WHERE rownum<=30
    `;
  queryDB(res, query, '')
};

function getHighProtein(req, res) {
  var query = `
  SELECT * FROM highProteinRecipes
  WHERE rownum<=30
    `;
  queryDB(res, query, '')
};

function getIngredientsByRecipe(req, res) {
  var input = req.params.recipeTitle;
  var query = `
  WITH givenrecipe AS (SELECT id
    FROM recipes
    WHERE recipetitle LIKE '%${input}')
SELECT DISTINCT ingredient
FROM recipe_ingredients r JOIN givenrecipe gr ON r.RECIPEID=gr.ID
ORDER BY ingredient ASC
  `;
  queryDB(res, query, input)
};

function getLowFat(req, res) {
  var query = `
  SELECT * FROM lowFatRecipes
WHERE rownum<=30
    `;
  queryDB(res, query, '')
};

function getLowCarb(req, res) {
  var query = `
  SELECT * FROM lowCarbRecipes
WHERE rownum<=30
    `;
  queryDB(res, query, '')
};

function getLowSugar(req, res) {
  var query = `
  SELECT * FROM lowSugarRecipes
  WHERE rownum<=30`;
  queryDB(res, query, '')
};

function getTopRecipesByCat(req, res) {
  var input = req.params.category;
  var query = `
  WITH category_recipes AS (
    SELECT recipetitle, rating
    FROM recipes R JOIN (SELECT recipeid
        FROM recipe_categories
        WHERE category = '${input}') C ON R.id = C.recipeid
    ORDER BY rating DESC
)
SELECT * FROM category_recipes
    WHERE rownum <= 50
    `;
  queryDB(res, query, input)
};

function getSuggestedRecipesByIngredients(req, res) {
  var inputRecs = req.params.currRecipes;
  var inputIng = req.params.ingredients;
  var query = `
    WITH relevant_recipes AS (
      SELECT recipeid, ingredient
      FROM recipe_ingredients
      WHERE ingredient IN (${inputIng})
    ),
    count_ingr AS (
      SELECT recipeid, COUNT(ingredient) AS num_ingredients_overlap
      FROM relevant_recipes
      GROUP BY recipeid
    )
    SELECT recipetitle
    FROM recipes
      JOIN count_ingr ON id = recipeid AND num_ingredients_overlap = numberofingredients
    WHERE recipetitle NOT IN (${inputRecs})
    ORDER BY recipetitle ASC
    `;
  queryDB(res, query, inputIng)
};

module.exports = {
  getTopTen: getTopTen,
  getCategories: getCategories,
  getSearch: getSearch,
  getSearchIngredient: getSearchIngredient,
  getLowCal: getLowCal,
  getHighProtein: getHighProtein,
  getIngredientsByRecipe: getIngredientsByRecipe,
  getLowFat: getLowFat,
  getLowCarb: getLowCarb,
  getLowSugar: getLowSugar,
  getTopRecipesByCat: getTopRecipesByCat,
  getSuggestedRecipesByIngredients: getSuggestedRecipesByIngredients
}