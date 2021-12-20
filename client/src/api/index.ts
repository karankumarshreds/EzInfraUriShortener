import axios from 'axios';

export const api = axios.create({
  // baseURL: process.env.REACT_APP_BACKEND_URI,
  baseURL: 'http://3.108.11.72:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
