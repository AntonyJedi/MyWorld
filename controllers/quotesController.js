const Quotes = require('../models/quotesModel')

const getAllQuotes = async (req, res) => {
  const quotes = await Quotes.findAll()
  res.status(200).json(quotes)
}

module.exports = getAllQuotes