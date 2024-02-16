import axios from 'axios';

var api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use(
  function (config) {
    var token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default api;