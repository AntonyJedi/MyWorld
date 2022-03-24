import {applyMiddleware, combineReducers, createStore} from "redux";
import ArticleReducer from "./ArticleReducer";
import QuotesReducer from "./QuotesReducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
  ArticlesStore: ArticleReducer,
  QuotesStore: QuotesReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;