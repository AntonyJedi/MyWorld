import React from 'react';
import App from "./App";
import {connect} from "react-redux";
import {checkAuth, getUsersThunkCreator, LogoutThunkCreator} from "./redux/UserReducer";
import {getAllCategoriesThunkCreator} from "./redux/ArticleReducer";

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.makeLogout = this.makeLogout.bind(this)
  }
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.checkAuth()
    }
    this.props.getUsersThunkCreator()
    this.props.getAllCategoriesThunkCreator()
  }

  makeLogout(e) {
    e.preventDefault();
    this.props.LogoutThunkCreator()
  }

  render() {
    return (
      <App
        isUserAuth={this.props.isAuth}
        isUserLoading={this.props.isUserLoading}
        isUserAdmin={this.props.isAdmin}
        makeOut={this.makeLogout}
        user={this.props.user}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.UserStore.user,
    isAuth: state.UserStore.isAuth,
    isUserLoading: state.UserStore.isLoading,
    isAdmin: state.UserStore.isAdmin
  }
}

export default connect(mapStateToProps, {checkAuth, getUsersThunkCreator, LogoutThunkCreator, getAllCategoriesThunkCreator})(AppContainer);