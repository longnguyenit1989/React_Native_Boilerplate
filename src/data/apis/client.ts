import axios, {AxiosInstance} from 'axios';
import {Constants} from '../../constants/configs';
import AppError from '../../common/appError';
import AppData from '../../common/appData';
import {store} from '../../redux/store';
import {authAction} from '../../redux/slices/authSlice';
import {homeAction} from '../../redux/slices/homeSlice';

export interface Request {
  queryParameters?: {};
  body?: {};
  headers?: {};
}

export interface Response<T> extends AppData<T> {
  status: number | null;
}

const Client = (): AxiosInstance => {
  const client: AxiosInstance = axios.create({
    baseURL: Constants.BASE_URL,
    timeout: Constants.TIME_OUT,
    headers: {
      'Accept': 'application/json',
    },
  });

  client.interceptors.request.use(
    config => {
      const token = store.getState().auth.data?.token;
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );
  client.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response.status === 401) {
        store.dispatch(authAction.logout());
        store.dispatch(homeAction.reset());
      }
      return Promise.reject(error);
    },
  );
  return client;
};

const client = Client();

export const GetRequest = async <T>(
  path: string,
  requestData: Request,
): Promise<Response<T>> => {
  try {
    const response = await client.get<T>(path, {
      params: requestData.queryParameters,
      headers: requestData.headers,
    });
    const result: Response<T> = {
      data: response.data,
      status: response.status,
    };
    return Promise.resolve(result);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const result: AppError = {
        errorData: e.response?.data,
        errorMessage: e.message,
      };
      return Promise.reject(result);
    } else {
      const result: AppError = {
        errorData: null,
        errorMessage: 'unexpected error',
      };
      return Promise.reject(result);
    }
  }
};

export const PostRequest = async <T>(
  path: string,
  requestData: Request,
): Promise<Response<T>> => {
  try {
    const response = await client.post<T>(
      path,
      {...requestData.body},
      {headers: requestData.headers},
    );
    const result: Response<T> = {
      data: response.data,
      status: response.status,
    };
    return Promise.resolve(result);
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const result: AppError = {
        errorData: e.response?.data,
        errorMessage: e.message,
      };
      return Promise.reject(result);
    } else {
      const result: AppError = {
        errorData: null,
        errorMessage: 'unexpected error',
      };
      return Promise.reject(result);
    }
  }
};
