import createSagaMiddleware from '@redux-saga/core';
import {persistStore} from 'redux-persist';
import { configureStore} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootSaga from './saga/saga';
import rootReducer from './reducers/root-reducer';

const sagaMiddleware = createSagaMiddleware();

// Define a function to return the middleware array
const middleware = () => {
    return [sagaMiddleware, logger];
  };
  
  export const store = configureStore({
    reducer: rootReducer,
    middleware, // Pass the middleware function
  });

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default {store,persistor};