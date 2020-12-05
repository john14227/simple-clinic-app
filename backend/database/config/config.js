const dotenv = require('dotenv');
const dotEnvPath = __dirname + '/../../.env';
dotenv.config({ path: dotEnvPath });

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

module.exports = {
  "development": {
    "username": DB_USER || 'postgres',
    "password": DB_PASSWORD || 'postgres',
    "database": DB_NAME,
    "host": DB_HOST,
    "port": 5432,
    "dialect": "postgres",
  },
  "test": {
    "username": DB_USER || 'postgres',
    "password": DB_PASSWORD || 'postgres',
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": "postgres"
  },
  "production": {
    "username": DB_USER || 'postgres',
    "password": DB_PASSWORD || 'postgres',
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": "postgres"
  }
}
