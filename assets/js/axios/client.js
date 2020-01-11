import axios from 'axios';
import store from '../redux/store';

const axiosClient = () => {
  const instance = axios.create();

  instance.interceptors.request.use(function (config) {
    const token = store.getState().user.token;
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};

export default axiosClient();