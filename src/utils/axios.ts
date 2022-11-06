/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import { getUserFromLocalStorage } from './localStorage';

const customFetch = axios.create({
  baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
});

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();

  if (!config) {
    config = {};
  }

  if (!config.headers) {
    config.headers = {};
  }

  if (user) {
    config.headers['Authorization'] = `Bearer ${user.token}`;
  }

  return config;
});

export default customFetch;
