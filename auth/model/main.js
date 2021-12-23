const jwt = require('jsonwebtoken')
const expiry = 1000 * 60 * 60 * 4

const checkAuthorization = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, userinfo) => {
            console.log(err)
            if (err) reject(err)
        
            resolve(userinfo)
        })
    })
}

const createUserToken = (userinfo) => {
    return jwt.sign(userinfo, userinfo.salt, { expiresIn: expiry })
}

const createRandToken = () => {

}

module.exports = {
    createUserToken,
    checkAuthorization,
    createRandToken
}