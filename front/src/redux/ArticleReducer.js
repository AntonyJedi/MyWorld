import {articlesAPI} from "../API/api";

const initStore = {
  articles_store: [],
  updatedArticle: {},
  chosenArticle: {},
  isFetching: true
}

const ArticleReducer = (state = initStore, action) => {
  switch (action.type) {
    case 'GET-ALL-PROJECTS':
      return {
        ...state,
        articles_store: action.articles,
        isFetching: false
      }
    case 'DELETE-ONE-ARTICLE':
      return {
        ...state,
        articles_store: state.articles_store.filter(d => d.id !== action.del)
      }
    case 'GET-ONE-ARTICLE':
      return {
        ...state,
        updatedArticle: action.getOne
      }
    case 'GET-CHOSEN-ARTICLE':
      return {
        ...state,
        chosenArticle: state.articles_store.length > 0 ? state.articles_store.find(ar => ar.id === action.chosenArticleID) : action.data
      }
    case 'IS-FETCHING':
      return {
        ...state,
        isFetching: action.isFetching
      }
    default:
      return state
  }
}

const getArticlesActionCreator = allArticles => ({type: 'GET-ALL-PROJECTS', articles: allArticles})
const delOneArticleCreator = delOne => ({type: 'DELETE-ONE-ARTICLE', del: delOne})
const getOneArticleCreator = getOne => ({type: 'GET-ONE-ARTICLE', getOne: getOne})
const getChosenArticleActionCreator = (id, data) => ({type: 'GET-CHOSEN-ARTICLE', chosenArticleID: id, data: data})

export const getArticlesThunkCreator = () => async (dispatch) => {
  try {
    let response = await articlesAPI.getAllArticles()
    dispatch(getArticlesActionCreator(response.data))
  } catch (e) {
    console.log(e)
  }
}

export const delOneArticleThunkCreator = id => async (dispatch) => {
  await articlesAPI.deleteOneArticle(id)
  dispatch(delOneArticleCreator(id))
}

export const newOneArticleThunkCreator = form => async (dispatch) => {
  try {
    await articlesAPI.createNewArticle(form)
  } catch (e) {
    console.log(e)
  }
}

export const getOneArticleThunkCreator = id => async (dispatch) => {
  const res = await articlesAPI.getOneArticle(id)
  await dispatch(getOneArticleCreator(res.data))
}

export const getChosenArticleThunkCreator = id => async (dispatch) => {
  const res = await articlesAPI.getOneArticle(id)
  dispatch(getChosenArticleActionCreator(id, res.data))
}

export const updateOneArticleThunkCreator = (form, id) => async (dispatch) => {
  try {
    await articlesAPI.updateArticle(form, id)
  } catch (e) {
    console.log(e)
  }
}

export default ArticleReducer;