const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const Users = require('../models/users')(sequelize, DataTypes)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const config = require('config')

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
    const candidate = await Users.findOne({where: {email}})
    if (!candidate) {
      const hashPassword = await bcrypt.hash(password, 5)
      const newUser = await Users.create({email, password: hashPassword, role})
      return res.status(200).json(newUser)
    } else {
      return res.status(400).json({message: 'User already exists'})
    }
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

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll()
    res.json(users)
  } catch (e) {

  }
}


module.exports = {Registration, Login, getUsers}