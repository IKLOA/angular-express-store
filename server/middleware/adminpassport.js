const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const Admin = mongoose.model('admins')
const keys = require('../config/keys')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.jwt
}

module.exports = passport => {
  passport.use(
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
}
