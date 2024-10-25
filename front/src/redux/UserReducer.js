import { authAPI, baseApiURL, usersAPI, postsAPI } from "../API/api";
import axios from "axios";

const initStore = {
  user: {},
  posts: [],
  isAdmin: false,
  isAuth: false,
  isLoading: false,
  allUsers: [],
  allUsersInfo: [],
  error: {},
}

const UserReducer = (state = initStore, action) => {
  switch (action.type) {
    case 'SET-USER':
      return {
        ...state,
        user: action.user,
        isAdmin: action.user.role === 'admin'
      }
    case 'EDIT-USER':
      debugger
      return {
        ...state,
        user: action.updatedUser
      }
    case 'SET-AUTH':
      return {
        ...state,
        isAuth: action.isAuth
      }
    case 'SET-LOADING':
      return {
        ...state,
        isLoading: action.isLoading
      }
    case 'ALL-USERS':
      return {
        ...state,
        allUsers: action.allUsers.map(name => name.nickName),
        allUsersInfo: action.allUsers
      }
    case 'GET-ALL-USER-POSTS':
      return {
        ...state,
        posts: action.allUserPosts
      }
    case 'CREATE-POST':
      return {
        ...state,
        posts: [action.post, ...state.posts]
      }
    case 'DELETE-POST':
      return {
        ...state,
        posts: state.posts.filter(item => item.id !== action.id)
      }
    case 'SET-ERROR':
      return {
        ...state,
        error: action.resError
      }
    default:
      return state
  }
}


const setUserActionCreator = userInfo => ({ type: 'SET-USER', user: userInfo })
const setUpdatedUserActionCreator = updatedUser => ({ type: 'EDIT-USER', updatedUser })
const setAuthActionCreator = setAuth => ({ type: 'SET-AUTH', isAuth: setAuth })
const setLoadingCreator = setLoading => ({ type: 'SET-LOADING', isLoading: setLoading })
const getAllUsers = allUsers => ({ type: 'ALL-USERS', allUsers })
const getAllPostsThunkCreator = allUserPosts => ({ type: 'GET-ALL-USER-POSTS', allUserPosts })
const createPostActionCreator = post => ({ type: 'CREATE-POST', post })
const deletePostActionCreator = id => ({ type: 'DELETE-POST', id })
const setError = resError => ({ type: 'SET-ERROR', resError })

export const RegistrationThunkCreator = (name, email, pass, about, job, mood, interests) => async (dispatch) => {
  try {
    const responseFromReg = await authAPI.registration(name, email, pass, about, job, mood, interests)
    if (responseFromReg) {
      localStorage.setItem('token', responseFromReg.data.token)
      dispatch(setUserActionCreator(responseFromReg.data.user))
      dispatch(setAuthActionCreator(true))
    }
    const allUsers = await usersAPI.getUsers()
    dispatch(getAllUsers(allUsers.data))
  } catch (e) {
    dispatch(setError(e.response.data))
    console.log(e.response.data)
  }
}
export const LoginThunkCreator = (email, pass) => async (dispatch) => {
  try {
    dispatch(setLoadingCreator(true))
    const responseFromLog = await authAPI.login(email, pass)
    if (responseFromLog) {
      localStorage.setItem('token', responseFromLog.data.token)
      dispatch(setUserActionCreator(responseFromLog.data.user))
      dispatch(setAuthActionCreator(true))
    }
    const allUsers = await usersAPI.getUsers()
    dispatch(getAllUsers(allUsers.data))
    const allUserPosts = await postsAPI.getAllPosts(response.data.user.id);
    dispatch(getAllPostsThunkCreator(allUserPosts.data))
  } catch (e) {
    console.log(e)
  } finally {
    dispatch(setLoadingCreator(false))
  }
}

export const LogoutThunkCreator = () => async (dispatch) => {
  try {
    await authAPI.logout()
    localStorage.removeItem('token')
    dispatch(setUserActionCreator({}))
    dispatch(setAuthActionCreator(false))
  } catch (e) {
    console.log(e)
  }
}

export const checkAuth = () => async (dispatch) => {
  try {
    dispatch(setLoadingCreator(true))
    const response = await axios.get(`${baseApiURL}auth/refresh`, { withCredentials: true })
    dispatch(setUserActionCreator(response.data.user))
    dispatch(setAuthActionCreator(true))
    const allUsers = await usersAPI.getUsers()
    dispatch(getAllUsers(allUsers.data))
    const allUserPosts = await postsAPI.getAllPosts();
    dispatch(getAllPostsThunkCreator(allUserPosts.data))
  } catch (e) {
    console.log(e)
  } finally {
    dispatch(setLoadingCreator(false))
  }
}

export const updateUserThunkCreator = (updatedUser) => async (dispatch) => {
  debugger
  try {
    dispatch(setLoadingCreator(true))
    await usersAPI.updateUser(updatedUser)
    dispatch(setUpdatedUserActionCreator(updatedUser))
  } catch (e) {
    console.log(e)
  } finally {
    dispatch(setLoadingCreator(false))
  }
}

export const getUsersThunkCreator = () => async (dispatch) => {
  try {
    dispatch(setLoadingCreator(true))
    const allUsers = await usersAPI.getUsers()
    dispatch(getAllUsers(allUsers.data))
  } catch (e) {
    console.log(e)
  } finally {
    dispatch(setLoadingCreator(false))
  }
}

export const createPostThunkCreator = post => async (dispatch) => {
  try {
    const createdPost = await postsAPI.createPost(post)
    dispatch(createPostActionCreator(createdPost.data))
  } catch (e) {
    console.log(e)
  }
}

export const deletePostThunkCreator = id => async (dispatch) => {
  try {
    await postsAPI.deletePost(id)
    dispatch(deletePostActionCreator(id))
  } catch (e) {
    console.log(e)
  }
}

export default UserReducer
