const jwt = require('jsonwebtoken')
const config = require('config')
const Tokens = require('../../models/tokenModel')

const generateToken = async (payload) => {
  const accessToken = jwt.sign(payload, config.get('secret'), {expiresIn: '1h'})
  const refreshToken = jwt.sign(payload, config.get('refresh'), {expiresIn: '24h'})
  return {accessToken, refreshToken}
}

const saveToken = async (UserId, refreshToken) => {
  const tokenData = await Tokens.findOne({where: {UserId}})
  if (!tokenData) {
    const newToken = await Tokens.create({UserId, refreshToken})
    return newToken
  } else {
    await tokenData.update({refreshToken})
  }
}

const removeToken = async (refreshToken) => {
  const tokenData = await Tokens.destroy({where: {refreshToken}})
  return tokenData
}

module.exports = {generateToken, saveToken, removeToken}