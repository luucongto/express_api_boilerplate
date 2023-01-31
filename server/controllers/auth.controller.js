import jwt from 'jsonwebtoken'
import request from 'request-promise'
import config from '../../config/config'
import constants from '../../config/constants'
import db from '../../config/sequelize'
import APIError from '../helpers/APIError'
const bcrypt = require('bcrypt')
const saltRounds = 10
console.log('db', Object.keys(db))
const User = db.users

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
async function login (req, res, next) {
  try {
    const authType = req.body.type
    const token = req.body.token
    const email = req.body.email
    var password = req.body.password
    var displayName = req.body.displayName
    var picture = req.body.picture

    let user = null
    let username = null
    if (authType === constants.AUTH_TYPE_EMAIL || authType === constants.AUTH_TYPE_LOCAL) {
      var hashedPassword = await bcrypt.hash(password, saltRounds)
      const [userObj, created] = await User.findOrCreate({
        where: {
          email
        },
        defaults: {
          user_type: constants.USER_USER_TYPE_NORMAL,
          username: email,
          email,
          password: hashedPassword,
          picture: picture || '',
          display_name: displayName
        }
      })
      console.log('userObj', userObj.id)
      if (created) {
        user = userObj
      } else {
        var correctPass = await bcrypt.compare(password, userObj.password)
        if (!correctPass) {
          return res.json({
            error: 1,
            message: 'invalid_password'
          })
        } else {
          user = userObj
        }
      }
    } else
    if (authType === constants.AUTH_TYPE_FACEBOOK) {
      const fields = 'id,name'
      const options = {
        method: 'GET',
        uri: 'https://graph.facebook.com/v4.0/me',
        qs: {
          access_token: token,
          fields
        },
        json: true
      }
      const response = await request(options)
      username = `${authType}_${response.id}`
      const [userObj] = await User.findOrCreate({
        where: {
          username
        },
        defaults: {
          user_type: constants.USER_USER_TYPE_NORMAL,
          email,
          picture: picture || '',
          display_name: displayName
        }
      })
      if (picture) {
        userObj.picture = picture
        await userObj.save()
      }
      user = userObj
    } else {
      user = null
    }
    console.log('user', user.id)
    if (user) {
      const jwtToken = jwt.sign({
        username: user.username,
        expiresIn: 3600
      }, config.jwtSecret)
      return res.json({
        data: jwtToken
      })
    } else {
      throw APIError('unknown error when login')
    }
  } catch (e) {
    console.error('login error', e)
    next(e)
  }
}

export default { login }
