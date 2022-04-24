const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const Quotes = sequelize.define('Quotes', {
  id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
  content: {type: DataTypes.INTEGER, allowNull: false}
})

module.exports = Quotes