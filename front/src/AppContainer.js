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
      <App isUserAuth={this.props.isAuth} isLoading={this.props.isLoading} />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.UserStore.user,
    isAuth: state.UserStore.isAuth,
    isLoading: state.UserStore.isLoading
  }
}

export default connect(mapStateToProps, {checkAuth})(AppContainer);