const Users = require('../../models/usersModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mailService');
const tokensServices = require('../authService/tokenService')
const jwtAssist = require('../../assist/jwtPayload')
const config = require('config')

const generateAccessToken = (id, role) => {
  const payload = { id, role }
  return jwt.sign(payload, config.get("secret"), { expiresIn: "24h" })
}

const registrationServices = async (name, email, password, about, job, mood, interests) => {
  const candidate = await Users.findOne({ where: { email } })
  if (!candidate) {
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()
    const newUser = await Users.create({ nickName: name, email, password: hashPassword, about, currectMood: mood, job, interests, activationLink })
    console.log(newUser)
    const mailRes = await mailService.sendActivationLink(email, `${config.get('API_URL')}/api/auth/activate/${activationLink}`)
    const jwtUser = jwtAssist(newUser)
    const tokens = await tokensServices.generateToken(jwtUser)
    await tokensServices.saveToken(jwtUser.id, tokens.accessToken, tokens.refreshToken)
    return {
      status: 200,
      toClient: tokens.refreshToken,
      user: newUser
    }
  } else {
    return {
      status: 400,
      toClient: { message: 'User already exists' }
    }
  }
}

const updateUserServices = async (name, email, password, about, job, currectMood, interests) => {
  const updatedUser = await Users.update({
    nickName: name,
    about,
    currectMood,
    job,
    interests
  }, { where: { email } })
  return {
    status: 200,
    updatedUser
  }
}

const loginServices = async (email, password) => {
  const user = await Users.findOne({ where: { email } })
  if (!user) {
    return {
      status: 400,
      toClient: `User ${email} doesn't exist`
    }
  }
  const validPassword = bcrypt.compareSync(password, user.password)
  if (!validPassword) {
    return {
      status: 400,
      toClient: 'Password is invalid'
    }
  }
  const jwtUser = jwtAssist(user)
  const tokens = await tokensServices.generateToken(jwtUser)
  await tokensServices.saveToken(jwtUser.id, tokens.accessToken, tokens.refreshToken)
  return {
    status: 200,
    toClient: `User ${email} was logged in and token is - ${tokens.refreshToken}`,
    token: tokens.refreshToken,
    user: user
  }
}

const logoutServices = async (refreshToken) => {
  const token = tokensServices.removeToken(refreshToken)
  return token
}

const refreshServices = async (refreshToken) => {
  if (!refreshToken) {
    return {
      status: 401,
      toClient: 'User is unauthorized'
    }
  }
  const validToken = await tokensServices.validateRefreshToken(refreshToken)
  const tokenFromDB = await tokensServices.findToken(refreshToken)
  if (!validToken || !tokenFromDB) {
    return {
      status: 401,
      toClient: 'User is unauthorized'
    }
  }
  const user = await Users.findOne({ where: { id: validToken.id } })
  const jwtUser = jwtAssist(user)
  const tokens = await tokensServices.generateToken(jwtUser)
  await tokensServices.saveToken(jwtUser.id, tokens.accessToken, tokens.refreshToken)
  return {
    status: 200,
    toClient: 'Token was refreshed',
    tokens: tokens,
    user: user
  }
}

const activationServices = async (activationLink) => {
  const user = await Users.findOne({ where: { activationLink } })
  if (!user) {
    console.log("No such user here!")
  }
  await user.update({ isActivated: true })
}

module.exports = {
  registrationServices,
  loginServices,
  logoutServices,
  activationServices,
  refreshServices,
  updateUserServices
}