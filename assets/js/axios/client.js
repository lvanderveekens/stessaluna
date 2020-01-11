import axios from 'axios';

const axiosClient = () => {
  const instance = axios.create();

  instance.interceptors.request.use(function (config) {
    // TODO: read from state 
    const token = localStorage.getItem('luna-app:jwt-token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

  return instance;
};

// the client object is exported, not the function itself
export default axiosClient();