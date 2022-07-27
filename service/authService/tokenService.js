const jwt = require('jsonwebtoken')
const config = require('config')
const Tokens = require('../../models/tokenModel')

const generateToken = async (payload) => {
  const accessToken = jwt.sign(payload, config.get('secret'), {expiresIn: '30s'})
  const refreshToken = jwt.sign(payload, config.get('refresh'), {expiresIn: '24h'})
  return {accessToken, refreshToken}
}

const saveToken = async (UserId, accessToken, refreshToken) => {
  const tokenData = await Tokens.findOne({where: {UserId}})
  if (!tokenData) {
    const newToken = await Tokens.create({UserId, accessToken, refreshToken})
    return newToken
  } else {
    await tokenData.update({accessToken, refreshToken})
  }
}

const removeToken = async (refreshToken) => {
  const tokenData = await Tokens.destroy({where: {refreshToken}})
  return tokenData
}

const findToken = async (refreshToken) => {
  const tokenData = await Tokens.findOne({where: {refreshToken}})
  return tokenData
}

const validateAccessToken = async (token) => {
  try {
    const userData = jwt.verify(token, config.get('secret'));
    return userData
  } catch (e) {
    return null
  }
}

const validateRefreshToken = async (token) => {
  try {
    const userData = jwt.verify(token, config.get('refresh'));
    return userData
  } catch (e) {
    return null
  }
}



module.exports = {generateToken, saveToken, removeToken, findToken, validateAccessToken, validateRefreshToken}