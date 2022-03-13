const {Router} = require('express')
const articles = require('./articlesRouter')

const router = Router()

router.use('/articles', articles)

module.exports = router