const {Router} = require('express')
const articles = require('./articlesRouter')
const user = require('./userRouter')
const getAllQuotes = require("../controllers/quotesController");

const router = Router()

router.use('/articles', articles)
router.use('/auth', user)
router.get('/', getAllQuotes)

module.exports = router