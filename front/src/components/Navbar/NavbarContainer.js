import React from "react";
import {connect} from "react-redux"
import Navbar from "./Navbar";
import {getQuotesThunkCreator} from "../../redux/QuotesReducer";
import {LogoutThunkCreator} from "../../redux/UserReducer";


class NavbarContainer extends React.Component {
  constructor(props) {
    super(props);
    this.makeLogout = this.makeLogout.bind(this)
  }
  componentDidMount() {
    this.props.getQuotesThunkCreator();
  }
  makeLogout(e) {
    e.preventDefault();
    this.props.LogoutThunkCreator()
  }
  render() {
    return (
      <Navbar
        quotes={this.props.quotes}
        isUserAuth={this.props.isAuth}
        makeOut={this.makeLogout}
        isUserAdmin={this.props.isAdmin}
        user={this.props.currentUser}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    quotes: state.QuotesStore.quotes_store,
    isAuth: state.UserStore.isAuth,
    isAdmin: state.UserStore.isAdmin,
    currentUser: state.UserStore.user
  }
}

export default connect(mapStateToProps, {getQuotesThunkCreator, LogoutThunkCreator})(NavbarContainer)