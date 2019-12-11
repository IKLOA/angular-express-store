const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const Admin = mongoose.model('admins')
const User = mongoose.model('users')
const keys = require('../config/keys')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt
}

const options2 = {
  jwtFromRequest: ExtractJwt.fromHeader(),
  secretOrKey: keys.jwt
}

module.exports = (passport) => {
  passport.use('admin-jwt',
    new JwtStrategy(options, async (payload, done) => {
      try {
        const admin = await Admin.findById(payload.adminId).select('email id')

        if (admin) {
          done(null, admin)
        } else {
          done(null, false)
        }
      } catch (e) {
        console.log(e)
      }

    })
  )


  passport.use('user-jwt',
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await User.findById(payload.userId).select('email id')

        if (user) {
          done(null, user)
        } else {
          done(null, false)
        }
      } catch (e) {
        console.log(e)
      }
    })
  )


}


