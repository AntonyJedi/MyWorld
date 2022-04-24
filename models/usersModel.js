const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const Users = sequelize.define('Users', {
  id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
  nickName: {type: DataTypes.STRING, allowNull: false},
  email: {type: DataTypes.STRING, allowNull: false},
  password: {type: DataTypes.STRING, allowNull: false},
  role: {type: DataTypes.STRING, allowNull: false},
  isActivated: {type: DataTypes.BOOLEAN, allowNull: false},
  activationLink: {type: DataTypes.STRING, allowNull: false}
})

module.exports = Users