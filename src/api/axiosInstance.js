import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://68abef7e7a0bbe92cbb8ab1a.mockapi.io',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
