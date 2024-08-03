const Category = require("../models/categoryModel");

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
  try {
    const newCategory = await Category.create({
      title: category.name
    })
    return res.status(200).json(newCategory)
  } catch (e) {
    console.log(e)
  }
}

const categoryOneDelete = async (req, res) => {
  const del = await Category.destroy({where: {id: req.params.id}})
  res.status(200).json(del);
}

module.exports = {categoryList, newCategory, categoryOneDelete}