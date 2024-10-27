const Music = require('../models/musicModel')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

const musicList = async (req, res) => {
  const songs = await Music.findAll({
    order: [['createdAt', 'DESC']]
  })
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
        releaseDate: form.releaseDate,
        userName: form.userName,
        liked: []
      })
      return res.status(200).json(createdSong)
    } else {
      const createdSong = await Music.create({
        song: form.song,
        album: form.album,
        lyrics: form.lyrics,
        category: form.category,
        releaseDate: form.releaseDate,
        userName: form.userName,
        liked: []
      })
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

const likeOneSong = async (req, res) => {
  const song = await Music.findOne({where: {id: req.params.id}})
  let updatedLikedSong;
  if (req.body.add) {
    updatedLikedSong = [...song.liked, req.body.user]
  } else {
    updatedLikedSong = song.liked.filter(name => name !== req.body.user)
  }
  const updatedSong = await Music.update({
    liked: updatedLikedSong
  }, {where: {id: req.params.id}})
  const songLiked = await Music.findOne({where: {id: req.params.id}})
  return res.status(200).json(songLiked);
}

const songOneUpdate = async (req, res) => {
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
      releaseDate: form.releaseDate,
      userName: form.userName
    }, {where: {id: req.params.id}})
    return res.status(200).json(update);
  } else {
    const update = await Music.update({
      song: form.song,
      album: form.text,
      artist: form.artist,
      lyrics: form.lyrics,
      category: form.category,
      releaseDate: form.releaseDate,
      userName: form.userName
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
  musicList, createSong, songsByCategory, songOneUpdate, songOneDelete, likeOneSong
}