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
        isLoading={this.props.isLoading}
        deleteOne={this.props.deleteOneSongThunkCreator}
        isAdminAuth={this.props.isAdmin}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    allSongs: state.MusicStore.songs_store,
    isLoading: state.MusicStore.isFetching,
    isAdmin: state.UserStore.isAdmin
  }
}

export default connect(mapStateToProps, {getSongsThunkCreator, deleteOneSongThunkCreator})(MusicContainer)