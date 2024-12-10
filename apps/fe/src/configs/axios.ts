import axios from 'axios';

const apiServices = axios.create({
  baseURL: 'http://localhost:3000/api',
});

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default apiServices;
