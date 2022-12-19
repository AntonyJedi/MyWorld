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
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    allCategories: state.ArticlesStore.categories_store
  }
}

export default connect(mapStateToProps, {getAllCategoriesThunkCreator})(HomePageContainer)