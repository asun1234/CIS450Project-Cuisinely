const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// The route localhost:8081/people is registered to the function
// routes.getAllPeps, specified in routes.js.
app.get('/people', routes.getAllPeps);

//app.get('/friends/:login', routes.getFriends); // Hint: Replace () => {} with the appropriate route handler in routes.js.

app.listen(8081, () => {
    console.log(`Server listening on PORT 8081`);
});