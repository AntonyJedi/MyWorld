const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const Users = sequelize.define('Users', {
  id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
  nickName: {type: DataTypes.STRING, allowNull: false},
  email: {type: DataTypes.STRING, allowNull: false},
  password: {type: DataTypes.STRING, allowNull: false},
  role: {type: DataTypes.STRING, allowNull: false, defaultValue: 'user'},
  about: {type: DataTypes.STRING, allowNull: true},
  currectMood: {type: DataTypes.STRING, allowNull: true},
  interests: {type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true},
  job: {type: DataTypes.STRING, allowNull: true},
  isActivated: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
  activationLink: {type: DataTypes.STRING, allowNull: true}
})

module.exports = Users