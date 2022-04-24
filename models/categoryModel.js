const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const Category = sequelize.define('Category', {
  id: {allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER},
  title: {type: DataTypes.STRING}
})

module.exports = Category