import React from "react";
import {connect} from "react-redux"
import ToDoList from "./ToDoList";
import {
  deleteOneNoteThunkCreator,
  getNotesThunkCreator,
  newNoteThunkCreator,
  updateOneNoteThunkCreator
} from "../../redux/NotesReducer";

class ToDoListContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getNotesThunkCreator(this.props.currentUser.nickName)
  }

  removeNote = async id => {
    await this.props.deleteOneNoteThunkCreator(id)
  }

  addNote = async note => {
    await this.props.newNoteThunkCreator(note)
  }

  changeStatus = async id => [
    await this.props.updateOneNoteThunkCreator(id)
  ]

  render() {
    return (
      <ToDoList
        allNotes={this.props.notes}
        newNote={this.addNote}
        removeOne={this.removeNote}
        change={this.changeStatus}
        currentUser={this.props.currentUser}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    notes: state.NotesStore.notesStore,
    currentUser: state.UserStore.user
  }
}

export default connect(mapStateToProps, {
  getNotesThunkCreator,
  newNoteThunkCreator,
  deleteOneNoteThunkCreator,
  updateOneNoteThunkCreator
})(ToDoListContainer)