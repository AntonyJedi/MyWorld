import React from 'react';
import {connect} from "react-redux";
import {LoginThunkCreator} from "../../redux/UserReducer";
import Login from "./Login";

class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.makeLogin = this.makeLogin.bind(this);
  }
  makeLogin(email, pass) {
    this.props.LoginThunkCreator(email, pass)
  }
  render() {
    return (
      <Login doLogin={this.makeLogin} />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.UserStore.user,
    isAuth: state.UserStore.isAuth
  }
}

export default connect(mapStateToProps, {LoginThunkCreator})(LoginContainer);