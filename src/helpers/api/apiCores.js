import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to every request
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (optional: error/global handler)
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // Optional: auto logout or redirect
      console.warn('Unauthorized. Redirect to login if needed.');
    }
    return Promise.reject(err);
  }
);

// CRUD methods
export const getRequest = (url, params = {}) => API.get(url, { params });
export const postRequest = (url, data) => API.post(url, data);
export const putRequest = (url, data) => API.put(url, data);
export const deleteRequest = (url) => API.delete(url);

export default API;
