import constants from '../../config/constants'
var passport = require('passport')
var express = require('express')
var router = express.Router()
const adminController = require('../controllers/admin.controller')
var verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === constants.ROLES.ADMIN) {
    next()
  } else {
    return res.json({
      status: 'error',
      message: 'Unauthorized.'
    })
  }
}
router.get('/admin/:modelName', [passport.authenticate('jwt'), verifyAdmin], adminController.list)
router.put('/admin/:modelName/:id', [passport.authenticate('jwt'), verifyAdmin], adminController.update)
router.delete('/admin/:modelName', [passport.authenticate('jwt'), verifyAdmin], adminController.delete)
router.post('/admin/:modelName', [passport.authenticate('jwt'), verifyAdmin], adminController.add)

module.exports = router
