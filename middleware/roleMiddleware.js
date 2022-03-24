const jwt = require('jsonwebtoken')
const config = require("config")

module.exports = function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next()
    }
    try {
      const token  = req.headers.authorization.split(" ")[1]
      if (!token) {
        return res.status(401).json({message: "Isn't auth"})
      }
      const {role} = jwt.verify(token, config.get("secret"))
      let hasRole = false
      if (roles.includes(role)) {
        hasRole = true
      }
      if (!hasRole) {
        return res.status(403).json({message: "Access denied to this user"})
      }
      next()
    } catch (e) {
      res.status(401).json({message: "Isn't auth"})
    }
  }
}