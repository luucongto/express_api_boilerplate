import winston from 'winston'
const transports = {
  console: new winston.transports.Console({ name: 'console', level: 'info', json: true, colorize: true }),
  info: new winston.transports.File({ name: 'info', filename: './logs/combined.log', level: 'info', json: true, colorize: true }),
  error: new winston.transports.File({ name: 'error', filename: './logs/error.log', level: 'error', json: true, colorize: true }),
  warn: new winston.transports.File({ name: 'warning', filename: './logs/warn.log', level: 'warn', json: true, colorize: true }),
  exception: new winston.transports.File({ name: 'exception', filename: './logs/exception.log', json: true, colorize: true })
}
const logger = new (winston.Logger)({
  transports: [
    transports.info,
    transports.error,
    transports.warn
  ],
  exceptionHandlers: [
    transports.exception
  ]
})

export default logger
