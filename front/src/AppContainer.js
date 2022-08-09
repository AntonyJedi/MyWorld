import React from 'react';
import App from "./App";
import {connect} from "react-redux";
import {checkAuth} from "./redux/UserReducer";

class AppContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.checkAuth()
    }
  }

  render() {
    return (
      <App
        isUserAuth={this.props.isAuth}
        isLoading={this.props.isLoading}
        isUserAdmin={this.props.isAdmin}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.UserStore.user,
    isAuth: state.UserStore.isAuth,
    isLoading: state.UserStore.isLoading,
    isAdmin: state.UserStore.isAdmin
  }
}

export default connect(mapStateToProps, {checkAuth})(AppContainer);