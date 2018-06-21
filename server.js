const express = require('express');
const app = express();
const logger = require('morgan');
const knex = require('./db/index.js');
const bodyParser = require('body-parser');
const store = require('./store.js');
const { check, validationResult, body } = require('express-validator/check')
// app.set('view engine','ejs');
app.use(logger(':method :url :status :date[clf]'));
app.use(express.static("public"));
app.use(bodyParser.json());

app.get('/hello-world', (req, res) => {
    res.send({express: 'heyddd'});
    // res.render('index');
} )

app.get('/restaurants', (req, res) => {
    knex('restaurants').select().then( restaurants => res.send(restaurants) );
})

app.get('/restaurants/:id', (req, res) => {
    knex('restaurants').where({id: req.params.id}).first().then( restaurant => res.send(restaurant) );
})

app.post('/eval_rest/:id', (req, res) => {
    knex('evaluations').insert({ 
        restaurant_id: req.params.id,
        user_id: 1,
        price: req.body.price,
        cozy: req.body.cozy,
        luxury: req.body.luxury,
        modern: req.body.modern,
        taste: req.body.taste,
        loud: req.body.loud,
        services: req.body.services,
        recurrence: req.body.recurrence
    }).then( () => {
        // const knexWhere = knex('evaluations').where({restaurant_id: req.params.id}) <---- why wouldn't this work ???? 
        const getAvg = entry => {
            return knex('evaluations')
            .where({restaurant_id: req.params.id})
            .first(knex.raw(`ROUND(AVG(${entry}))`))
            .then( data => data.round );
        }
        const getAvgRecurrence = () => {
            const total_count_recur = () => { 
                    knex('evaluations')
                    .where({restaurant_id: req.params.id})
                    .first()
                    .count('recurrence')
                    .then( data => {
                        return data.count;
                    } )
            }
            console.log(total_count_recur())
            const total_count_true_recur = knex('evaluations')
                .where({restaurant_id: req.params.id})
                .where({recurrence: true})
                .first()
                .count('recurrence').then( data => data.count)

            return Math.round(parseInt(total_count_true_recur) / parseInt(total_count_recur) * 100);
        }
        return Promise.all([
            getAvg('price'),
            getAvg('cozy'),
            getAvg('luxury'),
            getAvg('modern'),
            getAvg('taste'),
            getAvg('loud'),
            getAvg('services'),
            getAvgRecurrence()
        ])
    }).then( rest_temp => {
        console.log(rest_temp)
        // knex('restaurants').where({id: req.params.id}).first().update({
        //     price: rest_temp.avg_price,
        //     cozy: rest_temp.avg_cozy,
        //     luxury: rest_temp.avg_luxury,
        //     modern: rest_temp.avg_modern,
        //     taste: rest_temp.avg_taste,
        //     loud: rest_temp.avg_loud,
        //     services: rest_temp.avg_services,
        //     recurrence: Math.round(parseInt(rest_temp.countTrue)/parseInt(rest_temp.total_count_recur) * 100)
        // }).then( res => {
        //     knex('restaurants').select().then( res => console.log(res) )                                                          
        // }).then( result => res.sendStatus(201) );
    })
})

app.post('/sign-up', [ 
        check('email').isEmail(),
        check('password').isLength({ min: 5 }),
        body('email').custom( value => {
            return knex('users').select().where({ email: value })
                .then( ([user]) => {
                    if (user) return Promise.reject('E-mail already in use');
                })
        })
    ], (req, res) => {
        const errors = validationResult(req);
        
        if( !errors.isEmpty() ){
            errors.array().forEach( error => console.log(error.msg) ) 
            return res.status(422).json({ errors: errors.array() });
        }else{
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
        }
})

app.post('/sign-in', (req, res) => {
        store.authenticate_user({
        'email': req.body.email,
        'password': req.body.password
        }).then( ({ success }) => {
            if(success) {
                console.log(`${req.body.email} has signed in`);
                res.sendStatus(200);
            }else {
                console.log(`authentication denied`);
                res.sendStatus(401);
            }
    })
})

const DOMAIN = 'localhost';
const PORT = 5000;

app.listen(PORT, DOMAIN, () => {
    console.log(`💻 Server is listening on http://${DOMAIN}:${PORT}`);
});
