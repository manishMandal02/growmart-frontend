import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import axios from 'axios';

import App from './App';
import './index.scss';
import store from './Store/Store';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// npm install react-router react-redux redux redux-saga @material-ui/core @material-ui/icons @material-ui/styles @material-ui/lab

axios.defaults.baseURL = 'https://growmart.herokuapp.com/';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4DAE65',
    },
    secondary: {
      main: '#40add8',
    },
    redPink: {
      main: '#cf4826  ',
    },
  },
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(','),
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
