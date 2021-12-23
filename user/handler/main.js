const mongo = require('../lib/mongo')
const { ObjectId } = require('mongodb')
const AUTH_URL = `http://${process.env.AUTH_URL}`
const axios = require("axios")

const handleGet = async (req, res, next) => {
    try {
        let query = {}
        if(req.params._id) query._id = new ObjectId(req.params._id)

        if(req.query.username) query.username = req.query.username
        if(req.query.email) query.email = req.query.email
        if(req.query.role) query.role = req.query.role
        const users = await mongo.findAll('users', query, {})
        
        res.json({data: users})
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const handleCreate = async (req, res, next) => {
    try {
        const doc = {
            username: req.body.username,
            pwd: req.body.pwd,
            email: req.body.email,
            role: req.body.role,
        }
        // const users = await mongo.insertOne('users', doc)
        const users = await axios.post(`${AUTH_URL}/register`, doc)
        res.json({data: users.data})
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const handleUpdate = async (req, res, next) => {
    try {
        req.query._id = new ObjectId(req.query._id)
        const query = { _id: req.query._id }
        const doc = req.query
        // if(doc.pwd) {
        //     const update = await axios.put(`${AUTH_URL}/password`, {})
        //     if(!update || update.error || update instanceof Error) throw update
        //     req.userinfo = update.data
        //     const isAdmin = req.userinfo.role === 'admin'
        //     if(!isAdmin) {
        //         const isSelf = req.params._id == req.userinfo._id
        //         if(!isSelf) throw 'Non admin cannot get other users'
        //         next()
        //     } else {
        //         next()
        //     }
        // }
        const users = await mongo.updateAll('users', query, doc, {})
        res.json({data: users})
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const handleDelete = async (req, res, next) => {
    try {
        if(!req.params._id) throw '_id is required'
        const doc = { _id: new ObjectId(req.params._id)}

        const users = await mongo.deleteOne('users', doc)
        res.json({data: users})
    } catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports = {
    handleGet,
    handleCreate,
    handleUpdate,
    handleDelete
}