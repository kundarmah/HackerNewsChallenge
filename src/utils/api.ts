import axios from 'axios';

const BASE_URL = 'https://hacker-news.firebaseio.com/v0';

export const api = axios.create({
  baseURL: BASE_URL,
});
