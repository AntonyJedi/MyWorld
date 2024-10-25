import React from "react";
import {connect} from "react-redux"
import HomePage from "./HomePage";
import {getAllCategoriesThunkCreator} from "../../redux/ArticleReducer";
import {updateUserThunkCreator, createPostThunkCreator, deletePostThunkCreator} from "../../redux/UserReducer";

class HomePageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllCategoriesThunkCreator()
  }

  updateUser = user => {
    this.props.updateUserThunkCreator(user)
  }

  createPost = post => {
    this.props.createPostThunkCreator(post)
  }

  deletePost = id => {
    this.props.deletePostThunkCreator(id)
  }

  render() {
    return (
      <HomePage
        categories={this.props.allCategories}
        user={this.props.user}
        isAdmin={this.props.isAdmin}
        isAuth={this.props.isAuth}
        changeUser={this.updateUser}
        posts={this.props.allPosts}
        createPost={this.createPost}
        deletePost={this.deletePost}
        allUsers={this.props.allUsers}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    allCategories: state.ArticlesStore.categoriesStore,
    user: state.UserStore.user,
    isAdmin: state.UserStore.isAdmin,
    isAuth: state.UserStore.isAuth,
    allPosts: state.UserStore.posts,
    allUsers: state.UserStore.allUsersInfo
  }
}

export default connect(mapStateToProps, {
  getAllCategoriesThunkCreator, 
  updateUserThunkCreator, 
  createPostThunkCreator, 
  deletePostThunkCreator
})(HomePageContainer)