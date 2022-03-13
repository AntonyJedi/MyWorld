const express = require('express')
const cors = require('cors')
const config = require('config')
const router = require('./routes/index')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', router)

const PORT = config.get('port')

const server_run = async () => {
  try {
    // await sequelize.authenticate()
    // await sequelize.sync({force: true})
    // await console.log(Art)
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
  } catch (e) {
    throw new Error(e)
  }
}

server_run()