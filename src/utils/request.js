import axios from 'axios';

// create an axios instance
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : '',
  timeout: 30000, // request timeout
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

// request interceptor
service.interceptors.request.use((config) => {
  // Do something before request is sent
  return config;
}, (error) => {
  // Do something with request error
  console.log(error); // for debug
  Promise.reject(error);
});

// respone interceptor
service.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    console.log(`err${error}`);// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  },
);

export default service;
