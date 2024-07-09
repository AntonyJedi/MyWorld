const {Router} = require('express')
const {categoryList, newCategory} = require('../controllers/categoryController')

const category = Router()

category.get('/', categoryList)
category.post('/new', newCategory)

module.exports = category