const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const Posts = sequelize.define('Posts', {
  id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
  userName: {type: DataTypes.STRING, allowNull: false},
  text: {type: DataTypes.TEXT, allowNull: false},
})

module.exports = Posts