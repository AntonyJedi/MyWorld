import React from "react";
import {connect} from "react-redux"
import {newOneArticleThunkCreator} from "../../../redux/ArticleReducer";
import CreateArticle from "./CreateArticle";

class CreateArticleContainer extends React.Component {
  constructor(props) {
    super(props);
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
    articles: state.ArticlesStore.articlesStore,
    allCategories: state.ArticlesStore.categoriesStore,
    currentUser: state.UserStore.user
  }
}

export default connect(mapStateToProps, {newOneArticleThunkCreator})(CreateArticleContainer)