'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const Designer = require('./db').Designer

const publicRoutes = require('./routes/public')
const userRoutes = require('./routes/user')

// AUTH
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

const clientIDFacebook = '551311685056191'
const clientSecretFacebook = 'f36cbe07143ce3ebe7ee5254b3530bf0'

passport.serializeUser(function(user, done) {
  done(null, user)
})

passport.deserializeUser(function(user, done) {
  done(null, user)
})

passport.use(new FacebookStrategy({
  clientID: clientIDFacebook,
  clientSecret: clientSecretFacebook,
  callbackURL: 'http://local.neron.com:3000/auth/facebook/callback',
  profileFields: ['id','picture.type(large)', 'emails', 'displayName', 'about', 'gender']
}, function (accessToken, refreshToken, profile, cb){
    Designer.findOne({idFb: profile.id}, function(err, user) {
      if (err) return cb(err, null)
      if (!user) {
        let newDesigner = new Designer({idFb: profile.id, name: profile.displayName})
        newDesigner.save( function(err) {
          if (err) return cb(err, null)
          cb(null, profile)
        })
      } else {
        cb(null, profile)
      }
    })
  }
))

app.use(cookieParser())
app.use(bodyParser.json())
app.use(session({
  secret: 'nana barman',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(function(req, res, next){
  console.log(req.user)
  next()
})

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

// app.use('/admin', adminRoutes)
app.use('/grid', publicRoutes)
app.use('/user', userRoutes)

app.use(express.static(path.join(__dirname, '/public')))

module.exports = app
