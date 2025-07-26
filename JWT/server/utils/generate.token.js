const jwt = require('jsonwebtoken');
const SECRET=process.env.JWT_SECRET;
const generateToken = (userId) => {
    return jwt.sign({ userId }, SECRET, {
        expiresIn: '1h',
    })
};

module.exports = generateToken;