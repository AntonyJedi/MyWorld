import React from "react";
import {connect} from "react-redux"
import Navbar from "./Navbar";
import {getQuotesThunkCreator} from "../../redux/QuotesReducer";


class NavbarContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getQuotesThunkCreator();
  }
  render() {
    return (
      <Navbar quotes={this.props.quotes}/>
    )
  }
}

const mapStateToProps = state => {
  return {
    quotes: state.QuotesStore.quotes_store
  }
}

export default connect(mapStateToProps, {getQuotesThunkCreator})(NavbarContainer)