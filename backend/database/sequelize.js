const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');

const dotEnvPath = __dirname + '/../.env';
dotenv.config({ path: dotEnvPath });

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize({
    host: DB_HOST || 'localhost',
    dialect: 'postgres',
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    port: 5432,
    logging: function (str) {
        console.log(str);
    },
    timezone: '+08:00'
});

const DBConnection = (function () {
    let db;
    const createDBConnection = () => {
        return sequelize;
    }

    return {
        getDBConnection: function () {
            if (!db) {
                db = createDBConnection();
            }
            return db;
        }
    };
})();

exports.sequelize = DBConnection.getDBConnection();
