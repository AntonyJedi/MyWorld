const jwt = require('jsonwebtoken')
const config = require('config')
const sequelize = require('../../db')
const {DataTypes} = require('sequelize')
const Tokens = require('../../models/tokens')(sequelize, DataTypes)

const generateToken = async (payload) => {
  const accessToken = jwt.sign(payload, config.get('secret'), {expiresIn: '1h'})
  const refreshToken = jwt.sign(payload, config.get('refresh'), {expiresIn: '24h'})
  return {accessToken, refreshToken}
}

const saveToken = async (userId, refreshToken) => {
  const tokenData = await Tokens.findOne({where: {userId}})
  if (!tokenData) {
    const newToken = await Tokens.create(userId, refreshToken)
    return newToken
  } else {
    tokenData.refreshToken = refreshToken
  }
}

module.exports = {generateToken}