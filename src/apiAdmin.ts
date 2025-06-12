import axios from 'axios';

const api_admin = axios.create({
  baseURL: 'http://localhost:3001/api/admin',
});

// Adiciona o token JWT automaticamente
api_admin.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tokenAdmin');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api_admin;
