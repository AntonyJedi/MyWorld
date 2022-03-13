import {applyMiddleware, combineReducers, createStore} from "redux";
import ArticleReducer from "./ArticleReducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
  ArticlesStore: ArticleReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;