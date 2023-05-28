const jwt = require('jsonwebtoken');

const secreteKey = "sheraz";

const jwtAuthorization = {
    sign(payload){
        const token = jwt.sign(payload, secreteKey);
        return token;
    }
}

module.exports = jwtAuthorization;