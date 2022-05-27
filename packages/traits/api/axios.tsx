import auth from '@react-native-firebase/auth';
import { Platform } from 'react-native';
import axios, { AxiosError, AxiosResponse } from 'axios';
import config from '@racket-common/config';

export type { AxiosError, AxiosResponse };

const url = Platform.select({
  web: config.WEB_BASE_URL,
  ios: config.IOS_BASE_URL,
  android: config.ANDROID_BASE_URL,
});

const api = axios.create({
  baseURL: url,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await auth().currentUser?.getIdToken();
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };

    return config;
  },
  (err) => Promise.reject(err)
);

export default api;
