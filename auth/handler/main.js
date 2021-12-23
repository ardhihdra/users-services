const { 
    setPwdHash, validateHash, 
    createUserToken, createRandToken, checkAuthorization
} = require('../lib/helper')

const mongo = require('../lib/mongo')

const handleRegister = async (req, res, next) => {
    try {
        const doc = {}
        if(!req.body.username) throw 'Username required'
        if(!req.body.pwd) throw 'Password required'
        const [salt,hash] = setPwdHash(req.body.pwd)

        doc.username = req.body.username
        if(req.body.email) doc.email = req.body.email
        if(req.body.role) doc.role = req.body.role
        doc.pwd = hash
        doc.salt = salt

        const users = await mongo.insertOne('users', doc, {})
        if(!users) throw 'Failed to save users'
        res.sendStatus(204)
    } catch (err) {
        res.sendStatus(400)
        next(err)
    }
}

const handleLogin = async (req, res, next) => {
    try {
        const doc = {
            username: req.body.username,
        }
        // verify pwd
        const userinfo = await mongo.findOne('users', doc)
        if(!userinfo) throw 'Unauthorized' 
        if(!validateHash(userinfo.salt, req.body.pwd, userinfo.pwd)) throw 'Unauthorized'
        
        delete userinfo.pwd
        delete userinfo.salt
        const token = createUserToken(userinfo)
        const refreshToken = createRandToken()
        // save username and refreshtoken to mongo
        const users = await mongo.insertOne('token', {
            username: req.body.username,
            refreshToken: refreshToken
        })
        if(!users) throw 'Failed to save login'
        res.json({token: 'JWT ' + token, refreshToken: refreshToken})
    } catch (err) {
        res.sendStatus(401)
        next(err)
    }
}

const handleToken = async (req, res, next) => {
    try {
        const doc = {
            username: req.body.username,
            refreshToken: req.body.refreshToken,
        }
        const [userinfo, token] = await Promise.all([
            mongo.findOne('users', { username: req.body.username }),
            mongo.findOne('token', doc)
        ])
        if(!token) throw 'Unauthorized'
        if(!userinfo) throw 'Unauthorized'

        const newToken = createUserToken(userinfo)

        res.json({token: 'JWT ' + newToken})
    } catch (err) {
        res.sendStatus(401)
        next(err)
    }
}

const handleRevokeToken = async (req, res, next) => {
    try {
        const refreshToken = req.body.refreshToken
        const token = await mongo.deleteOne('token', {refreshToken: refreshToken})
        if(!token) throw 'Failed to delete'
        res.sendStatus(204)
    } catch (err) {
        res.sendStatus(401)
        next(err)
    }
}

const handleAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        const userinfo = await checkAuthorization(token)
            .catch(err => {throw err})

        if(!userinfo) throw 'Failed to authorize'
        delete userinfo.pwd
        delete userinfo.salt
        res.json(userinfo)
    } catch (err) {
        res.sendStatus(401)
        next(err)
    }
}


const handleLogout = async (req, res, next) => {
    try {
        res.json(200)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    handleRegister,

    handleLogin,
    handleToken,
    handleRevokeToken,
    handleAuth,

    handleLogout,
}