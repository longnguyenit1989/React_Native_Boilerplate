import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {
  authAction,
  loadingSelector,
  tokenSelector,
} from '../redux/slices/authSlice';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigationStack from './mainNavigationStack';
import AuthNavigationStack from './authNavigationStack';
import Loading from '../components/loading';

const RootNavigationStack = () => {
  const isLoading = useAppSelector(loadingSelector);
  const isLogin = useAppSelector(tokenSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authAction.checkLogin());
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <NavigationContainer>
      {isLogin && <MainNavigationStack />}
      {!isLogin && <AuthNavigationStack />}
    </NavigationContainer>
  );
};

export default RootNavigationStack;
