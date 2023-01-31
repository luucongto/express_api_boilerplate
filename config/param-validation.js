import Joi from 'joi'

import constants from './constants'

export default {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      type: Joi.string().required().valid(constants.AUTH_TYPE_EMAIL, constants.AUTH_TYPE_FACEBOOK, constants.AUTH_TYPE_LOCAL),
      token: Joi.string(),
      email: Joi.string(),
      displayName: Joi.string(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      password: Joi.string().allow(null),
      activeCode: Joi.string().allow(null)
    }
  },

  // POST /guest-login
  guestLoginForm: {
    body: {
      device_id: Joi.string().required()
    }
  }
}
