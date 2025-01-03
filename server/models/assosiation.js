const Articles = require('../models/articleModel')
const Music = require('../models/musicModel')
const Category = require('../models/categoryModel')
const Quotes = require('../models/quotesModel')
const Users = require('../models/usersModel')
const Tokens = require('../models/tokenModel')
const ToDoList = require('../models/listModel')
const Posts = require('../models/postsModel')

Users.hasOne(Tokens)
Tokens.belongsTo(Users)


module.exports = {Articles, Music, Category, Quotes, Users, Tokens, ToDoList, Posts}