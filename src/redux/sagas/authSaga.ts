import {call, put, takeLatest} from 'redux-saga/effects';
import {authAction} from '../slices/authSlice';
import {clearToken, getToken, setToken} from '../../data/local/localData';
import {LoginApi, LoginRequest, LoginResponse} from '../../data/apis/loginApi';
import {PayloadAction} from '@reduxjs/toolkit';
import AppError from '../../common/appError';

function* Login(action: PayloadAction<LoginRequest>) {
  try {
    const response: LoginResponse = yield call(LoginApi, action.payload);
    yield call(setToken, response);
    yield put(authAction.loginApiSuccess(response));
  } catch (error) {
    yield put(authAction.loginApiError(error as AppError));
  }
}

function* GetAuth() {
  try {
    const token: LoginResponse = yield call(getToken);
    yield put(authAction.checkLoginSuccess(token));
  } catch (e) {
    yield put(authAction.checkLoginError(e as AppError));
  }
}

function* ClearAuth() {
  yield call(clearToken);
}

export default function* authSaga() {
  yield takeLatest(authAction.loginApi.type, Login);
  yield takeLatest(authAction.checkLogin.type, GetAuth);
  yield takeLatest(authAction.logout.type, ClearAuth);
}
