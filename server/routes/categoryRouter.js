const {Router} = require('express')
const {categoryList, newCategory, categoryOneDelete} = require('../controllers/categoryController')

const category = Router()

category.get('/', categoryList)
category.post('/new', newCategory)
category.delete('/:id', categoryOneDelete)

module.exports = category