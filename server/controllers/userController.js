const Users = require('../models/usersModel')
const Tokens = require('../models/tokenModel')
const {validationResult} = require('express-validator')
const config = require('config')
const usersServices = require("../service/authService/usersService");
const tokensServices = require('../service/authService/tokenService')

const Registration = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({message: 'Errors during registration', errors})
    }
    const {name, email, password, about, job, mood, interests} = req.body
    let interestsArr = interests != "" ? interests.split(', ') : [];
    const resultOfReg = await usersServices.registrationServices(name, email, password, about, job, mood, interestsArr)
    
    if (resultOfReg.status !== 400) {
      res.cookie('refreshToken', resultOfReg.toClient.refreshToken, {httpOnly: true})
    }
    resultOfReg.status === 200 ?
      res.status(resultOfReg.status).json({token: resultOfReg.toClient, user: resultOfReg.user}) :
      res.status(resultOfReg.status).json(resultOfReg.toClient);
  } catch (e) {
    console.log(e.message)
    res.status(400).json({message: 'Something went wrong with registration'})
  }
}

const Login = async (req, res) => {
  try {
    const {email, password} = req.body
    const resultOfLogin = await usersServices.loginServices(email, password)
    if (resultOfLogin.status !== 400) {
      res.cookie('refreshToken', resultOfLogin.token, {httpOnly: true})
    }
    return res.status(resultOfLogin.status).json({toClient: resultOfLogin.toClient, token: resultOfLogin.token, user: resultOfLogin.user})
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

const Refresh = async (req, res) => {
  try {
    const {refreshToken} = req.cookies
    const resultOfRefresh = await usersServices.refreshServices(refreshToken)
    if (resultOfRefresh.status !== 400) {
      res.cookie('refreshToken', resultOfRefresh.tokens.refreshToken, {httpOnly: true})
    }
    return res.status(resultOfRefresh.status).json({message: resultOfRefresh.toClient, tokens: resultOfRefresh.tokens, user: resultOfRefresh.user})
  } catch (e) {
    console.log(e)
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll()
    res.json(users)
  } catch (e) {
    console.log(e)
  }
}

const updateUser = async (req, res) => {
  console.log(req.body)
  try {
    const {nickName, email, about, job, currectMood, interests, friends} = req.body
    const resultOfUpdate = await usersServices.updateUserServices(nickName, email, about, job, currectMood, interests, friends)
    res.status(200).json(resultOfUpdate)
  } catch (e) {
    res.status(400).json({message: 'Something went wrong with updating'})
  }
}

module.exports = {
  Registration,
  Login,
  Logout,
  Activate,
  Refresh,
  getUsers,
  updateUser
}