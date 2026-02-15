import axios from 'axios';

export const BASE_URL = "https://elitetok-1.onrender.com";

export const api = axios.create({
  baseURL: BASE_URL,
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete api.defaults.headers.common['x-auth-token'];
  }
};