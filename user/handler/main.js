const mongo = require('../lib/mongo')
const { ObjectId } = require('mongodb')

const handleGet = async (req, res, next) => {
    try {
        let query = {}
        if(req.query.email) query.email = req.query.email
        if(req.query.name) query.name = req.query.name
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
            name: req.body.name,
            email: req.body.email,
            pwd: req.body.pwd,
            role: req.body.role,
        }
        const users = await mongo.insertOne('users', doc)
        res.json({data: users})
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const handleUpdate = async (req, res, next) => {
    try {
        if(!req.query || !req.query._id) throw '_id is required'
        req.query._id = new ObjectId(req.query._id)
        const query = { _id: req.query._id }
        const doc = req.query
        const users = await mongo.updateAll('users', query, doc, {})
        res.json({data: users})
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const handleDelete = async (req, res, next) => {
    try {
        if(!req.query._id) throw '_id is required'
        const doc = { _id: new ObjectId(req.query._id)}

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