import axios from 'axios';
import queryString from 'query-string';

// Set up default config for http requests here
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  },
  paramsSerializer: params => queryString.stringify(params),
});

axios.interceptors.request.use((config) => {
  //config.headers.authorization = `Bearer ${localStorage.getItem("jwtToken")}`;
  return config;
}, (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use((response) => {
  //   if (response && response.data) {
  //     return response;
  //   }

  return response;
}, (error) => {
  return Promise.reject(error);
});

export default axiosClient;