
exports.up = function(knex, Promise) {
  return Promise.all([ 
    knex.schema.createTable('restaurants', t => {
      t.increments('id').primary;
      t.string('name');
      t.string('type');
      t.string('address');
      t.string('phone number');
      t.string('website_url');
      t.string('imgUrl');
      t.integer('price');
      t.integer('luxury');
      t.integer('taste');
      t.integer('cozy');
      t.integer('loud');
      t.integer('modern');
      t.integer('services');
      t.integer('recurrence');
      t.timestamps(false, true);
    }),

    knex.schema.createTable('evaluations', t => {
      t.increments('id').primary;
      t.integer('restaurant_id').references('id').inTable('restaurants').notNullable();
      t.integer('user_id').references('id').inTable('users').notNullable();
      t.integer('price');
      t.integer('luxury');
      t.integer('taste');
      t.integer('cozy');
      t.integer('loud');
      t.integer('modern');
      t.integer('services');
      t.integer('recurrence');
      t.timestamps(false, true);
    }),

    knex.schema.createTable('users', t => {
      t.increments('id').primary;
      t.string('first name').notNullable();
      t.string('last_name').notNullable();
      t.string('email').notNullable();
      t.string('password_digest').notNullable();
      t.string('address').notNullable();
      t.timestamps(false, true);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('evaluations'),
    knex.schema.dropTable('restaurants'),
    knex.schema.dropTable('users')
  ])
};
