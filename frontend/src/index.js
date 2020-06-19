import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { createStore } from 'redux'
import mailsReducer from './store/reducers'
const store = createStore(mailsReducer)

ReactDOM.render(
  <Provider store={store}>
    <Router >
      <Route exact path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('root')
)