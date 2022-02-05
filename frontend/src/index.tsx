import React from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);