import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

// npm install react-router react-redux redux redux-saga @material-ui/core @material-ui/icons @material-ui/styles @material-ui/lab

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4DAE65',
    },
    secondary: {
      main: '#40add8',
    },
  },
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(','),
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);
