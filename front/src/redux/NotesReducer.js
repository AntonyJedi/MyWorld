import {notesAPI} from "../API/api";

const initStore = {
  notes_store: [],
  updatedNote: {},
  isFetching: true
}

const NotesReducer = (state = initStore, action) => {
  switch (action.type) {
    case 'GET-ALL-NOTES':
      return {
        ...state,
        notes_store: action.allNotes,
        isFetching: false
      }
    case 'SET-NEW-NOTE':
      return {
        ...state,
        notes_store: [...state.notes_store, action.newNote]
      }
    case 'DELETE-ONE-NOTE':
      return {
        ...state,
        notes_store: state.notes_store.filter(one => one.id !== action.id)
      }
    default:
      return state
  }
}

const getNotesActionCreator = allNotes => ({type: 'GET-ALL-NOTES', allNotes})
const setNewNoteActionCreator = newNote => ({type: 'SET-NEW-NOTE', newNote})
const deleteOneNoteActionCreator = id => ({type: 'DELETE-ONE-NOTE', id})

export const getNotesThunkCreator = () => async (dispatch) => {
  try {
    let response = await notesAPI.getAllNotes()
    dispatch(getNotesActionCreator(response.data))
  } catch (e) {
    console.log(e)
  }
}

export const newNoteThunkCreator = note => async (dispatch) => {
  try {
    await notesAPI.createNewNote(note)
    dispatch(setNewNoteActionCreator(note))
  } catch (e) {
    console.log(e.response.data)
  }
}

export const updateOneSongThunkCreator = (id, note) => async () => {
  try {
    await notesAPI.updateOneNote(id, note)
  } catch (e) {
    console.log(e)
  }
}

export const deleteOneNoteThunkCreator = id => async (dispatch) => {
  try {
    await notesAPI.deleteOneNote(id)
    dispatch(deleteOneNoteActionCreator(id))
  } catch (e) {
    console.log(e.response.data)
  }
}


export default NotesReducer;