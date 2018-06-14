const knexFile = require('../knexfile.js');
const environment = process.env.NODE_ENV || 'development';
const knex = require('knex')(knexFile[environment]);

module.exports = knex;