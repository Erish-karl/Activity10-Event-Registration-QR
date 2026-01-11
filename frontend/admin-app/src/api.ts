import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3002', // <-- make sure this matches your backend port
  headers: {
    'Content-Type': 'application/json',
  },
});
