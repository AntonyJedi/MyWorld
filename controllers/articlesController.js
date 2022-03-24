const sequelize = require('../db')
const {DataTypes} = require('sequelize')
const Art = require('../models/articles')(sequelize, DataTypes)
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

const articlesList = async (req, res) => {
  const articles = await Art.findAll()
  res.status(200).json(articles)
}

const createArticle = async (req, res, next) => {
 try {
   const form = req.body
   if (req.files) {
     const {image} = req.files
     let filename = uuid.v4() + ".png"
     await image.mv(path.resolve(__dirname, '..', 'static', filename))
     const createdArt = await Art.create({
       title: form.title,
       text: form.text,
       tag1: form.tag1,
       tag2: form.tag2,
       tag3: form.tag3,
       img: filename,
       creationDate: new Date().toISOString()
     })
     return res.status(200).json(createdArt)
   } else {
     const createdArt = await Art.create({
       title: form.title,
       text: form.text,
       tag1: form.tag1,
       tag2: form.tag2,
       tag3: form.tag3,
       creationDate: new Date().toISOString()
     })
     return res.status(200).json(createdArt)
   }
 } catch (e) {
   next(res.status(500).json(e.message))
 }
}

const articlesOne = async (req, res) => {
  const one = await Art.findOne({where: {id: req.params.id}})
  res.status(200).json(one);
}

const articlesOneUpdate = async (req, res) => {
  console.log(req.body)
  const update = await Art.update({
    title: req.body.title,
    tag1: req.body.tag1,
    tag2: req.body.tag2,
    tag3: req.body.tag3,
    text: req.body.text
  }, {where: {id: req.params.id}})
  res.status(200).json(update);
  console.log(update)
}

const articlesOneDelete = async (req, res) => {
  const delImage = await Art.findOne({where: {id: req.params.id}})
  if (delImage.dataValues.img != null) {
    fs.unlinkSync(path.resolve(__dirname, '..', 'static', delImage.dataValues.img))
  }
  const del = await Art.destroy({where: {id: req.params.id}})
  res.status(200).json(del);
}

module.exports = {
  articlesList, createArticle, articlesOne, articlesOneUpdate, articlesOneDelete
}