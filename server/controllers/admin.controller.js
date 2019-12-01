import db from '../../config/sequelize'
import Const from '../../config/constants'
var models = db
const Sequelize = models.Sequelize
const Op = Sequelize.Op
var log = require('log4js').getLogger('index')
const { generatePasswordHash } = require('../Utils')
const MODEL_NAME_USER = Const.MODEL_NAMES.USER
exports.list = async (req, res) => {
  try {
    var { modelName } = req.params
    var { page, limit, term, field, extraFields } = req.query
    log.debug(req.query, extraFields, Object.keys(models))
    var model = models[modelName]
    if (!model) {
      return res.json({
        status: Const.RESPONSE_STATUS_FAILED
      })
    }
    limit = parseInt(limit || 10)
    page = parseInt(page || 1)
    var where = null
    if (term) {
      field = field || 'id'
      where = {
      }
      where[field] = {
        [Op.like]: `%${term}%`
      }
    }
    if (extraFields) {
      try {
        extraFields = JSON.parse(extraFields)
        where = where || {}
        Object.keys(extraFields).forEach(key => {
          where[key] = extraFields[key]
        })
      } catch (ex) {
        log.error(ex)
      }
    }
    var count = where ? await model.count({
      where: where
    }) : await model.count()
    var data = where ? await model.findAll({
      where: where,
      offset: (page - 1) * limit,
      limit: limit
    }) : await model.findAll({
      offset: (page - 1) * limit,
      limit: limit
    })
    return res.json({
      data: {
        totalPage: Math.ceil(count / limit),
        total: count,
        data: data,
        page: page
      }
    })
  } catch (e) {
    console.error(e)
    return res.json({
      error: 1,
      data: {
        totalPage: Math.ceil(count / limit),
        total: count,
        data: data,
        page: page
      }
    })
  }
}
exports.update = async (req, res) => {
  try {
    var { modelName, id } = req.params
    var { data } = req.body
    var model = models[modelName]
    if (!model) {
      return res.json({
        status: Const.RESPONSE_STATUS_FAILED
      })
    }
    var currentData = await model.findOne({
      where: {
        id: id
      }
    })
    if (!currentData) {
      return res.json({
        status: Const.RESPONSE_STATUS_FAILED
      })
    }
    if (modelName === MODEL_NAME_USER) {
      var userByEmail = await model.findOne({ where: { email: data.email } })
      if (userByEmail && userByEmail.id !== data.id) {
        return res.json({
          status: Const.RESPONSE_STATUS_FAILED,
          message: 'server_error_duplicated_data'
        })
      }
    }
    Object.keys(data).forEach(key => {
      if (key !== 'id') {
        if (modelName === MODEL_NAME_USER && key === 'password' && currentData[key] !== data[key]) {
          currentData[key] = generatePasswordHash(data[key])
        } else {
          currentData[key] = data[key]
        }
      }
    })
    await currentData.save()
    return res.json({
      status: 'success',
      data: currentData
    })
  } catch (e) {
    return res.json({
      status: Const.RESPONSE_STATUS_FAILED,
      message: e.error || e.name || e
    })
  }
}

exports.delete = async (req, res) => {
  try {
    var { modelName } = req.params
    var { id } = req.query
    var model = models[modelName]
    if (!model) {
      return res.json({
        status: Const.RESPONSE_STATUS_FAILED
      })
    }
    await model.destroy({
      where: {
        id: id
      }
    })
    return res.json({
      status: 'success',
      data: true
    })
  } catch (e) {
    return res.json({
      status: Const.RESPONSE_STATUS_FAILED,
      message: e.error || e.name || e
    })
  }
}

exports.add = async (req, res) => {
  var { modelName } = req.params
  var { data } = req.body
  var model = models[modelName]
  if (!model) {
    return res.json({
      status: Const.RESPONSE_STATUS_FAILED,
      message: 'model_not_found'
    })
  }
  // if is user
  try {
    var currentData
    if (modelName === MODEL_NAME_USER) {
      data.locale = 'ja'
      var userByEmail = await model.findOne({ where: { email: data.email } })
      if (userByEmail) {
        return res.json({
          status: Const.RESPONSE_STATUS_FAILED,
          message: 'server_error_duplicated_data'
        })
      }
      data.password = generatePasswordHash(data.password)
      currentData = await model.create(data)
    } else {
      currentData = await model.create(data)
    }

    return res.json({
      status: 'success',
      data: currentData
    })
  } catch (e) {
    return res.json({
      status: 'false',
      message: e.error || e.name || e
    })
  }
}
