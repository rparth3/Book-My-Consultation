
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { StylesProvider } from '@material-ui/core/styles';
import store from './common/store/consultation';
import reportWebVitals from './reportWebVitals';
import Controller from './screens/Controller';

ReactDOM.render(<StylesProvider injectFirst>
  <Provider store={store}>
    {' '}
    <Controller />
  </Provider>
</StylesProvider>, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
