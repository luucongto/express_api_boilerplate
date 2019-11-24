import Sequelize from 'sequelize'
import fs from 'fs'
import path from 'path'
import config from './config'
const database = config.database
const db = {}

// connect to postgres testDb
const sequelizeOptions = {
  dialect: database.dialect,
  port: database.port,
  host: database.host,
  // NOTE: https://github.com/sequelize/sequelize/issues/8417
  // Codebase shouldn't be using string-based operators, but we still disable them
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  ...(database.ssl && {
    ssl: database.ssl
  }),
  ...(database.ssl && database.ssl_ca_cert && {
    dialectOptions: {
      ssl: {
        ca: database.ssl_ca_cert
      }
    }
  })
}

// let sequelize

const sequelize = new Sequelize(
  database.database,
  database.username,
  database.password,
  sequelizeOptions
)

const modelsDir = path.normalize(`${__dirname}/../server/models`)
// loop through all files in models directory ignoring hidden files and this file
fs.readdirSync(modelsDir)
  .filter(file => (file.indexOf('.') !== 0) && (file.indexOf('.map') === -1))
// import model files and save model names
  .forEach((file) => {
    console.log(`Loading model file ${file}`) // eslint-disable-line no-console
    const model = sequelize.import(path.join(modelsDir, file))
    db[model.name] = model
  })

Object.keys(db).forEach((name) => {
  if (db[name].associate) {
    db[name].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
