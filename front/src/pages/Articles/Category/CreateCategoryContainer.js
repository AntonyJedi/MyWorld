import React, { Component } from 'react'
import {connect} from "react-redux"
import CreateCategory from './CreateCategory';
import { newCategoryThunkCreator } from '../../../redux/ArticleReducer';

class CreateCategoryContainer extends Component {
  constructor(props) {
    super(props);
  }

  newCategory = async (category) => {
    await this.props.newCategoryThunkCreator(category)
  }

  render() {
    return (
      <CreateCategory
        createNewCategory={this.newCategory}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    allCategories: state.ArticlesStore.categoriesStore,
  }
}

export default connect(mapStateToProps, {newCategoryThunkCreator})(CreateCategoryContainer);
