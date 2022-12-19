const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const Article = sequelize.define('Articles', {
  id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
  title: {type: DataTypes.STRING},
  text: {type: DataTypes.TEXT, allowNull: false},
  creationDate: {type: DataTypes.DATE, allowNull: false},
  tag1: {type: DataTypes.STRING, allowNull: false},
  tag2: {type: DataTypes.STRING, allowNull: true},
  tag3: {type: DataTypes.STRING, allowNull: true},
  img: {type: DataTypes.STRING, allowNull: true},
  categoryId: {type: DataTypes.INTEGER, allowNull: false},
  userId: {type: DataTypes.INTEGER, allowNull: false}
})

module.exports = Article