const Art = require('../models/articleModel')
const Category = require('../models/categoryModel')
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')

const articlesList = async (req, res) => {
  let {category} = req.query
  if (category) {
    function capitalize(word) {
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }
    category = capitalize(category)
    const cat = await Category.findOne({where: {title: category}})
    const articles = await Art.findAll({where: {categoryId: cat.id}})
    return res.status(200).json(articles)
  }
  const articles = await Art.findAll({order: [['id', 'DESC']]})
  return res.status(200).json(articles)
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
       categoryId: form.categoryId,
       userId: form.userId,
       userName: form.userName,
       liked: [],
       creationDate: new Date().toLocaleDateString("en-US")
     })
     return res.status(200).json(createdArt)
   } else {
     const createdArt = await Art.create({
       title: form.title,
       text: form.text,
       tag1: form.tag1,
       tag2: form.tag2,
       tag3: form.tag3,
       categoryId: form.categoryId,
       userId: form.userId,
       userName: form.userName,
       liked: [],
       creationDate: new Date().toLocaleDateString("en-US")
     })
     return res.status(200).json(createdArt)
   }
 } catch (e) {
   next(res.status(500).json(e.data))
 }
}

const articlesOne = async (req, res) => {
  const one = await Art.findOne({where: {id: req.params.id}})
  return res.status(200).json(one);
}

const articlesOneUpdate = async (req, res) => {
  console.log(req.body)
  const form = req.body
  if (req.files) {
    const delImage = await Art.findOne({where: {id: req.params.id}})
    if (delImage.dataValues.img != null) {
      fs.unlinkSync(path.resolve(__dirname, '..', 'static', delImage.dataValues.img))
    }
    const {image} = req.files
    let updatedFileName = uuid.v4() + ".png"
    await image.mv(path.resolve(__dirname, '..', 'static', updatedFileName))
    const update = await Art.update({
      title:form.title,
      tag1: form.tag1,
      tag2: form.tag2,
      tag3: form.tag3,
      text: form.text,
      img: updatedFileName
    }, {where: {id: req.params.id}})
    return res.status(200).json(update);
  } else {
    const update = await Art.update({
      title:form.title,
      tag1: form.tag1,
      tag2: form.tag2,
      tag3: form.tag3,
      text: form.text
    }, {where: {id: req.params.id}})
    return res.status(200).json(update);
  }
}

const likeOneArticle = async (req, res) => {
  const article = await Art.findOne({where: {id: req.params.id}})
  let updatedLikedArticle;
  if (req.body.add) {
    updatedLikedArticle = [...article.liked, req.body.user]
  } else {
    updatedLikedArticle = article.liked.filter(name => name !== req.body.user)
  }
  const updatedArticle = await Art.update({
    liked: updatedLikedArticle
  }, {where: {id: req.params.id}})
  const ArticleLiked = await Art.findOne({where: {id: req.params.id}})
  return res.status(200).json(ArticleLiked);
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
  articlesList, createArticle, articlesOne, articlesOneUpdate, likeOneArticle, articlesOneDelete
}