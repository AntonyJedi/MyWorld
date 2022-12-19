const Category = require("../models/categoryModel");

const categoryList = async (req, res) => {
  try {
    const allCategories = await Category.findAll()
    return res.status(200).json(allCategories)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {categoryList}