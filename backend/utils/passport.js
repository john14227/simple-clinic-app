const passport = require('passport');
const passportJWT = require('passport-jwt');
const { ExtractJwt } = passportJWT;
const constants = require('../constants');
const JWTStrategy = passportJWT.Strategy;
const Clinic = require('../database/models/clinic.model');

passport.use('jwt', new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('token'),
    secretOrKey: constants.jwtSecret
}, async (payload, done) => {
    const user = await Clinic.findOne({ id: payload.id });
    if (user) {
        return done(null, { id: user.id });
    } else {
        return done(new Error('User not Found'), null);
    }
}))