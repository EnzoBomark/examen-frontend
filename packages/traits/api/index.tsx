import auth from '@react-native-firebase/auth';
import axios, { AxiosError, AxiosResponse } from 'axios';
import config from '@racket-common/config';

export type { AxiosError, AxiosResponse };

const api = axios.create({
  baseURL: config.BASE_URL,
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
