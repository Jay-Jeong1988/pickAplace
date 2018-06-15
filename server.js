const express = require('express');
const app = express();
const logger = require('morgan');
const knex = require('./db/index.js');
const bodyParser = require('body-parser');
const store = require('./store.js');
// app.set('view engine','ejs');
app.use(logger(':method :url :status :date[clf]'));
app.use(express.static("public"));
app.use(bodyParser.json());

app.get('/hello-world', (req, res) => {
    res.send({express: 'heyddd'});
    // res.render('index');
} )

app.get('/restaurants', (req, res) => {
    
})

app.post('/sign-up', (req, res) => {
    store.createUser({
        'first_name': req.body.first_name,
        'last_name': req.body.last_name,
        'email': req.body.email,
        'password': req.body.password,
        'address': req.body.address
    }).then( () => {
        console.log(`user created: 
            ${req.body.first_name} ${req.body.last_name}, 
            email: ${req.body.email} 
            password: ${req.body.password} 
            address: ${req.body.address}`)
        res.sendStatus(200);
    })
})

const DOMAIN = 'localhost';
const PORT = 5000;

app.listen(PORT, DOMAIN, () => {
    console.log(`💻 Server is listening on http://${DOMAIN}:${PORT}`);
});
