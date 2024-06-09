import React from "react";
import {connect} from "react-redux"
import Music from "./Music";
import {deleteOneSongThunkCreator, getSongsThunkCreator} from "../../../redux/MusicReducer";


class MusicContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSongsThunkCreator()
  }


  render() {
    return (
      <Music
        songs={this.props.allSongs}
        isMusicLoading={this.props.isMusicLoading}
        deleteOne={this.props.deleteOneSongThunkCreator}
        isAdminAuth={this.props.isAdmin}
        users={this.props.allUsers}
        isAuth={this.props.isAuth}
        currentUser={this.props.currentUser}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    allSongs: state.MusicStore.songsStore,
    isMusicLoading: state.MusicStore.isFetching,
    isAdmin: state.UserStore.isAdmin,
    allUsers: state.UserStore.allUsers,
    isAuth: state.UserStore.isAuth,
    currentUser: state.UserStore.user
  }
}

export default connect(mapStateToProps, {getSongsThunkCreator, deleteOneSongThunkCreator})(MusicContainer)