import store from './store';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);