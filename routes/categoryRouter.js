const {Router} = require('express')
const {categoryList} = require('../controllers/categoryController')

const category = Router()

category.get('/', categoryList)

module.exports = category