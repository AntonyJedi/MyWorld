import React from "react";
import Articles from "./Articles";
import {connect} from "react-redux"
import {
  delOneArticleThunkCreator,
  getArticlesThunkCreator,
  newOneArticleThunkCreator,
  likeOneArticleThunkCreator
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
  likeOneArticle = (id, user, add) => {
    this.props.likeOneArticleThunkCreator(id, user, add)
  } 
  render() {
    return (
      <Articles
        allArticles={this.props.articles}
        deleteOne={this.deleteOne}
        progress={this.props.isFetching}
        isUserAdmin={this.props.isAdmin}
        user={this.props.currentUser}
        categoryName={this.props.param.category}
        isAuth={this.props.isAuth}
        likeArticle={this.likeOneArticle}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    articles: state.ArticlesStore.articlesStore,
    isFetching: state.ArticlesStore.isFetching,
    isAdmin: state.UserStore.isAdmin,
    currentUser: state.UserStore.user,
    isAuth: state.UserStore.isAuth
  }
}

const withRouterContainer = withRouter(ArticlesContainer)

export default connect(mapStateToProps, {
  getArticlesThunkCreator,
  delOneArticleThunkCreator,
  newOneArticleThunkCreator,
  likeOneArticleThunkCreator
})(withRouterContainer)