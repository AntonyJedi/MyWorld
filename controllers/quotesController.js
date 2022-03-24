const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const Quotes = require('../models/quotes')(sequelize, DataTypes)

const getAllQuotes = async (req, res) => {
  const quotes = await Quotes.findAll()
  res.status(200).json(quotes)
}

module.exports = getAllQuotes