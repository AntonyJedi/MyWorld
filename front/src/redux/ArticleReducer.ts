// @ts-ignore
import { articlesAPI } from "../API/api";

type Article = {
  id: number,
  title: string,
  text: string,
  creationDate: string,
  tag1: string,
  tag2: string,
  tag3: string,
  img: string,
  categoryId: number,
  userId: number,
  userName: string,
  liked: string[],
  createdAt: string,
  updatedAt: string
}

type Category = {
  id: number,
  title: string,
  createdAt: string,
  updatedAt: string
}

type initStoreType = {
  articlesStore: Article[],
  updatedArticle: {},
  chosenArticle: {},
  isFetching: boolean,
  categoriesStore: Category[]
}

const initStore: initStoreType = {
  articlesStore: [],
  updatedArticle: {},
  chosenArticle: {},
  isFetching: true,
  categoriesStore: []
}

const ArticleReducer = (state = initStore, action: any): initStoreType => {
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
        articlesStore: state.articlesStore.filter(d => d.id !== action.id)
      }
    case 'GET-ONE-ARTICLE':
      return {
        ...state,
        updatedArticle: action.getOne
      }
    case 'SET-ARTICLE-LIKE':
      return {
        ...state,
        articlesStore: state.articlesStore.map(article => article.id === action.likedArticle.id ? action.likedArticle : article)
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
    case 'ADD-ONE-CATEGORY':
      return {
        ...state,
        categoriesStore: [...state.categoriesStore, action.category]
      }
    case 'DELETE-ONE-CATEGORY':
      return {
        ...state,
        categoriesStore: state.categoriesStore.filter(d => d.id !== action.id),
        articlesStore: state.articlesStore.filter(article => article.categoryId !== action.id)
      }
    default:
      return state
  }
}

type TypeIDCreatorType = {
  type: string,
  id: number
}
type getArticlesActionCreatorType = {
  type: string,
  articles: Article[]
}
const getArticlesActionCreator = (allArticles: Article[]): getArticlesActionCreatorType => ({ type: 'GET-ARTICLES', articles: allArticles })
const delOneArticleCreator = (id: number): TypeIDCreatorType => ({ type: 'DELETE-ONE-ARTICLE', id })
type getOneArticleCreatorType = {
  type: string,
  getOne: Article
}
const getOneArticleCreator = (getOne: Article): getOneArticleCreatorType => ({ type: 'GET-ONE-ARTICLE', getOne })
type getChosenArticleActionCreatorType = {
  type: string,
  chosenArticleID: number,
  data: Article
}
const getChosenArticleActionCreator = (id: number, data: Article): getChosenArticleActionCreatorType => ({ type: 'GET-CHOSEN-ARTICLE', chosenArticleID: id, data })
type getAllCategoriesActionCreatorType = {
  type: string,
  categories: Category[]
}
const getAllCategoriesActionCreator = (categories: Category[]): getAllCategoriesActionCreatorType => ({ type: 'GET-ALL-CATEGORIES', categories })
type likeOneArticleActionsCreatorType = {
  type: string,
  likedArticle: Article
}
const likeOneArticleActionsCreator = (likedArticle: Article): likeOneArticleActionsCreatorType => ({ type: 'SET-ARTICLE-LIKE', likedArticle })
type addOneCategoryActionsCreatorType = {
  type: string,
  category: Category
}
const addOneCategoryActionsCreator = (category: Category): addOneCategoryActionsCreatorType => ({ type: 'ADD-ONE-CATEGORY', category })
const delOneCategoryCreator = (id: number): TypeIDCreatorType => ({ type: 'DELETE-ONE-CATEGORY', id })

export const getArticlesThunkCreator = (category: string) => async (dispatch: any) => {
  try {
    const response = category ? await articlesAPI.getAllArticles(category) : await articlesAPI.getAllArticles()
    dispatch(getArticlesActionCreator(response.data))
  } catch (e) {
    console.log(e)
  }
}

export const delOneArticleThunkCreator = (id: number) => async (dispatch: any) => {
  await articlesAPI.deleteOneArticle(id)
  dispatch(delOneArticleCreator(id))
}

export const newOneArticleThunkCreator = (form: any) => async () => {
  try {
    await articlesAPI.createNewArticle(form)
  } catch (e) {
    console.log(e)
  }
}

export const getOneArticleThunkCreator = (id: number) => async (dispatch: any) => {
  const res = await articlesAPI.getOneArticle(id)
  await dispatch(getOneArticleCreator(res.data))
}

export const getChosenArticleThunkCreator = (id: number) => async (dispatch: any) => {
  const res = await articlesAPI.getOneArticle(id)
  dispatch(getChosenArticleActionCreator(id, res.data))
}

export const updateOneArticleThunkCreator = (form: any, id: number) => async () => {
  try {
    await articlesAPI.updateArticle(form, id)
  } catch (e) {
    console.log(e)
  }
}

export const likeOneArticleThunkCreator = (id: number, user: string, add: boolean) => async (dispatch: any) => {
  try {
    const response = await articlesAPI.likeOneArticle(id, user, add)
    dispatch(likeOneArticleActionsCreator(response.data))
  } catch (e) {
    console.log(e)
  }
}

export const getAllCategoriesThunkCreator = () => async (dispatch: any) => {
  try {
    const res = await articlesAPI.getAllCategory()
    dispatch(getAllCategoriesActionCreator(res.data))
  } catch (e) {
    console.log(e)
  }
}

export const newCategoryThunkCreator = (newCategory: string) => async (dispatch: any) => {
  try {
    const res = await articlesAPI.newCategory(newCategory)
    dispatch(addOneCategoryActionsCreator(res.data))
  } catch (e) {
    console.log(e)
  }
}

export const delOneCategoryThunkCreator = (id: number) => async (dispatch: any) => {
  await articlesAPI.deleteOneCategory(id)
  dispatch(delOneCategoryCreator(id))
}

export default ArticleReducer;