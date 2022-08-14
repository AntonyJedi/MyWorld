import React from 'react';
import {connect} from "react-redux";
import OneArticle from "./OneArticle";
import withRouter from "../ParamArticleHock";
import {getChosenArticleThunkCreator} from "../../../redux/ArticleReducer"


class OneArticleContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const id = Number.parseInt(this.props.param)
    this.props.getChosenArticleThunkCreator(id)
  }

  render() {
    return (
      <OneArticle oneArticle={this.props.article}/>
    );
  }
}

const mapStateToProps = state => {
  return {
    article: state.ArticlesStore.chosenArticle
  }
}

let withRouterContainer = withRouter(OneArticleContainer)

export default connect(mapStateToProps, {getChosenArticleThunkCreator})(withRouterContainer);