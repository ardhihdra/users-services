const mongo = require('ardhihdra-mongo-smpl')
const dotenv = require('dotenv')
dotenv.config()

const connString = process.env.MONGODB_CONNSTRING;
const client = new mongo.init({connString: connString})
// const client = new mongo.init('127.0.0.1','27017','admin','admin','sejutacita')

try {
    client.connect()
} catch (err) {
    console.log(err)
    process.exit(1)
}
module.exports = client