import {all} from 'redux-saga/effects';
import authSaga from './sagas/authSaga';
import homeSaga from './sagas/homeSaga';

export default function* rootSaga() {
  yield all([authSaga(), homeSaga()]);
}
