const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const { authRoute } = require('./routes/auth.route');
const { clinicRoute } = require('./routes/clinic.route');
const { sequelize } = require('./database/sequelize');

const port = 8100;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./utils/passport');

const isLoggedIn = passport.authenticate('jwt', { session: false });

app.use('/', authRoute.router());
app.use('/clinic', isLoggedIn, clinicRoute.router());

app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
        console.log(`Listening to port ${port}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});