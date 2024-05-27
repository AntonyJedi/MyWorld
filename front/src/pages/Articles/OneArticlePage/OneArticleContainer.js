import React from 'react';
import {connect} from "react-redux";
import OneArticle from "./OneArticle";
import withRouter from "../../../helpers/ParamHock";
import {getChosenArticleThunkCreator, delOneArticleThunkCreator} from "../../../redux/ArticleReducer"


class OneArticleContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const id = Number.parseInt(this.props.param.id)
    this.props.getChosenArticleThunkCreator(id)
  }

  deleteOne = id => {
    this.props.delOneArticleThunkCreator(id)
  }

  render() {
    return (
      <OneArticle
        oneArticle={this.props.article}
        isAdmin={this.props.isAdmin}
        user={this.props.currentUser}
        deleteOne={this.deleteOne}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    article: state.ArticlesStore.chosenArticle,
    isAdmin: state.UserStore.isAdmin,
    currentUser: state.UserStore.user
  }
}

const withRouterContainer = withRouter(OneArticleContainer)

export default connect(mapStateToProps, {getChosenArticleThunkCreator, delOneArticleThunkCreator})(withRouterContainer);