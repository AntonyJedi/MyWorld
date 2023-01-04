import {musicAPI} from "../API/api";

const initStore = {
  songsStore: [],
  updatedSong: {},
  chosenSong: {},
  isFetching: true
}

const MusicReducer = (state = initStore, action) => {
  switch (action.type) {
    case 'GET-ALL-SONGS':
      return {
        ...state,
        songsStore: action.allSongs,
        isFetching: false
      }
    case 'SET-NEW-SONG':
      return {
        ...state,
        songsStore: [...state.songsStore, action.newSong]
      }
    case 'DELETE-ONE-SONG':
      return {
        ...state,
        songsStore: state.songsStore.filter(one => one.id !== action.id)
      }
    case 'GET-ONE-SONG':
      return {
        ...state,
        updatedSong: state.songsStore.find(song => song.id === action.id)
      }
    default:
      return state
  }
}

const getSongsActionCreator = allSongs => ({type: 'GET-ALL-SONGS', allSongs})
const setNewSongActionCreator = newSong => ({type: 'SET-NEW-SONG', newSong})
const getOneSongActionCreator = id => ({type: 'GET-ONE-SONG', id})
const deleteOneSongActionCreator = id => ({type: 'DELETE-ONE-SONG', id})

export const getSongsThunkCreator = () => async (dispatch) => {
  try {
    const response = await musicAPI.getAllSongs()
    dispatch(getSongsActionCreator(response.data))
  } catch (e) {
    console.log(e)
  }
}

export const getOneSongThunkCreator = id => (dispatch) => {
  dispatch(getOneSongActionCreator(id))
}

export const newOneMusicThunkCreator = song => async (dispatch) => {
  try {
    const response = await musicAPI.createNewSong(song)
    dispatch(setNewSongActionCreator(response.data))
  } catch (e) {
    console.log(e.response.data)
  }
}

export const updateOneSongThunkCreator = (id, form) => async () => {
  try {
    await musicAPI.updateOneSong(id, form)
  } catch (e) {
    console.log(e)
  }
}

export const deleteOneSongThunkCreator = id => async (dispatch) => {
  try {
    await musicAPI.deleteOneSong(id)
    dispatch(deleteOneSongActionCreator(id))
  } catch (e) {
    console.log(e.response.data)
  }
}




export default MusicReducer;