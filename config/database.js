const database = require('./config').database

const config = {
  dialect: database.dialect,
  username: database.username,
  password: database.password,
  database: database.database,
  host: database.host,
  port: database.port
}

if (database.ssl) {
  config.ssl = database.ssl
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: true
    }
  }
  if (database.ssl_ca_cert) {
    config.dialectOptions.ssl.ca = database.ssl_ca_cert
  }
}
console.log(config)
module.exports = {
  development: config,
  test: config,
  production: config
}
