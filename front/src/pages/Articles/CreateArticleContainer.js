import React from "react";
import {connect} from "react-redux"
import {newOneArticleThunkCreator} from "../../redux/ArticleReducer";
import CreateArticle from "./CreateArticle";

class CreateArticleContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  newOne = form => {
    this.props.newOneArticleThunkCreator(form)
  }
  render() {
    return (
      <CreateArticle newOne={this.newOne}/>
    )
  }
}

const mapStateToProps = state => {
  return {
    articles: state.ArticlesStore.articles_store
  }
}

export default connect(mapStateToProps, {
  newOneArticleThunkCreator
})(CreateArticleContainer)