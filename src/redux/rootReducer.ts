import {combineReducers} from '@reduxjs/toolkit';
import {authReducer} from './slices/authSlice';
import {homeReducer} from './slices/homeSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
});

export default rootReducer;
