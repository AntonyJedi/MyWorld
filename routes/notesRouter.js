const {notesList, createNote, noteOneUpdate, noteOneDelete} = require("../controllers/listController");
const {Router} = require('express')


const notes = Router()

notes.get('/', notesList)
notes.post('/', createNote)
notes.put('/:id', noteOneUpdate)
notes.delete('/:id', noteOneDelete)

module.exports = notes