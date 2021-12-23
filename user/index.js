const express = require('express')
const {initRoute} = require('./routes')
const app = express()
const port = process.env.PORT || 3010

app.use(express.json());
initRoute(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})