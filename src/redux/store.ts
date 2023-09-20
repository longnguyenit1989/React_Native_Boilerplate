import {configureStore, Middleware, Store} from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './rootSaga';
import {Constants} from '../constants/configs';

const sagaMiddleware = createSagaMiddleware();
const middlewares: Middleware[] = [sagaMiddleware];

if (Constants.DEBUG && Constants.LOG_STATE) {
  const logger: Middleware = store => next => action => {
    console.group(action.type);
    console.log(
      '[Dispatching]:',
      action.type,
      'Payload:',
      JSON.stringify(action.payload, null, '\t'),
    );
    console.log(
      '[Current State]:',
      JSON.stringify((store as Store).getState(), null, '\t'),
    );
    let result = next(action);
    console.log(
      '[New State]:',
      JSON.stringify((store as Store).getState(), null, '\t'),
    );
    console.groupEnd();
    return result;
  };
  middlewares.push(logger);
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(middlewares),
  devTools: Constants.DEBUG,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
