const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const path = require('path')
const config = require('config')
const router = require('./routes/index')

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))

app.use('/api', router)

const PORT = config.get('port')

const server_run = async () => {
  try {
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
  } catch (e) {
    throw new Error(e)
  }
}

server_run()