const express = require('express');
const { authService } = require('../services/auth.service');
const { hashPassword, checkPassword } = require('../utils/hash');

class AuthRoute {
    constructor(authSerivce) {
        this.authSerivce = authSerivce;
        this.login = this.login.bind(this);
        this.registration = this.registration.bind(this);
    }

    router() {
        const router = express.Router();
        router.post('/login', this.login);
        router.post('/registration', this.registration);
        return router;
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await this.authSerivce.readUser(email);
            if (user && await checkPassword(password, user.password)) {
                const token = this.authSerivce.generateToken(user.id);
                res.status(200).json({ success: true, token, username: user.name });
            } else {
                res.status(401).json({ success: false });
            }
        } catch (error) {
            console.log(error);
            res.json({ success: false, message: error.message });
        }
    }
    async registration(req, res) {
        try {
            const payload = { ...req.body, password: await hashPassword(req.body.password) };
            await this.authSerivce.createUser(payload);
            res.status(200).json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    }
}

const authRoute = new AuthRoute(authService);
exports.authRoute = authRoute;