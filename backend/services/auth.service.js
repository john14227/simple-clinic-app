const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../constants');
const Clinic = require('../database/models/clinic.model');

class AuthService {
    constructor() {
    }
    generateToken(payload) {
        return jwt.sign(payload, jwtSecret);
    }

    async readUser(email) {
        const user = await Clinic.findOne({
            where: { email }
        });
        return user ? user.get({ plain: true }) : null;
    }
    async createUser(payload) {
        await Clinic.create(payload);
    }
}

const authService = new AuthService()
exports.authService = authService;