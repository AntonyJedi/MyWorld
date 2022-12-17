const {Router} = require('express')
const articles = require('./articlesRouter')
const music = require("./musicRouter");
const user = require('./userRouter')
const getAllQuotes = require("../controllers/quotesController");

const router = Router()

router.use('/articles', articles)
router.use('/music', music)
router.use('/auth', user)
router.get('/', getAllQuotes)

module.exports = router