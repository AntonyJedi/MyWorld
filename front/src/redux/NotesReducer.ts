// @ts-ignore
import {notesAPI} from '../API/api';

type Note = {
  id: number,
  text: string,
  checked: boolean,
  creationDate: string,
  userName: string,
  createdAt: string,
  updatedAt: string
}

type initStoreTypes = {
  notesStore: Array<Note>,
  updatedNote: {},
  isFetching: boolean
}

const initStore: initStoreTypes = {
  notesStore: [],
  updatedNote: {},
  isFetching: true
}

const NotesReducer = (state = initStore, action: any): initStoreTypes => {
  switch (action.type) {
    case 'GET-ALL-NOTES':
      debugger
      return {
        ...state,
        notesStore: action.allNotes,
        isFetching: false
      }
    case 'SET-NEW-NOTE':
      debugger
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
type getNotesActionCreatorType = {
  type: string,
  allNotes: Array<Note>
}
const getNotesActionCreator = (allNotes: Array<Note>): getNotesActionCreatorType => ({type: 'GET-ALL-NOTES', allNotes})
type setNewNoteActionCreatorType = {
  type: string,
  newNote: Note
}
const setNewNoteActionCreator = (newNote: Note): setNewNoteActionCreatorType => ({type: 'SET-NEW-NOTE', newNote})
type deleteOneNoteActionCreatorType = {
  type: string,
  id: number
}
const deleteOneNoteActionCreator = (id: number): deleteOneNoteActionCreatorType => ({type: 'DELETE-ONE-NOTE', id})
type changedOneNoteActionCreatorType = {
  type: string,
  id: number
}
const changedOneNoteActionCreator = (id: number): changedOneNoteActionCreatorType => ({type: 'CHANGE-ONE-NOTE', id})

export const getNotesThunkCreator = (userName: string) => async (dispatch: any) => {
  debugger
  try {
    const response = await notesAPI.getAllNotes(userName)
    dispatch(getNotesActionCreator(response.data))
  } catch (e) {
    console.log(e)
  }
}

export const newNoteThunkCreator = (note: Note) => async (dispatch: any) => {
  try {
    const res = await notesAPI.createNewNote(note)
    await dispatch(setNewNoteActionCreator(res.data))
  } catch (e) {
    console.log(e)
  }
}

export const updateOneNoteThunkCreator = (id: number) => async (dispatch: any) => {
  try {
    await notesAPI.updateOneNote(id)
    dispatch(changedOneNoteActionCreator(id))
  } catch (e) {
    console.log(e)
  }
}

export const deleteOneNoteThunkCreator = (id: number) => async (dispatch: any) => {
  try {
    await notesAPI.deleteOneNote(id)
    dispatch(deleteOneNoteActionCreator(id))
  } catch (e) {
    console.log(e)
  }
}


export default NotesReducer;