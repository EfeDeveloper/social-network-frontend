import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = JSON.parse(localStorage.getItem('auth-storage') || '{}')?.state?.token;
      if (token) {
        if (config.headers) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
