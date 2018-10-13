const express = require('express');
const app = express();
const logger = require('morgan');
const knex = require('./db/index.js');
const bodyParser = require('body-parser');
const signIn = require('./routes/sign_in/sign_in');
const signUp = require('./routes/sign_up/sign_up');
const restaurants = require('./routes/restaurants/restaurants');
const evaluations = require('./routes/evaluations/evaluations');

// app.set('view engine','ejs');
app.use(logger(':method :url :status :date[clf]'));
app.use(express.static("public"));
app.use(bodyParser.json());

app.use('/sign-up', signUp);
app.use('/sign-in', signIn);
app.use('/restaurants', restaurants);
app.use('/evaluations', evaluations);

const DOMAIN = 'localhost';
const PORT = 5000;

app.listen(PORT, DOMAIN, () => {
    console.log(`💻 Server is listening on http://${DOMAIN}:${PORT}`);
});


