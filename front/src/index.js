import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from "./AppContainer";
import {Provider} from "react-redux";
import './scss/global.scss';
import store from './redux/redux_store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);