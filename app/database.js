const mysql = require('mysql')


const config = require('./config.json')

let connection = mysql.createConnection(
  config
)

module.exports = connection
