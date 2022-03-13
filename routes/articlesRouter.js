const {Router} = require('express')
const {
  articlesList,
  createArticle,
  articlesOneUpdate,
  articlesOne,
  articlesOneDelete
} = require('../controllers/articlesController')

const articles = Router()

articles.get('/', articlesList)
articles.post('/', createArticle)
articles.get('/:id', articlesOne)
articles.put('/:id', articlesOneUpdate)
articles.delete('/:id', articlesOneDelete)

module.exports = articles