"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.delOneCategoryThunkCreator = exports.newCategoryThunkCreator = exports.getAllCategoriesThunkCreator = exports.likeOneArticleThunkCreator = exports.updateOneArticleThunkCreator = exports.getChosenArticleThunkCreator = exports.getOneArticleThunkCreator = exports.newOneArticleThunkCreator = exports.delOneArticleThunkCreator = exports.getArticlesThunkCreator = void 0;
// @ts-ignore
const api_1 = require("../API/api");
const initStore = {
    articlesStore: [],
    updatedArticle: {},
    chosenArticle: {},
    isFetching: true,
    categoriesStore: []
};
const ArticleReducer = (state = initStore, action) => {
    switch (action.type) {
        case 'GET-ARTICLES':
            return Object.assign(Object.assign({}, state), { articlesStore: action.articles, isFetching: false });
        case 'DELETE-ONE-ARTICLE':
            return Object.assign(Object.assign({}, state), { articlesStore: state.articlesStore.filter(d => d.id !== action.id) });
        case 'GET-ONE-ARTICLE':
            return Object.assign(Object.assign({}, state), { updatedArticle: action.getOne });
        case 'SET-ARTICLE-LIKE':
            return Object.assign(Object.assign({}, state), { articlesStore: state.articlesStore.map(article => article.id === action.likedArticle.id ? action.likedArticle : article) });
        case 'GET-CHOSEN-ARTICLE':
            return Object.assign(Object.assign({}, state), { chosenArticle: state.articlesStore.length > 0 ? state.articlesStore.find(ar => ar.id === action.chosenArticleID) : action.data });
        case 'IS-FETCHING':
            return Object.assign(Object.assign({}, state), { isFetching: action.isFetching });
        case 'GET-ALL-CATEGORIES':
            return Object.assign(Object.assign({}, state), { categoriesStore: action.categories });
        case 'ADD-ONE-CATEGORY':
            return Object.assign(Object.assign({}, state), { categoriesStore: [...state.categoriesStore, action.category] });
        case 'DELETE-ONE-CATEGORY':
            return Object.assign(Object.assign({}, state), { categoriesStore: state.categoriesStore.filter(d => d.id !== action.id), articlesStore: state.articlesStore.filter(article => article.categoryId !== action.id) });
        default:
            return state;
    }
};
const getArticlesActionCreator = (allArticles) => ({ type: 'GET-ARTICLES', articles: allArticles });
const delOneArticleCreator = (id) => ({ type: 'DELETE-ONE-ARTICLE', id });
const getOneArticleCreator = (getOne) => ({ type: 'GET-ONE-ARTICLE', getOne });
const getChosenArticleActionCreator = (id, data) => ({ type: 'GET-CHOSEN-ARTICLE', chosenArticleID: id, data });
const getAllCategoriesActionCreator = (categories) => ({ type: 'GET-ALL-CATEGORIES', categories });
const likeOneArticleActionsCreator = (likedArticle) => ({ type: 'SET-ARTICLE-LIKE', likedArticle });
const addOneCategoryActionsCreator = (category) => ({ type: 'ADD-ONE-CATEGORY', category });
const delOneCategoryCreator = (id) => ({ type: 'DELETE-ONE-CATEGORY', id });
const getArticlesThunkCreator = (category) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = category ? yield api_1.articlesAPI.getAllArticles(category) : yield api_1.articlesAPI.getAllArticles();
        dispatch(getArticlesActionCreator(response.data));
    }
    catch (e) {
        console.log(e);
    }
});
exports.getArticlesThunkCreator = getArticlesThunkCreator;
const delOneArticleThunkCreator = (id) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    yield api_1.articlesAPI.deleteOneArticle(id);
    dispatch(delOneArticleCreator(id));
});
exports.delOneArticleThunkCreator = delOneArticleThunkCreator;
const newOneArticleThunkCreator = (form) => () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield api_1.articlesAPI.createNewArticle(form);
    }
    catch (e) {
        console.log(e);
    }
});
exports.newOneArticleThunkCreator = newOneArticleThunkCreator;
const getOneArticleThunkCreator = (id) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield api_1.articlesAPI.getOneArticle(id);
    yield dispatch(getOneArticleCreator(res.data));
});
exports.getOneArticleThunkCreator = getOneArticleThunkCreator;
const getChosenArticleThunkCreator = (id) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield api_1.articlesAPI.getOneArticle(id);
    dispatch(getChosenArticleActionCreator(id, res.data));
});
exports.getChosenArticleThunkCreator = getChosenArticleThunkCreator;
const updateOneArticleThunkCreator = (form, id) => () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield api_1.articlesAPI.updateArticle(form, id);
    }
    catch (e) {
        console.log(e);
    }
});
exports.updateOneArticleThunkCreator = updateOneArticleThunkCreator;
const likeOneArticleThunkCreator = (id, user, add) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield api_1.articlesAPI.likeOneArticle(id, user, add);
        dispatch(likeOneArticleActionsCreator(response.data));
    }
    catch (e) {
        console.log(e);
    }
});
exports.likeOneArticleThunkCreator = likeOneArticleThunkCreator;
const getAllCategoriesThunkCreator = () => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield api_1.articlesAPI.getAllCategory();
        dispatch(getAllCategoriesActionCreator(res.data));
    }
    catch (e) {
        console.log(e);
    }
});
exports.getAllCategoriesThunkCreator = getAllCategoriesThunkCreator;
const newCategoryThunkCreator = (newCategory) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield api_1.articlesAPI.newCategory(newCategory);
        dispatch(addOneCategoryActionsCreator(res.data));
    }
    catch (e) {
        console.log(e);
    }
});
exports.newCategoryThunkCreator = newCategoryThunkCreator;
const delOneCategoryThunkCreator = (id) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    yield api_1.articlesAPI.deleteOneCategory(id);
    dispatch(delOneCategoryCreator(id));
});
exports.delOneCategoryThunkCreator = delOneCategoryThunkCreator;
exports.default = ArticleReducer;
