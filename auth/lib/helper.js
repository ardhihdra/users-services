const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const randtoken = require('rand-token')

const pepper = "l4da_bu47_b3r5in!" // simple pepper, use crypto stored in .env instead
const token_secret = process.env.TOKEN_SECRET || '5ed45e1d00adbe68fb497199cd3e08ac'
const digest = `sha512`
const inter = 5
const keylen = 64
const expiry = 1000 * 60 * 60

const setPwdHash = (pwd) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(pwd+pepper, salt, inter, keylen, digest).toString('hex')
    return [salt, hash]
}

const validateHash = (salt, pwd, hashed) => {
    const hash = crypto.pbkdf2Sync(pwd+pepper, salt, inter, keylen, digest).toString('hex')
    return hash === hashed
}

const checkAuthorization = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, token_secret, (err, userinfo) => {
            if (err) { 
                console.log(err)
                reject(err)
            }
            resolve(userinfo)
        })
    })
}

const createUserToken = (userinfo) => {
    return jwt.sign(userinfo, token_secret, { expiresIn: expiry })
}

const createRandToken = () => {
    return randtoken.uid(256)
}

module.exports = {
    setPwdHash,
    validateHash,
    createUserToken,
    checkAuthorization,
    createRandToken
}