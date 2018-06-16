const knex = require('./db/index.js');

module.exports = require('bookshelf')(knex);

