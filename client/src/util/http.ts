import axios from 'axios';
import { isHaveStorage, getLocalStorage, removeLocalStorage } from '@/util/storage';

const NODE_ENV: string = process.env.NODE_ENV;
const baseURL = NODE_ENV === 'development' ? 'http://127.0.0.1:5000/' : 'http://apigql.bengbuzhangyue.xyz';

console.log('NODE_ENV--->', NODE_ENV);

const Axios = axios.create({
  baseURL,
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
    if (data.errors) {
      // 删除过期的token
      for (let i = 0; i < data.errors.length; i++) {
        if (data.errors[i].message.indexOf('403') > -1) {
          removeLocalStorage('token');
        }
      }
    }
    return data;
  },
);

export default Axios;
