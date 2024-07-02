const {
    songOneDelete,
    songOneUpdate,
    songsByCategory,
    createSong,
    musicList,
    likeOneSong
} = require("../controllers/musicController");

const {Router} = require('express')

const music = Router()

music.get('/all', musicList)
music.get('/:category', songsByCategory)
music.post('/new', createSong)
music.put('/:id', songOneUpdate)
music.put('/like/:id', likeOneSong)
music.delete('/:id', songOneDelete)

module.exports = music