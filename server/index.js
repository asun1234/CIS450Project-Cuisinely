const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
var routes = require('./routes.js');
app.use(cors());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/topten', routes.getTopTen);
app.get('/topcat', routes.getCategories);
app.get('/search/:byTitle', routes.getSearch);
app.get('/searchIngredient/:byIngredient', routes.getSearchIngredient);
app.get('/lowcal', routes.getLowCal);
app.get('/lowfat', routes.getLowFat);
app.get('/lowsugar', routes.getLowSugar);
app.get('/lowcarb', routes.getLowCarb);
app.get('/highpro', routes.getHighProtein);
//app.get('/ingredientCart/:recipeTitle', routes.getIngredientsByRecipe);
app.get('/topHistory/:category', routes.getTopRecipesByCat);
app.get('/suggestedRecipes', routes.getRecipesWithAllIngredients);
app.get('/ingredientCart', routes.getIngredientsByRecipe2);


app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});