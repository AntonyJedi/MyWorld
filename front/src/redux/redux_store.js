import {applyMiddleware, combineReducers, createStore} from "redux";
import ArticleReducer from "./ArticleReducer";
import MusicReducer from "./MusicReducer";
import QuotesReducer from "./QuotesReducer";
import UserReducer from "./UserReducer";
import NotesReducer from "./NotesReducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
  ArticlesStore: ArticleReducer,
  MusicStore: MusicReducer,
  QuotesStore: QuotesReducer,
  UserStore: UserReducer,
  NotesStore: NotesReducer
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;