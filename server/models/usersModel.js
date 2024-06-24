const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const Users = sequelize.define('Users', {
  id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
  nickName: {type: DataTypes.STRING, allowNull: false},
  email: {type: DataTypes.STRING, allowNull: false},
  password: {type: DataTypes.STRING, allowNull: false},
  role: {type: DataTypes.STRING, allowNull: false, defaultValue: 'user'},
  isActivated: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
  activationLink: {type: DataTypes.STRING, allowNull: true}
})

module.exports = Users