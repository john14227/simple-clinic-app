const bcrypt = require('bcrypt');

const salt = 10;

const hashPassword = async (plainPassword) => {
    return bcrypt.hash(plainPassword, salt);
};

const checkPassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = { hashPassword, checkPassword };