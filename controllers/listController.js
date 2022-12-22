const List = require('../models/listModel')

const notesList = async (req, res) => {
  const notes = await List.findAll()
  return res.status(200).json(notes)
}

const createNote = async (req, res, next) => {
  const note = req.body
  try {
    let newNote = List.create({
      text: note.text,
      creationDate: new Date(),
      userName: note.userName,
      checked: false
    })
    return res.status(200).json(newNote)
  } catch (e) {
    next(res.status(500).json(e.data))
  }
}

const noteOneUpdate = async (req, res) => {
  const note = req.body
  try {
    let newNote = List.update({
      text: note.text,
      creationDate: new Date().toLocaleDateString(),
      userName: note.userName
    }, {where: {id: req.params.id}})
    return res.status(200).json(newNote)
  } catch (e) {
    next(res.status(500).json(e.data))
  }
}

const noteOneDelete = async (req, res) => {
  const del = await List.destroy({where: {id: req.params.id}})
  res.status(200).json(del);
}

module.exports = {
  notesList, createNote, noteOneUpdate, noteOneDelete
}