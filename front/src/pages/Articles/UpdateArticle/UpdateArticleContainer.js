import React from "react";
import {connect} from "react-redux"
import {getOneArticleThunkCreator, updateOneArticleThunkCreator} from "../../../redux/ArticleReducer";
import UpdateArticle from "./UpdateArticle";
import withRouter from "../../../helpers/ParamHock";


class UpdateArticleContainer extends React.Component {
  constructor(props) {
    super(props);
    this.updateOneArticle = this.updateOneArticle.bind(this)
  }
  componentDidMount() {
    const id = Number.parseInt(this.props.param.id);
    this.props.getOneArticleThunkCreator(id)
  }

  updateOneArticle(form, id) {
    this.props.updateOneArticleThunkCreator(form, id)
  }

  render() {
    return (
      <UpdateArticle
        article={this.props.article}
        updateArticle={this.updateOneArticle}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    article: state.ArticlesStore.updatedArticle
  }
}

const withRouterUpdateContainer = withRouter(UpdateArticleContainer)

export default connect(mapStateToProps, {getOneArticleThunkCreator, updateOneArticleThunkCreator})(withRouterUpdateContainer)