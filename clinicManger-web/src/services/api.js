
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token automático
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  registerPatient: (patientData) => api.post('/auth/registrar-paciente', patientData),
  //registerUser: (userData) => api.post('/auth/register', userData),
};

export const pacienteAPI = {
  getAll: () => api.get('/paciente'),
  getById: (id) => api.get(`/paciente/${id}`),
  create: (data) => api.post('/paciente', data),
  update: (id, data) => api.put(`/paciente/${id}`, data),
  delete: (id) => api.delete(`/paciente/${id}`),
};

export default api;