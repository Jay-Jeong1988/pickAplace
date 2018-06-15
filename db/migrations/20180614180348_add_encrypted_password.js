const { saltHashPassword } = require('../../store');

exports.up = function(knex, Promise) {
    return knex.schema.table('users', t => {
        t.string('salt')
        t.string('encrypted_password')
    }).then( () => knex('users'))
    .then( users => Promise.all(users.map(convertPassword)) )
    .then( () => {
        return knex.schema.table('users', t => {
            t.dropColumn('password')
        })
    })


    function convertPassword(user) {
        const { secret_key, hash } = saltHashPassword(user.password);
        return knex('users')
            .where({ id: user.id })
            .update({ salt: secret_key, encrypted_password: hash })
    }
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', t => {
      t.dropColumn('salt')
      t.dropColumn('encrypted_password')
      t.string('password');
  }).then( () => {
      return knex('users').update({password: 'refilled'})
  })
};
