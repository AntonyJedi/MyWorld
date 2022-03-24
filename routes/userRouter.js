const {Registration, Login, getUsers} = require("../controllers/userController");
const {Router} = require('express')
const {check} = require('express-validator')
const authMiddleware = require('./../middleware/authMiddleware')
const roleMiddleware = require('./../middleware/roleMiddleware')

const user = Router()

user.post('/registration',[
  check('email', 'Enter correct email').isEmail(),
  check('password', 'Enter password with correct length').isLength({min: 4, max: 10})
], Registration)
user.post('/login', Login)
user.get('/users', authMiddleware, roleMiddleware("admin"), getUsers)

module.exports = user