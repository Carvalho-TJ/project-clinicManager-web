
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
    const user = JSON.parse(localStorage.getItem('clinic_user') || '{}');
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  registerPatient: (patientData) => api.post('/auth/registrar-paciente', patientData),
  verifyToken: () => api.get('/auth/verificar'),
};

export const pacienteAPI = {
  getMe: () => api.get('/paciente/me'),
  updateMe: (data) => api.put('/paciente/me', data),
  getEnderecos: () => api.get('/paciente/enderecos'),
  addEndereco: (data) => api.post('/paciente/enderecos', data),
  deleteEndereco: (id) => api.delete(`/paciente/enderecos/${id}`),
};

export const agendamentoAPI = {
  // Tipos e especialidades
  getTiposAtendimento: () => api.get('/tipos-atendimento'),
  getEspecialidades: (tipo) => api.get('/especialidades', { params: { tipo } }),
  getProfissionaisPorEspecialidade: (especialidade, tipo) => 
    api.get(`/especialidades/${especialidade}/profissionais`, { params: { tipo } }),
  
  // Agenda
  getDatasDisponiveis: (profissionalId, mes, ano) => 
    api.get(`/agenda/profissional/${profissionalId}/datas`, { params: { mes, ano } }),
  
  getHorariosDisponiveis: (profissionalId, data) => 
    api.get(`/agenda/profissional/${profissionalId}/horarios`, { params: { data } }),
  
  // Agendamento
  criarAgendamento: (dados) => api.post('/agendamentos/completo', dados),
  getMeusAgendamentos: () => api.get('/agendamentos/meus-agendamentos'),
  getDetalhesAgendamento: (id) => api.get(`/agendamentos/${id}/detalhes`),
  cancelarAgendamento: (id) => api.put(`/agendamentos/${id}/cancelar`),
};


export default api;