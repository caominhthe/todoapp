import { applyMiddleware, compose, createStore } from 'redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import persistCombineReducers from 'redux-persist/es/persistCombineReducers';
import persistStore from 'redux-persist/es/persistStore';
import rootReducer from './reducer';
import thunk from 'redux-thunk';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['authentication', 'todo'],
};

const persistedReducer = persistCombineReducers(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);
