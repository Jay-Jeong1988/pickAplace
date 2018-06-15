const saltHashPassword = require('../../store');

exports.up = function(knex, Promise) {
    return knex.schema.table('users', t => {
        t.string('salt').notNullable();
        t.string('encrypted_password').notNullable();

    })
};

exports.down = function(knex, Promise) {
  
};
