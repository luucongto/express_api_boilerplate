import express from 'express'
import validate from 'express-validation'

import paramValidation from '../../config/param-validation'
import passport from '../../config/passport'

import authCtrl from '../controllers/auth.controller'
const router = express.Router() // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
)

router.route('/login')
  .post(
    validate(paramValidation.login),
    authCtrl.login
  )
router.route('/me')
  .get(
    [passport.authenticate('jwt')],
    (req, res, next) => {
      return res.json({
        data: req.user
      })
    }
  )

export default router
