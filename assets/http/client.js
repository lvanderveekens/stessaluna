import axios from 'axios';
import store from '../store/store';
import { storeToken } from '../auth/actions';
import history from '../history/history';

axios.interceptors.request.use(
  config => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

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

      return axios.post('/api/token/refresh', { refreshToken: store.getState().auth.refreshToken })
        .then(res => {
          store.dispatch(storeToken(res.data));
          return axios(originalRequest);
        });
    }
    return Promise.reject(error);
  });

export default axios;