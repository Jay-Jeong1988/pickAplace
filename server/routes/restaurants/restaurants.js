const express = require('express');
const router = express.Router();
const knex = require('../../db/index.js');

router.get('/types', (req, res) => {
    knex('restaurants').select('type').then( types => res.send(types) );
})

router.get('/', (req, res) => {
    knex('restaurants').select().then( restaurants => res.send(restaurants) );
})

router.get('/:id', (req, res) => {
    knex('restaurants').where({id: req.params.id}).first().then( restaurant => res.send(restaurant) );
})

router.post('/add', (req, res) => {
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

module.exports = router;