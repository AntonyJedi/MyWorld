const jwt = require('jsonwebtoken')
const config = require("config")

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }
  try {
    const token  = req.headers.authorization.split(" ")[1]
    if (!token) {
      return res.status(401).json({message: "Isn't token"})
    }
    req.user = jwt.verify(token, config.get("secret"))
    next()
  } catch (e) {
    res.status(401).json({message: "Isn't auth"})
  }
}