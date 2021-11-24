import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store from './store';
import App from './App';
import theme from './theme';

const persistor = persistStore(store);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
  </ThemeProvider>,
  document.getElementById('root')
);
