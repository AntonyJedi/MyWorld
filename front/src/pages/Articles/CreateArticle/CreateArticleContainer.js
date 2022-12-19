import React from "react";
import {connect} from "react-redux"
import {getAllCategoriesThunkCreator, newOneArticleThunkCreator} from "../../../redux/ArticleReducer";
import CreateArticle from "./CreateArticle";

class CreateArticleContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllCategoriesThunkCreator()
  }

  newOne = async (form) => {
    await this.props.newOneArticleThunkCreator(form)
  }
  render() {
    return (
      <CreateArticle
        newOne={this.newOne}
        categories={this.props.allCategories}
        user={this.props.currentUser}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    articles: state.ArticlesStore.articles_store,
    allCategories: state.ArticlesStore.categories_store,
    currentUser: state.UserStore.user
  }
}

export default connect(mapStateToProps, {newOneArticleThunkCreator, getAllCategoriesThunkCreator})(CreateArticleContainer)