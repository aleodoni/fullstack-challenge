import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import mainReducer from './main.slice';

const rootReducer = combineReducers({
  main: mainReducer,
});

const persistConfig = {
  key: 'refera-Persist',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
