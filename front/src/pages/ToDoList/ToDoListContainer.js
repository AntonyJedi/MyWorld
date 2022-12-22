import React from "react";
import {connect} from "react-redux"
import ToDoList from "./ToDoList";
import {deleteOneNoteThunkCreator, getNotesThunkCreator, newNoteThunkCreator} from "../../redux/NotesReducer";

class ToDoListContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.getNotesThunkCreator()
  }

  removeNote = async id => {
    await this.props.deleteOneNoteThunkCreator(id)
  }

  addNote = async note => {
    await this.props.newNoteThunkCreator(note)
  }



  render() {
    return (
      <ToDoList
        allNotes={this.props.notes}
        newNote={this.addNote}
        removeOne={this.removeNote}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    notes: state.NotesStore.notes_store
  }
}

export default connect(mapStateToProps, {getNotesThunkCreator, newNoteThunkCreator, deleteOneNoteThunkCreator})(ToDoListContainer)