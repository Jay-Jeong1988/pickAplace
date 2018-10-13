
exports.up = function(knex, Promise) {
  return knex.schema.table('evaluations', t => {
    t.dropColumn('recurrence');
    }).then( () => {
        return knex.schema.table('evaluations', t => {
            t.boolean('recurrence').notNullable();
        });
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('evaluations', t => {
      t.dropColumn('recurrence');
    }).then( () => {
        return knex.schema.table('evaluations', t => {
            t.integer('recurrence');
        });
    });
};
