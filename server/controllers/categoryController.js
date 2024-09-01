const Category = require("../models/categoryModel");
const Art = require('../models/articleModel')
const capitalize = require("../assist/capitalize");

const categoryList = async (req, res) => {
  try {
    const allCategories = await Category.findAll()
    return res.status(200).json(allCategories)
  } catch (e) {
    console.log(e)
  }
}

const newCategory = async (req, res) => {
  const category = req.body;
  const updatedCat = capitalize(category.name);
  try {
    const newCategory = await Category.create({
      title: updatedCat
    })
    return res.status(200).json(newCategory)
  } catch (e) {
    console.log(e)
  }
}

const categoryOneDelete = async (req, res) => {
  const del = await Category.destroy({where: {id: req.params.id}})
  await Art.destroy({where: {categoryId: req.params.id}})
  res.status(200).json(del);
}

module.exports = {categoryList, newCategory, categoryOneDelete}