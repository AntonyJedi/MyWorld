const {Router} = require('express')
const articles = require('./articlesRouter')
const category = require('./categoryRouter')
const music = require("./musicRouter");
const user = require('./userRouter')
const notes = require("./notesRouter");
const posts = require("./postsRouter");
const getAllQuotes = require("../controllers/quotesController");

const router = Router()

router.use('/articles', articles)
router.use('/categories', category)
router.use('/music', music)
router.use('/notes', notes)
router.use('/auth', user)
router.use('/posts', posts)
router.get('/', getAllQuotes)

module.exports = router