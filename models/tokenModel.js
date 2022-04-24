const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const Token = sequelize.define('Token', {
  id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
  accessToken: {type: DataTypes.STRING, allowNull: false},
  refreshToken: {type: DataTypes.STRING, allowNull: false}
})

module.exports = Token