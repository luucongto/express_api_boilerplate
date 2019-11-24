import Joi from 'joi'

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config()

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number()
    .default(4000),
  API_VERSION: Joi.string()
    .default('1.0')
    .description('API Version'),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  UNIQUE_NAME_DB_DIALECT: Joi.string().default('dialect').description('database sequelize config dialect'),
  UNIQUE_NAME_DB_USERNAME: Joi.string().default('username').description('database sequelize config username'),
  UNIQUE_NAME_DB_PASSWORD: Joi.string().default('password').description('database sequelize config password'),
  UNIQUE_NAME_DB_DATABASE: Joi.string().default('database').description('database sequelize config database'),
  UNIQUE_NAME_DB_HOST: Joi.string().default('host').description('database sequelize config host'),
  UNIQUE_NAME_DB_PORT: Joi.number().default('port').description('database sequelize config port'),
  UNIQUE_NAME_PG_SSL: Joi.bool()
    .default(false)
    .description('Enable SSL connection to PostgreSQL'),
  UNIQUE_NAME_PG_CERT_CA: Joi.string()
    .description('SSL certificate CA') // Certificate itself, not a filename
}).unknown()
  .required()

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  apiVersion: envVars.API_VERSION,
  jwtSecret: envVars.JWT_SECRET,
  database: {
    dialect: envVars.UNIQUE_NAME_DB_DIALECT,
    username: envVars.UNIQUE_NAME_DB_USERNAME,
    password: envVars.UNIQUE_NAME_DB_PASSWORD,
    database: envVars.UNIQUE_NAME_DB_DATABASE,
    host: envVars.UNIQUE_NAME_DB_HOST,
    port: envVars.UNIQUE_NAME_DB_PORT,
    ssl: envVars.UNIQUE_NAME_PG_SSL,
    ssl_ca_cert: envVars.UNIQUE_NAME_PG_CERT_CA
  }

}

export default config
