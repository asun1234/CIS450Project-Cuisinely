const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
var routes = require('./routes.js');

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/topten', routes.getTopTen);
app.get('/bananas', routes.getBananas);
app.get('/topcat', routes.getCategories);

app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});