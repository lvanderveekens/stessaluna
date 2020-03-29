import axios from 'axios';
import history from '../history/history';
import Cookies from 'js-cookie';

axios.interceptors.request.use(
  (config) => {
    const csrfToken = Cookies.get('csrf_token');
    if (csrfToken) {
      config.headers['X-CSRF-Token'] = csrfToken;
    }
    return config;
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

      return axios.post('/api/token/refresh')
        .then(res => {
          return axios(originalRequest);
        });
    }
    return Promise.reject(error);
  }
);

export default axios;