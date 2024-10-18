import { musicAPI } from "../API/api";

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
        songsStore: [action.newSong, ...state.songsStore]
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
    case 'SET-SONG-LIKE':
      return {
        ...state,
        songsStore: state.songsStore.map(song => song.id === action.likedSong.id ? action.likedSong : song)
      }
    case 'SET-IS-LOADING':
      return {
        ...state,
        isFetching: action.value
      }
    default:
      return state
  }
}

const getSongsActionCreator = allSongs => ({ type: 'GET-ALL-SONGS', allSongs })
const setNewSongActionCreator = newSong => ({ type: 'SET-NEW-SONG', newSong })
const getOneSongActionCreator = id => ({ type: 'GET-ONE-SONG', id })
const deleteOneSongActionCreator = id => ({ type: 'DELETE-ONE-SONG', id })
const setLoadingStatus = value => ({ type: 'SET-IS-LOADING', value })
const likeOneSongActionsCreator = likedSong => ({ type: 'SET-SONG-LIKE', likedSong })

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

export const likeOneSongThungCreator = (id, user, add) => async (dispatch) => {
  try {
    const response = await musicAPI.likeOneSong(id, user, add)
    dispatch(likeOneSongActionsCreator(response.data))
  } catch (e) {
    console.log(e)
  }
}

export const deleteOneSongThunkCreator = id => async (dispatch) => {
  try {
    dispatch(setLoadingStatus(true))
    await musicAPI.deleteOneSong(id)
    dispatch(deleteOneSongActionCreator(id))
    dispatch(setLoadingStatus(false))
  } catch (e) {
    console.log(e.response.data)
  }
}




export default MusicReducer;