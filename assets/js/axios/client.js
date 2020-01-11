import axios from 'axios';

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('luna-app:jwt-token');
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

    if (error.response.status === 401 && !originalRequest._processed) {
      originalRequest._processed = true;
      const refreshToken = localStorage.getItem('luna-app:refresh-token');

      return axios.post('/api/token/refresh', { refreshToken })
        .then(res => {
          localStorage.setItem('luna-app:jwt-token', res.data.token);
          localStorage.setItem('luna-app:refresh-token', res.data.refreshToken);
          return axios(originalRequest);
        });
    }
    return Promise.reject(error);
  });

export default axios;