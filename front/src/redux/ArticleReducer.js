import {articlesAPI} from "../API/api";

const initStore = {
  articles_store: [],
  updatedArticle: {},
  loading: false
}

const ArticleReducer = (state = initStore, action) => {
  switch (action.type) {
    case 'GET-ALL-PROJECTS':
      return {
        ...state,
        articles_store: action.articles
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
    default:
      return state
  }
}

const getArticlesActionCreator = allArticles => ({type: 'GET-ALL-PROJECTS', articles: allArticles})
const delOneArticleCreator = delOne => ({type: 'DELETE-ONE-ARTICLE', del: delOne})
const getOneArticleCreator = getOne => ({type: 'GET-ONE-ARTICLE', getOne: getOne})

export const getArticlesThunkCreator = () => async (dispatch) => {
  let response = await articlesAPI.getAllArticles()
  dispatch(getArticlesActionCreator(response.data))
}
export const delOneArticleThunkCreator = id => async (dispatch) => {
  await articlesAPI.deleteOneArticle(id)
  dispatch(delOneArticleCreator(id))
}
export const newOneArticleThunkCreator = async form => {
  await articlesAPI.createNewArticle(form)
}
export const getOneArticleThunkCreator = id => async (dispatch) => {
  const res = await articlesAPI.getOneArticle(id)
  await dispatch(getOneArticleCreator(res.data))
}
export const updateOneArticleThunkCreator = (form, id) => async (dispatch) => {
  await articlesAPI.updateArticle(form, id)
}

export default ArticleReducer;