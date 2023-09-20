import AsyncStorage from '@react-native-async-storage/async-storage';
import AppError from '../../common/appError';

export const StorageConstants = Object.freeze({
  TOKEN: 'token',
});

export const getStringData = async (key: string): Promise<string> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return Promise.resolve(value);
    }
    const result: AppError = {errorMessage: 'error', errorData: null};
    return Promise.reject(result);
  } catch (e) {
    const result: AppError = {
      errorData: e,
      errorMessage: null,
    };
    return Promise.reject(result);
  }
};

export const storeStringData = async (
  key: string,
  value: string,
): Promise<void> => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (e) {
    const result: AppError = {
      errorData: e,
      errorMessage: null,
    };
    return Promise.reject(result);
  }
};

export const clearStringData = async (key: string): Promise<void> => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (e) {
    const result: AppError = {
      errorData: e,
      errorMessage: null,
    };
    return Promise.reject(result);
  }
};

export const getObjectData = async (key: string): Promise<any> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue != null) {
      const value = JSON.parse(jsonValue);
      return Promise.resolve(value);
    }
    const result: AppError = {errorMessage: 'not login', errorData: null};
    return Promise.reject(result);
  } catch (e) {
    const result: AppError = {
      errorData: e,
      errorMessage: null,
    };
    return Promise.reject(result);
  }
};

export const storeObjectData = async (
  key: string,
  value: any,
): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    return await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    const result: AppError = {
      errorData: e,
      errorMessage: null,
    };
    return Promise.reject(result);
  }
};

export const clearObjectData = async (key: string): Promise<void> => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (e) {
    const result: AppError = {
      errorData: e,
      errorMessage: null,
    };
    return Promise.reject(result);
  }
};
