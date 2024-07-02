import React from "react";
import {connect} from "react-redux"
import HomePage from "./HomePage";
import {getAllCategoriesThunkCreator} from "../../redux/ArticleReducer";

class HomePageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllCategoriesThunkCreator()
  }

  render() {
    return (
      <HomePage
        categories={this.props.allCategories}
        user={this.props.user}
        isAdmin={this.props.isAdmin}
        isAuth={this.props.isAuth}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    allCategories: state.ArticlesStore.categoriesStore,
    user: state.UserStore.user,
    isAdmin: state.UserStore.isAdmin,
    isAuth: state.UserStore.isAuth
  }
}

export default connect(mapStateToProps, {getAllCategoriesThunkCreator})(HomePageContainer)