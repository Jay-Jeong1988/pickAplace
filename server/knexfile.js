const sharedConfig = {
  client: 'pg',
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './db/migrations'
  },
  connection: {
    database: 'idealio'
  }
}


module.exports = {

  development: {
    ...sharedConfig
  },

  staging: {
    ...sharedConfig
  },

  production: {
    ...sharedConfig
  }

};