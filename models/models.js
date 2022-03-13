const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const Article = sequelize.define('articles', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false},
  text: {type: DataTypes.TEXT, allowNull: false},
  creationDate: {type: DataTypes.DATEONLY, allowNull: false},
  tag1: {type: DataTypes.STRING, allowNull: false},
  tag2: {type: DataTypes.STRING, allowNull: true},
  tag3: {type: DataTypes.STRING, allowNull: true}
})

const Category = sequelize.define('category', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false}
})

module.exports = {
  Article, Category
}