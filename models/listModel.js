const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const ToDoList = sequelize.define('ToDoList', {
  id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
  text: {type: DataTypes.TEXT, allowNull: false},
  checked: {type: DataTypes.BOOLEAN, allowNull: false},
  creationDate: {type: DataTypes.DATE, allowNull: false},
  userName: {type: DataTypes.STRING, allowNull: false}
})

module.exports = ToDoList