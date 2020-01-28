import axios from 'axios';
import store from '../store/store';
import { storeToken } from '../auth/actions';
import history from '../history/history';

axios.interceptors.response.use(
  (response) => { return response; },
  (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest.url === '/api/token/refresh') {
      history.push('/login');
      return Promise.reject(error);
    }

    if (error.response.status === 401 && originalRequest.url !== '/api/token' && !originalRequest._processed) {
      originalRequest._processed = true;

      return axios.post('/api/token/refresh')
        .then(res => {
          return axios(originalRequest);
        });
    }
    return Promise.reject(error);
  });

export default axios;