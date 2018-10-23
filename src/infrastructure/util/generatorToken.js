
require('dotenv').config()
const jwt = require('jsonwebtoken')

const GeneratorToken = {

    generateAccessToken: (userId) => {    
        let token = jwt.sign({}, process.env.JWT_TOKEN_SECRET, {
            expiresIn: process.env.JWT_EXPIRESIN,
            audience: process.env.JWT_AUDIENCE,
            issuer: process.env.JWT_ISSUER,
            subject: userId.toString()
        });
    
        return token;
    }
    
}

module.exports  = GeneratorToken