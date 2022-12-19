import React from "react";
import Articles from "./Articles";
import {connect} from "react-redux"
import {
  delOneArticleThunkCreator,
  getArticlesThunkCreator,
  newOneArticleThunkCreator
} from "../../../redux/ArticleReducer";
import withRouter from "../../../helpers/ParamHock";

class ArticlesContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if(this.props.param.category) {
      this.props.getArticlesThunkCreator(this.props.param.category);
    } else {
      this.props.getArticlesThunkCreator()
    }
  }
  deleteOne = id => {
    this.props.delOneArticleThunkCreator(id)
  }
  render() {
    return (
      <Articles
        allArticles={this.props.articles}
        deleteOne={this.deleteOne}
        progress={this.props.isFetching}
        isUserAdmin={this.props.isAdmin}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    articles: state.ArticlesStore.articles_store,
    isFetching: state.ArticlesStore.isFetching,
    isAdmin: state.UserStore.isAdmin
  }
}

let withRouterContainer = withRouter(ArticlesContainer)

export default connect(mapStateToProps, {
  getArticlesThunkCreator,
  delOneArticleThunkCreator,
  newOneArticleThunkCreator
})(withRouterContainer)