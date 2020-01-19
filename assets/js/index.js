import store from './store/store';
import { Provider } from 'react-redux';
import ReactDom from 'react-dom';
import React from 'react';
import App from './App';

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);