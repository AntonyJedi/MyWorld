import React from "react";
import {connect} from "react-redux"
import UpdateMusic from "./UpdateMusic";
import withRouter from "../../../helpers/ParamHock";
import {getOneSongThunkCreator, updateOneSongThunkCreator} from "../../../redux/MusicReducer";


class UpdateMusicContainer extends React.Component {
  constructor(props) {
    super(props);
    this.updateOneSong = this.updateOneSong.bind(this)
  }

  componentDidMount() {
    const id = Number.parseInt(this.props.param);
    this.props.getOneSongThunkCreator(id)
  }

  updateOneSong(id, form) {
    this.props.updateOneSongThunkCreator(id, form)
  }

  render() {
    return (
      <UpdateMusic
        id={this.props.param}
        song={this.props.updatedSong}
        updateSong={this.updateOneSong}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    updatedSong: state.MusicStore.updatedSong
  }
}

let withRouterUpdateContainer = withRouter(UpdateMusicContainer)

export default connect(mapStateToProps, {getOneSongThunkCreator, updateOneSongThunkCreator})(withRouterUpdateContainer)