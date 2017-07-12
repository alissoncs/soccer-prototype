const config = require('./config.json')

config.timezone = 'UTC';

const connection = require('knex')({

  client: 'mysql2',
  debug: false,
  connection: config,
  dateStrings: true

});

module.exports = connection
