import axios from 'axios';
import { isHaveStorage, getLocalStorage, removeLocalStorage } from '@/util/storage';

const Axios = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

Axios.interceptors.request.use(
  (config: any) => {
    if (isHaveStorage('token')) {
      config.headers['x-access-token'] = getLocalStorage('token');
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

Axios.interceptors.response.use(
  (res: any) => {
    const data: any = res.data;
    return data;
  },
);

export default Axios;
