
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
    // Busca o token da chave correta
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('✅ Token adicionado ao header:', token.substring(0, 20) + '...');
    } else {
      console.warn('⚠️ Token não encontrado no localStorage');
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
  // AGENDAMENTO COMPLETO (usa sua rota /completo)
  criarAgendamento: (data) => api.post('/agendamentos/completo', data),
  
  // AGENDAMENTOS DO PACIENTE
  getMeusAgendamentos: () => api.get('/agendamentos/meus-agendamentos'),
  getDetalhesAgendamento: (id) => api.get(`/agendamentos/${id}/detalhes`),
  cancelarAgendamento: (id) => api.put(`/agendamentos/${id}/cancelar`),
  
  // FLUXO DE AGENDAMENTO
  getEspecialidades: () => api.get('/especialidades'),
  
  getProfissionais: () => api.get('/profissionais'),

  getProfissionaisPorEspecialidade: (especialidade) => 
    api.get(`/especialidades/${especialidade}/profissionais`),
  
  // DATAS E HORÁRIOS
  getDatasDisponiveis: (profissionalId, mes, ano) => 
    api.get(`/agenda/profissional/${profissionalId}/datas?mes=${mes}&ano=${ano}`),
  
  getHorariosDisponiveis: (profissionalId, data) => 
    api.get(`/agenda/profissional/${profissionalId}/horarios?data=${data}`)
};

export default api;