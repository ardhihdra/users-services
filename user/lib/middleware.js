const { body, validationResult } = require('express-validator');
const axios = require("axios")

const AUTH_URL = `http://${process.env.AUTH_URL}`

const checkCreateUser = () => {
    return [
        isRole('admin'),
        body('username').notEmpty(), 
        body('email').isEmail(), 
        body('pwd').notEmpty(), 
        body('role').notEmpty(), 
        checkErr
    ]
}

const checkEditUser = (req, res, next) => {
    next()
}

const checkDeleteUser = (req, res, next) => {
    next()
}

const hitAuth = (req) => {
    return new Promise((resolve, reject) => {
        const authHeader = req.headers['authorization']
        const config = {
            headers: { 'Authorization': authHeader }
        }

        axios.post(`${AUTH_URL}/authorization`, {}, config)
            .then(resp => {
                if(!resp || resp.error || resp instanceof Error) throw resp
                resolve(resp.data)
            }).catch(err => {
                reject(err)
            })
    })
}

const checkGetUser = (req, res, next) => {
    hitAuth(req).then(resp => {
        req.userinfo = resp
        const isAdmin = req.userinfo.role === 'admin'
        if(!isAdmin) {
            const isSelf = req.params._id == req.userinfo._id
            if(!isSelf) throw 'Non admin cannot get other users'
            next()
        } else {
            next()
        }
    }).catch(err => {
        console.log(err)
        res.status(401).json(err)
    })
}

const isRole = (role='admin') => {
    return (req, res, next) => {
        hitAuth(req).then(resp => {
            req.userinfo = resp
            if(role !== resp.role) throw 'Unauthorized for this API'
            next()
        }).catch(err => {
            console.log(err)
            res.status(401).json(err)
        })
    }
}

const checkErr = (req, res, next) => {
    const val = validationResult(req)
    if(val.errors.length) {
        res.status(500).json(val.errors)
        return
    }
    
    next()
}

module.exports = {
    checkGetUser,
    checkCreateUser,
    checkEditUser,
    isRole,
    checkDeleteUser
}