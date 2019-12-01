var randomstring = require('randomstring')
var bcrypt = require('bcryptjs')

exports.generateVerifyToken = function () {
  return randomstring.generate({ length: 30, charset: 'alphanumeric' })
}

exports.generateTempPassword = function () {
  return randomstring.generate({ length: 20, charset: 'alphanumeric' })
}

exports.generatePasswordHash = function (password) {
  const salt = bcrypt.genSaltSync(12)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

exports.getNow = function () {
  return new Date()
}

exports.getNowTime = function () {
  return parseInt((new Date().getTime()) / 1000)
}

exports.convertToTime = function (date) {
  return parseInt(date.getTime() / 1000)
}

exports.convertWeiToEth = function (wei) {
  return wei / 10 ** 18
}
