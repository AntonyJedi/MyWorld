const Users = require('../models/usersModel')
const Tokens = require('../models/tokenModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const config = require('config')
const usersServices = require("../service/authService/usersService");

const generateAccessToken = (id, role) => {
  const payload = {id, role}
  return jwt.sign(payload, config.get("secret"), {expiresIn: "24h"})
}

const Registration = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({message: 'Errors during registration', errors})
    }
    const {email, password, role} = req.body
    const resultOfReg = await usersServices.registrationServices(email, password, role)
    return res.status(resultOfReg.status).json(resultOfReg.toClient)
  } catch (e) {
    console.log(e)
    return res.status(400).json({message: 'Something went wrong with registration'})
  }
}

const Login = async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await Users.findOne({where: {email}})
    if (!user) {
      return res.status(400).json({message: `User ${email} doesn't exist`})
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({message: 'Password is invalid'})
    }
    const token = generateAccessToken(user.id, user.role)
    return res.status(200).json({message: `User ${email} was logged in`, token})
  } catch (e) {
    console.log(e)
    return res.status(400).json({message: 'Something went wrong with login'})
  }
}

const Logout = (req, res) => {
  try {
    return res.status(200).json({message: "Yes, it is logout"})
  } catch (e) {

  }
}

const Activate = (req, res) => {
  try {
    return res.status(200).json({message: "Yes, it is logout"})
  } catch (e) {

  }
}

const Refresh = (req, res) => {
  try {
    return res.status(200).json({message: "Yes, it is refresh"})
  } catch (e) {

  }
}

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      include: [{
        model: Tokens
      }]
    })
    res.json(users)
  } catch (e) {
    console.log(e)
  }
}

const getTokens = async (req, res) => {
  try {
    const tokens = await Users.findAll()
    res.json(tokens)
  } catch (e) {
      console.log(e)
  }
}


module.exports = {Registration, Login, Logout, Activate, Refresh, getUsers}