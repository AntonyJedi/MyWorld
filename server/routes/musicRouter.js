const {songOneDelete} = require("../controllers/musicController");
const {songOneUpdate} = require("../controllers/musicController");
const {songsByCategory} = require("../controllers/musicController");
const {createSong} = require("../controllers/musicController");
const {musicList} = require("../controllers/musicController");
const {Router} = require('express')


const music = Router()

music.get('/all', musicList)
music.get('/:category', songsByCategory)
music.post('/new', createSong)
music.put('/:id', songOneUpdate)
music.delete('/:id', songOneDelete)

module.exports = music