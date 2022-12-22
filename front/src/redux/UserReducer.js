import {authAPI, baseApiURL, usersAPI} from "../API/api";
import axios from "axios";

const initStore = {
  user: {},
  isAdmin: false,
  isAuth: false,
  isLoading: false,
  allUsers: []
}

const UserReducer = (state = initStore, action) => {
  switch (action.type) {
    case 'SET-USER':
      return {
        ...state,
        user: action.user,
        isAdmin: action.user.role === 'admin'
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
        allUsers: action.allUsers.map(name => name.nickName)
      }
    default:
      return state
  }
}


const setUserActionCreator = userInfo => ({type: 'SET-USER', user: userInfo})
const setAuthActionCreator = setAuth => ({type: 'SET-AUTH', isAuth: setAuth})
const setLoadingCreator = setLoading => ({type: 'SET-LOADING', isLoading: setLoading})
const getAllUsers = allUsers => ({type: 'ALL-USERS', allUsers})

export const RegistrationThunkCreator = (name, email, pass) => async (dispatch) => {
  try {
    let responseFromReg = await authAPI.registration(name, email, pass)
    if (responseFromReg) {
      localStorage.setItem('token', responseFromReg.data.token)
      dispatch(setUserActionCreator(responseFromReg.data.user))
      dispatch(setAuthActionCreator(true))
    }
    let allUsers = await usersAPI.getUsers()
    dispatch(getAllUsers(allUsers.data))
  } catch (e) {
    console.log(e.data)
  }
}
export const LoginThunkCreator = (email, pass) => async (dispatch) => {
  try {
    dispatch(setLoadingCreator(true))
    let responseFromLog = await authAPI.login(email, pass)
    if (responseFromLog) {
      localStorage.setItem('token', responseFromLog.data.token)
      dispatch(setUserActionCreator(responseFromLog.data.user))
      dispatch(setAuthActionCreator(true))
    }
    let allUsers = await usersAPI.getUsers()
    dispatch(getAllUsers(allUsers.data))
  } catch (e) {
    console.log(e)
  } finally {
    dispatch(setLoadingCreator(false))
  }
}

export const LogoutThunkCreator = () => async (dispatch) => {
  try {
    let responseFromLog = await authAPI.logout()
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
    const response = await axios.get(`${baseApiURL}auth/refresh`, {withCredentials: true})
    dispatch(setUserActionCreator(response.data.user))
    dispatch(setAuthActionCreator(true))
    let allUsers = await usersAPI.getUsers()
    dispatch(getAllUsers(allUsers.data))
  } catch (e) {
    console.log(e)
  } finally {
    dispatch(setLoadingCreator(false))
  }
}

export const getUsersThunkCreator = () => async (dispatch) => {
  try {
    dispatch(setLoadingCreator(true))
    let allUsers = await usersAPI.getUsers()
    dispatch(getAllUsers(allUsers.data))
  } catch (e) {
    console.log(e)
  } finally {
    dispatch(setLoadingCreator(false))
  }
}

export default UserReducer
