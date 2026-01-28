import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

// Interceptor para agregar el token JWT a las requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor para manejar respuestas y errores globalmente
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  },
);

// Auth services
export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  } catch (e) {
    return {
      error: true,
      message: e.response?.data?.message || 'Error al iniciar sesión',
    };
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  } catch (e) {
    return {
      error: true,
      message: e.response?.data?.message || 'Error al registrar usuario',
    };
  }
};

// AI services
export const queryAI = async (question) => {
  try {
    const response = await apiClient.post('/ai/query', { question });
    return response.data;
  } catch (e) {
    return {
      error: true,
      message: e.response?.data?.message || 'Error al procesar la consulta',
    };
  }
};
