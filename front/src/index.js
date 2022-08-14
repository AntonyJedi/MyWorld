import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom"
import AppContainer from "./AppContainer";
import {Provider} from "react-redux";
import './scss/global.scss';
import store from './redux/redux_store';
import {AlertState} from "./components/Alert/AlertState";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <AlertState>
          <AppContainer/>
        </AlertState>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);