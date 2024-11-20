const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];  // Extract token from header
    
    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateJWT;