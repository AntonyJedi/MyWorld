const List = require('../models/listModel')

const notesList = async (req, res) => {
  console.log(req)
  const notes = await List.findAll({where: {userName: req.params.userName}})
  return res.status(200).json(notes)
}

const createNote = async (req, res, next) => {
  const note = req.body
  try {
    let newNote = await List.create({
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
  try {
    let newNote = await List.update({
      checked: true,
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