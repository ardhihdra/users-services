const express = require('express')
const dotenv = require('dotenv')
const {initRoute} = require('./routes')

dotenv.config()
const app = express()
const port = process.env.PORT || 3011

app.use(express.json());
initRoute(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
