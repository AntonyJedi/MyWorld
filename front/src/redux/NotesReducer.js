import {notesAPI} from "../API/api";

const initStore = {
  notesStore: [],
  updatedNote: {},
  isFetching: true
}

const NotesReducer = (state = initStore, action) => {
  switch (action.type) {
    case 'GET-ALL-NOTES':
      return {
        ...state,
        notesStore: action.allNotes,
        isFetching: false
      }
    case 'SET-NEW-NOTE':
      return {
        ...state,
        notesStore: [...state.notesStore, action.newNote]
      }
    case 'DELETE-ONE-NOTE':
      return {
        ...state,
        notesStore: state.notesStore.filter(one => one.id !== action.id)
      }
    case 'CHANGE-ONE-NOTE':
      return {
        ...state,
        notesStore: state.notesStore.map(one => one.id === action.id ? {...one, checked: !one.checked} : one)
      }
    default:
      return state
  }
}

const getNotesActionCreator = allNotes => ({type: 'GET-ALL-NOTES', allNotes})
const setNewNoteActionCreator = newNote => ({type: 'SET-NEW-NOTE', newNote})
const deleteOneNoteActionCreator = id => ({type: 'DELETE-ONE-NOTE', id})
const changedOneNoteActionCreator = id => ({type: 'CHANGE-ONE-NOTE', id})

export const getNotesThunkCreator = userName => async (dispatch) => {
  try {
    const response = await notesAPI.getAllNotes(userName)
    dispatch(getNotesActionCreator(response.data))
  } catch (e) {
    console.log(e)
  }
}

export const newNoteThunkCreator = note => async (dispatch) => {
  try {
    const res = await notesAPI.createNewNote(note)
    await dispatch(setNewNoteActionCreator(res.data))
  } catch (e) {
    console.log(e.response.data)
  }
}

export const updateOneNoteThunkCreator = id => async (dispatch) => {
  try {
    await notesAPI.updateOneNote(id)
    dispatch(changedOneNoteActionCreator(id))
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