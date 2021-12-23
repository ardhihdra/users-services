require('dotenv').config()
const express = require('express')
const {initRoute} = require('./routes')

const app = express()
const port = process.env.PORT || 3011

app.use(express.json());
initRoute(app)

app.listen(port, () => {
  console.log(`Auth app listening at http://localhost:${port}`)
})
