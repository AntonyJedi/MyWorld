import React from 'react';
import {connect} from "react-redux";
import {RegistrationThunkCreator} from "../../redux/UserReducer";
import Registration from "./Registration";

class RegistrationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.makeReg = this.makeReg.bind(this)
  }
  makeReg(name, email, pass) {
    this.props.RegistrationThunkCreator(name, email, pass)
  }
  render() {
    return (
      <Registration doReg={this.makeReg} isUserAuth={this.props.isAuth} />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.UserStore.user,
    isAuth: state.UserStore.isAuth
  }
}

export default connect(mapStateToProps, {RegistrationThunkCreator})(RegistrationContainer);