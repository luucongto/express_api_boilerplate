import db from './sequelize'
// const bcrypt = require('bcryptjs')
const passport = require('passport')
// var LocalStrategy = require('passport-local').Strategy
var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt
var settings = require('./config')

const User = db.User

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findOne({
    where: {
      id: id
    }
  }).then(function (user) {
    done(null, user)
  }).catch(function (err) {
    console.log('NODEAPP', err)
  })
})

// passport.use(new LocalStrategy({ usernameField: 'email' },
//   function (email, password, done) {
//     User.findOne(
//       { where: { email: email } }
//     ).then(user => {
//       if (!user) {
//         return done(null, false, { msg: 'Incorrect username and password' })
//       }

//       if (bcrypt.compareSync(password, user.password)) {
//         return done(null, user)
//       }

//       return done(null, false, { msg: 'Incorrect username and password' })

//     }).catch(err => {
//       return done(null, false, { msg: 'Incorrect username and password' })
//     })
//   }
// ))

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  secretOrKey: settings.jwtSecret
}, function (jwtPayload, done) {
  User.findOne(
    { where: { username: jwtPayload.username } }
  ).then(user => {
    if (user) {
      done(null, user)
    } else {
      done(null, false, { msg: 'Not found userId' })
    }
  }).catch(err => {
    return done(err, false)
  })
}))

module.exports = passport
