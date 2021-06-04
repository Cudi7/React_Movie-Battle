import { combineReducers } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import uiReducer from './ui';
import entitiesReducer from './entities';
import apiMiddleware from './middleware/apiMiddleware';

//with redux toolkit (it includes devtools and redux-thunk)

const reducer = combineReducers({
  entities: entitiesReducer,
  ui: uiReducer,
});

export default function () {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), apiMiddleware],
  });
}
