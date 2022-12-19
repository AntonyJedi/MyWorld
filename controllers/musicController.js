const Music = require('../models/musicModel')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

const musicList = async (req, res) => {
  const songs = await Music.findAll()
  return res.status(200).json(songs)
}

const createSong = async (req, res, next) => {
  try {
    const form = req.body
    if (req.files) {
      const {image} = req.files
      let filename = uuid.v4() + ".png"
      await image.mv(path.resolve(__dirname, '..', 'static', filename))
      const createdSong = await Music.create({
        song: form.song,
        album: form.album,
        lyrics: form.lyrics,
        category: form.category,
        img: filename,
        releaseDate: form.releaseDate
      })
      return res.status(200).json(createdSong)
    } else {
      const createdSong = await Music.create({
        song: form.song,
        album: form.album,
        lyrics: form.lyrics,
        category: form.category,
        releaseDate: form.releaseDate
      })
      console.log(createdSong)
      return res.status(200).json(createdSong)
    }
  } catch (e) {
    next(res.status(500).json(e.message))
  }
}

const songsByCategory = async (req, res) => {
  const some = await Music.findOne({where: {category: req.params.category}})
  return res.status(200).json(some);
}

const songOneUpdate = async (req, res) => {
  console.log(req.body)
  const form = req.body
  if (req.files) {
    const delArt = await Music.findOne({where: {id: req.params.id}})
    delArt.dataValues.img != null && fs.unlinkSync(path.resolve(__dirname, '..', 'static', delArt.dataValues.img))
    const {image} = req.files
    let updatedFileName = uuid.v4() + ".png"
    await image.mv(path.resolve(__dirname, '..', 'static', updatedFileName))
    const update = await Music.update({
      song: form.song,
      album: form.text,
      artist: form.artist,
      lyrics: form.lyrics,
      category: form.category,
      img: updatedFileName,
      releaseDate: form.releaseDate
    }, {where: {id: req.params.id}})
    return res.status(200).json(update);
  } else {
    const update = await Music.update({
      song: form.song,
      album: form.text,
      artist: form.artist,
      lyrics: form.lyrics,
      category: form.category,
      releaseDate: form.releaseDate
    }, {where: {id: req.params.id}})
    return res.status(200).json(update);
  }
}

const songOneDelete = async (req, res) => {
  const delImage = await Music.findOne({where: {id: req.params.id}})
  if (delImage.dataValues.img != null) {
    fs.unlinkSync(path.resolve(__dirname, '..', 'static', delImage.dataValues.img))
  }
  const del = await Music.destroy({where: {id: req.params.id}})
  res.status(200).json(del);
}

module.exports = {
  musicList, createSong, songsByCategory, songOneUpdate, songOneDelete
}