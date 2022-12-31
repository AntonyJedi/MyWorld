import React from "react";
import {connect} from "react-redux"
import CreateMusic from "./CreateMusic";
import {newOneMusicThunkCreator} from "../../../redux/MusicReducer";


class CreateMusicContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  newSong = async (newOne) => {
    await this.props.newOneMusicThunkCreator(newOne)
  }


  render() {
    return (
      <CreateMusic
        newSong={this.newSong}
        addNew={this.props.setIsAddNew}
        user={this.props.currentUser}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.UserStore.user
  }
}

export default connect(mapStateToProps, {newOneMusicThunkCreator})(CreateMusicContainer)