require('dotenv').config()
module.exports = {
  appenders: {
    out: {
      type: 'stdout'
    },
    access: {
      type: 'dateFile',
      filename: './logs/access.log',
      pattern: '-yyyy-MM-dd',
      category: 'http'
    },
    app: {
      type: 'file',
      filename: './logs/app.log',
      maxLogSize: 10485760,
      pattern: '-yyyy-MM-dd',
      numBackups: 3
    },
    errorFile: {
      type: 'file',
      pattern: '-yyyy-MM-dd',
      filename: './logs/errors.log'
    },
    rsFile: {
      type: 'file',
      pattern: '-yyyy-MM-dd',
      filename: './logs/rs.log'
    },
    rs: {
      type: 'logLevelFilter',
      level: 'DEBUG',
      pattern: '-yyyy-MM-dd',
      appender: 'rsFile'
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      pattern: '-yyyy-MM-dd',
      appender: 'errorFile'
    }
  },
  pm2: true,
  categories: {
    default: { appenders: ['out', 'app', 'errors'], level: 'DEBUG' },
    http: { appenders: ['access', 'out'], level: 'DEBUG' },
    rs: { appenders: ['rs'], level: 'DEBUG' }
  }
}
