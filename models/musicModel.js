const {DataTypes} = require('sequelize')
const sequelize = require('../db')

const Music = sequelize.define('Music', {
  id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
  song: {type: DataTypes.STRING, allowNull: false},
  album: {type: DataTypes.STRING, allowNull: false},
  lyrics: {type: DataTypes.TEXT, allowNull: false},
  category: {type: DataTypes.STRING, allowNull: false},
  img: {type: DataTypes.STRING, allowNull: true},
  releaseDate: {type: DataTypes.DATE, allowNull: false}
})

module.exports = Music