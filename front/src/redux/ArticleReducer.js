import {articlesAPI} from "../API/api";

const initStore = {
  articlesStore: [],
  updatedArticle: {},
  chosenArticle: {},
  isFetching: true,
  categoriesStore: []
}

const ArticleReducer = (state = initStore, action) => {
  switch (action.type) {
    case 'GET-ARTICLES':
      return {
        ...state,
        articlesStore: action.articles,
        isFetching: false
      }
    case 'DELETE-ONE-ARTICLE':
      return {
        ...state,
        articlesStore: state.articlesStore.filter(d => d.id !== action.idDelOne)
      }
    case 'GET-ONE-ARTICLE':
      return {
        ...state,
        updatedArticle: action.getOne
      }
    case 'GET-CHOSEN-ARTICLE':
      return {
        ...state,
        chosenArticle: state.articlesStore.length > 0 ? state.articlesStore.find(ar => ar.id === action.chosenArticleID) : action.data
      }
    case 'IS-FETCHING':
      return {
        ...state,
        isFetching: action.isFetching
      }
    case 'GET-ALL-CATEGORIES':
      return {
        ...state,
        categoriesStore: action.categories
      }
    default:
      return state
  }
}

const getArticlesActionCreator = allArticles => ({type: 'GET-ARTICLES', articles: allArticles})
const delOneArticleCreator = id => ({type: 'DELETE-ONE-ARTICLE', idDelOne: id})
const getOneArticleCreator = getOne => ({type: 'GET-ONE-ARTICLE', getOne: getOne})
const getChosenArticleActionCreator = (id, data) => ({type: 'GET-CHOSEN-ARTICLE', chosenArticleID: id, data: data})
const getAllCategoriesActionCreator = categories => ({type: 'GET-ALL-CATEGORIES', categories})

export const getArticlesThunkCreator = (category) => async (dispatch) => {
  try {
    const response = category ? await articlesAPI.getAllArticles(category) : await articlesAPI.getAllArticles()
    dispatch(getArticlesActionCreator(response.data))
  } catch (e) {
    console.log(e)
  }
}

export const delOneArticleThunkCreator = id => async (dispatch) => {
  await articlesAPI.deleteOneArticle(id)
  dispatch(delOneArticleCreator(id))
}

export const newOneArticleThunkCreator = form => async () => {
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

export const updateOneArticleThunkCreator = (form, id) => async () => {
  try {
    await articlesAPI.updateArticle(form, id)
  } catch (e) {
    console.log(e)
  }
}

export const getAllCategoriesThunkCreator = () => async (dispatch) => {
  try {
    const res = await articlesAPI.getAllCategory()
    dispatch(getAllCategoriesActionCreator(res.data))
  } catch (e) {
    console.log(e)
  }
}

export default ArticleReducer;