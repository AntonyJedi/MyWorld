import React, { Component } from 'react'
import {connect} from "react-redux"
import CreateCategory from './CreateCategory';
import { getAllCategoriesThunkCreator, newCategoryThunkCreator, delOneCategoryThunkCreator } from '../../../redux/ArticleReducer';

class CreateCategoryContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllCategoriesThunkCreator()
  }

  newCategory = async (category) => {
    await this.props.newCategoryThunkCreator(category)
  }

  deleteOne = id => {
    this.props.delOneCategoryThunkCreator(id)
  }

  render() {
    return (
      <CreateCategory
        createNewCategory={this.newCategory}
        allCategories={this.props.allCategories}
        deleteOne={this.deleteOne}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    allCategories: state.ArticlesStore.categoriesStore,
  }
}

export default connect(mapStateToProps, {getAllCategoriesThunkCreator, newCategoryThunkCreator, delOneCategoryThunkCreator})(CreateCategoryContainer);
