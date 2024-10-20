const {Registration, Login, Logout, Activate, Refresh, getUsers, updateUser} = require("../controllers/userController");
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
user.post('/logout', Logout)
user.post('/user/update', updateUser)
user.get('/users', getUsers)
user.get('/activate/:link', Activate)
user.get('/refresh', Refresh)

module.exports = user

// authMiddleware, roleMiddleware("admin")