const Posts = require('../models/postsModel')

const postsList = async (req, res) => {
  const posts = await Posts.findAll({order: [['id', 'DESC']]})
  console.log(posts);
  return res.status(200).json(posts)
}

const createPost = async (req, res) => {
  const {text, userName} = req.body.post;
  const createdPost = await Posts.create({
    text,
    userName
  })
  return res.status(200).json(createdPost)
}

const postOneUpdate = async (req, res) => {
  console.log(req);
}

const postOneDelete = async (req, res) => {
  const del = await Posts.destroy({where: {id: req.params.id}})
  return res.status(200).json(del);
}

module.exports = {
  postsList, createPost, postOneUpdate, postOneDelete
}