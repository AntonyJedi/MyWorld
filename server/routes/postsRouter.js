const {postsList, createPost, postOneUpdate, postOneDelete} = require('../controllers/postsController')
const {Router} = require('express')

const posts = Router()

posts.get('/', postsList)
posts.post('/', createPost)
posts.put('/:id', postOneUpdate)
posts.delete('/:id', postOneDelete)

module.exports = posts