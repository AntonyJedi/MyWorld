import {authAPI, baseApiURL} from "../API/api";
import axios from "axios";

const initStore = {
  user: {},
  isAuth: false,
  isLoading: true
}

const UserReducer = (state = initStore, action) => {
  switch (action.type) {
    case 'SET-USER':
      return {
        ...state,
        user: action.user
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
    default:
      return state
  }
}


const setUserActionCreator = userInfo => ({type: 'SET-USER', user: userInfo})
const setAuthArticleCreator = setAuth => ({type: 'SET-AUTH', isAuth: setAuth})
const setLoadingCreator = setLoading => ({type: 'SET-LOADING', isLoading: setLoading})

export const RegistrationThunkCreator = (name, email, pass) => async (dispatch) => {
  try {
    let responseFromReg = await authAPI.registration(name, email, pass)
    console.log(responseFromReg)
    localStorage.setItem('token', responseFromReg.data.accessToken)
    dispatch(setUserActionCreator(responseFromReg.data))
    dispatch(setAuthArticleCreator(true))
  } catch (e) {
    console.log(e)
  }
}
export const LoginThunkCreator = (email, pass) => async (dispatch) => {
  try {
    let responseFromLog = await authAPI.login(email, pass)
    console.log(responseFromLog)
    localStorage.setItem('token', responseFromLog.data.token)
    dispatch(setUserActionCreator(responseFromLog.data))
    dispatch(setAuthArticleCreator(true))
  } catch (e) {
    console.log(e)
  }
}

export const LogoutThunkCreator = () => async (dispatch) => {
  try {
    let responseFromLog = await authAPI.logout()
    localStorage.removeItem('token')
    dispatch(setUserActionCreator({}))
    dispatch(setAuthArticleCreator(false))
  } catch (e) {
    console.log(e)
  }
}

export const checkAuth = () => async (dispatch) => {
  dispatch(setLoadingCreator(true))
  try {
    const response = await axios.get(`${baseApiURL}auth/refresh`, {withCredentials: true})
    dispatch(setUserActionCreator(response.data))
    dispatch(setAuthArticleCreator(true))
  } catch (e) {
    console.log(e)
  } finally {
    dispatch(setLoadingCreator(false))
  }
}

export default UserReducer
