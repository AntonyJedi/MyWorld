const Users = require('../models/usersModel')
const Tokens = require('../models/tokenModel')
const {validationResult} = require('express-validator')
const config = require('config')
const usersServices = require("../service/authService/usersService");

const Registration = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({message: 'Errors during registration', errors})
    }
    const {name, email, password, role} = req.body
    const resultOfReg = await usersServices.registrationServices(name, email, password, role)
    if (resultOfReg.status !== 400) {
      res.cookie('refreshToken', resultOfReg.toClient.refreshToken, {httpOnly: true})
    }
    res.status(resultOfReg.status).json(resultOfReg.toClient)
  } catch (e) {
    console.log(e)
    return res.status(400).json({message: 'Something went wrong with registration'})
  }
}

const Login = async (req, res) => {
  try {
    const {email, password} = req.body
    const resultOfLogin = await usersServices.loginServices(email, password)
    if (resultOfLogin.status !== 400) {
      res.cookie('refreshToken', resultOfLogin.token, {httpOnly: true})
    }
    return res.status(resultOfLogin.status).json(resultOfLogin.toClient)
  } catch (e) {
    console.log(e)
    return res.status(400).json({message: 'Something went wrong with login'})
  }
}

const Logout = async (req, res) => {
  try {
    const {refreshToken} = req.cookies
    const token = await usersServices.logoutServices(refreshToken)
    res.clearCookie('refreshToken')
    return res.json(token)
  } catch (e) {
      console.log(e)
  }
}

const Activate = async (req, res) => {
  try {
    const activationLink = req.params.link
    await usersServices.activationServices(activationLink)
    res.redirect(config.get('CLIENT_URL'))
  } catch (e) {
      console.log(e)
  }
}

const Refresh = (req, res) => {
  try {
    return res.status(200).json({message: "Yes, it is refresh"})
  } catch (e) {
    console.log(e)
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      include: [{
        model: Tokens,
        attributes: ['refreshToken']
      }]
    })
    res.json(users)
  } catch (e) {
    console.log(e)
  }
}

const getCookie = (req, res) => {
  res.send({message: "Cookies were sent", cookies: req.cookies})
}

module.exports = {
  Registration,
  Login,
  Logout,
  Activate,
  Refresh,
  getUsers,
  getCookie
}