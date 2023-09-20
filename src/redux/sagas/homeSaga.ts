import {all, call, put, takeLatest} from 'redux-saga/effects';
import {homeAction} from '../slices/homeSlice';
import {ListApi, ListRequest} from '../../data/apis/listApi';
import {PayloadAction} from '@reduxjs/toolkit';
import {UserApi} from '../../data/apis/userApi';
import AppError from '../../common/appError';

// @ts-ignore
function* Init(action: PayloadAction<ListRequest>) {
  try {
    const [listResponse, userResponse] = yield all([
      call(ListApi, action.payload),
      call(UserApi),
    ]);
    yield put(homeAction.listApiSuccess(listResponse));
    yield put(homeAction.userApiSuccess(userResponse));
    yield put(homeAction.initDone());
  } catch (error) {
    yield put(homeAction.initError(error as AppError));
  }
}

export default function* homeSaga() {
  yield takeLatest(homeAction.init.type, Init);
}
