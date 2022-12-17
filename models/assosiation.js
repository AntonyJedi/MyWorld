const Articles = require('../models/articleModel')
const Music = require('../models/musicModel')
const Category = require('../models/categoryModel')
const Quotes = require('../models/quotesModel')
const Users = require('../models/usersModel')
const Tokens = require('../models/tokenModel')

Users.hasOne(Tokens)
Tokens.belongsTo(Users)


module.exports = {Articles, Music, Category, Quotes, Users, Tokens}