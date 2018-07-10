const express = require('express');
const app = express();
const logger = require('morgan');
const knex = require('./db/index.js');
const bodyParser = require('body-parser');
const store = require('./store.js');
const { check, validationResult, body } = require('express-validator/check')
const jwt = require('jsonwebtoken');

// app.set('view engine','ejs');
app.use(logger(':method :url :status :date[clf]'));
app.use(express.static("public"));
app.use(bodyParser.json());

app.get('/hello-world', (req, res) => {
    res.send({express: 'heyddd'});
    // res.render('index');
} )

app.post('/add_restaurant', (req, res) => {
    knex('restaurants').insert({ 
        name: req.body.name,
        type: req.body.type,
        address: req.body.address,
        'phone number': req.body.phone_number,
        website_url: req.body.website_url,
        imgUrl: req.body.imgUrl
    }).then( () => {
        knex('restaurants').first().where({ address: req.body.address })
        .then( restaurant => {
            console.log(restaurant);
            res.send(restaurant);
        });
    });

})

app.get('/restaurants/types', (req, res) => {
    knex('restaurants').select('type').then( types => res.send(types) );
})

app.get('/restaurants', (req, res) => {
    knex('restaurants').select().then( restaurants => res.send(restaurants) );
})

app.get('/restaurants/:id', (req, res) => {
    knex('restaurants').where({id: req.params.id}).first().then( restaurant => res.send(restaurant) );
})

app.post('/eval_rest/:restaurant_id', (req, res) => {
    
    knex('evaluations').insert({ 
        restaurant_id: req.params.restaurant_id,
        user_id: 1,
        price: req.body.price,
        cozy: req.body.cozy,
        luxury: req.body.luxury,
        modern: req.body.modern,
        taste: req.body.taste,
        loud: req.body.loud,
        services: req.body.services,
        recurrence: req.body.recurrence
    })
    .then( () => {
        // const knexWhere = knex('evaluations').where({restaurant_id: req.params.id}) <---- why wouldn't this work ???? 
        const getAvg = entry => {
            return knex('evaluations')
            .where({restaurant_id: req.params.restaurant_id})
            .first(knex.raw(`ROUND(AVG(${entry}))`))
            .then( data => data.round );
        }

        const total_count_recur = () => { 
            return  knex('evaluations')
                .where({restaurant_id: req.params.restaurant_id})
                .first()
                .count('recurrence')
                .then( data => data.count )
        }

        const total_count_true_recur = () => { 
            return knex('evaluations')
                .where({restaurant_id: req.params.restaurant_id})
                .where({recurrence: true})
                .first()
                .count('recurrence').then( data => data.count)
        }

        const getAvgRecurrence = () => {
                return total_count_true_recur().then( true_recur => {
                    return total_count_recur().then( total_recur => {
                        return Math.round(parseInt(true_recur) / parseInt(total_recur) * 100);
                    })
                })
        }

        return Promise.all([
            getAvg('price'),
            getAvg('cozy'),
            getAvg('luxury'),
            getAvg('modern'),
            getAvg('taste'),
            getAvg('loud'),
            getAvg('services'),
            getAvgRecurrence(),
        ])
    })
    .then(([avg_price, avg_cozy, avg_luxury, avg_modern, avg_taste, avg_loud, avg_services, avg_recurrence]) => {

        return knex('restaurants').where({id: req.params.restaurant_id}).first().update({
            price: avg_price,
            cozy: avg_cozy,
            luxury: avg_luxury,
            modern: avg_modern,
            taste: avg_taste,
            loud: avg_loud,
            services: avg_services,
            recurrence: avg_recurrence
        });
    })
    .then( result => { 
        knex('restaurants').first().where({id: req.params.restaurant_id})
        .then( data => {
            console.log(data);
            res.send(data)
        });
    });
});

app.get("/top_ten/:eval_types", (req, res) => {

    const getData = () => {
        if(req.params.eval_types.split(',').includes('empty')) res.send({'errors': 'no data'});
        else {
            const receivedDataArray = req.params.eval_types.split(',');
            let receivedParams = req.params.eval_types.split(',');
            receivedParams.unshift('name');
            receivedParams.unshift('id');
            receivedParams.push('imgUrl');
            let queryString = "(";

            for(let i=0; i < receivedDataArray.length; i++){
                if (i >= receivedDataArray.length - 1) queryString += `${receivedDataArray[i]} )`;
                else queryString += `${receivedDataArray[i]} + `;
            }
            // console.log(`(${queryString}/${receivedDataArray.length}) desc`)
            return knex('restaurants')
                .select(receivedParams)
                .orderBy(knex.raw(`${queryString}/${receivedDataArray.length}`),'desc')
                .limit(10)
                .then( data => data )
        }
    }

    const get_total_count = (restaurant_id) => { 
        return  knex('evaluations')
            .where({restaurant_id: restaurant_id})
            .first()
            .count('restaurant_id')
            .then( data => data )
    }


    getData().then( restaurants => {
        const passingData = [restaurants];

        for(let restaurant of restaurants) {
            passingData.push(get_total_count(restaurant.id));
        }
        return Promise.all(passingData);
    }).then( (data) => {
        const restaurantsData = data.shift();

        for(let i = 0; i < restaurantsData.length; i++){
            restaurantsData[i].count = data[i].count;
            delete restaurantsData[i].id;
        }
        
        console.log(restaurantsData);
        res.send(restaurantsData);
    })

})

app.post('/sign-up', [ 
    check('email').isEmail(),
    check('password').isLength({ min: 5 }),
    body('password_confirmation').custom( (value, {req}) => {
        if( value !== req.body.password ) {
            throw new Error('Password confirmation does not match password');
        }else{
            return true
        }
    }),
    body('email').custom( value => {
        return knex('users').select().where({ email: value })
            .then( ([user]) => {
                if (user) return Promise.reject('E-mail already in use');
            })
    }),
    body('address').custom( value => {
        if(value === "") throw new Error('Address should not be empty');
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
                const token = jwt.sign(
                    {
                        jwt: { 
                            email: req.body.email,
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            address: req.body.address
                        }
                    },
                    'secret',
                    { expiresIn: 60 * 60 }
                )
                console.log(`user created: 
                ${req.body.first_name} ${req.body.last_name}, 
                email: ${req.body.email} 
                password: ${req.body.password} 
                address: ${req.body.address}`)
            res.status(200).send({jwt: token});
            })
        }
})

app.post('/sign-in', (req, res) => {
        store.authenticate_user({
        'email': req.body.email,
        'password': req.body.password
        }).then( ({ success }) => {
            if(success) {
                knex('users').select().where({email: req.body.email}).then( user => {
                    const payload = {
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        address: user.address
                    }
                    const token = jwt.sign({
                        jwt: payload
                        },
                        'secret',
                        { expiresIn: '1h' }
                    )
                    
                    console.log(`${req.body.email} has signed in`);
                    res.status(200).send({jwt: token});
                })
            }else {
                const errors = [];
                errors.push({ unauthorized: 'Invalid email/password. Please try again.'});
                res.status(401).json({ errors: errors });
            }
    })
})

const DOMAIN = 'localhost';
const PORT = 5000;

app.listen(PORT, DOMAIN, () => {
    console.log(`💻 Server is listening on http://${DOMAIN}:${PORT}`);
});
