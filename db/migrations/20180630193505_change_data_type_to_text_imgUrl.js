
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('restaurants', t => {
      t.text('imgUrl').alter();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable('restaurants', t => {
      t.string('imgUrl').alter();
  })
};
