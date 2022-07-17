const jwt = require('jsonwebtoken')
const config = require("config")
const tokenService = require('../service/authService/tokenService')

module.exports = async function (req, res, next) {
  try {
    const token  = req.headers.authorization.split(" ")[1]
    if (!token) {
      return res.status(401).json({message: "Isn't token"})
    }
    const userData = await tokenService.validateAccessToken(token)
    if (!userData) {
      return res.status(401).json({message: "Token is not valid"})
    }
    req.user = userData
    next();
  } catch (e) {
    res.status(401).json({message: "Isn't auth (from auth middleware)"})
  }
}