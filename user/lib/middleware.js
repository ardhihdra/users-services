const { body, validationResult } = require('express-validator');

const checkCreateUser = () => {
    return [
        body('name').notEmpty(), 
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

const checkErr = (req, res, next) => {
    const val = validationResult(req)
    if(val.errors.length) {
        res.status(500).json(val.errors)
        return
    }
    next()
}

module.exports = {
    checkCreateUser,
    checkEditUser,
    checkDeleteUser
}