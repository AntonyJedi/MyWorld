import React from 'react';
import {connect} from "react-redux";
import {RegistrationThunkCreator} from "../../redux/UserReducer";
import Registration from "./Registration";

class RegistrationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.makeReg = this.makeReg.bind(this)
  }
  makeReg(name, email, pass, about, job, mood, interests) {
    this.props.RegistrationThunkCreator(name, email, pass, about, job, mood, interests)
  }
  render() {
    return (
      <Registration
        doReg={this.makeReg}
        isUserAuth={this.props.isAuth}
        error={this.props.error}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.UserStore.user,
    isAuth: state.UserStore.isAuth,
    error: state.UserStore.error
  }
}

export default connect(mapStateToProps, {RegistrationThunkCreator})(RegistrationContainer);