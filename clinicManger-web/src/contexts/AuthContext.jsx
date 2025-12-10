import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
// 1. Cria o Contexto
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verifica se existe um usuário ou token no localStorage ao carregar a aplicação
  useEffect(() => {
    checkAuth();
  }, []);

  // Função para verificar autenticação
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      
      if (token && userStr) {
        const userData = JSON.parse(userStr);
        setUser(userData);
        console.log('✅ Usuário recuperado:', userData);
      }
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      logout();
    } finally {
       setLoading(false);
    }
  };


// Função de mock para simular a chamada à API de login

const login = async (credentials) => {
  setLoading(true);
  try {
    // Usar a API real
    const response = await authAPI.login({
      login: credentials.email,  
      senha: credentials.senha
    });

    console.log('✅ Resposta do login:', response.data);
    
    // Converter user_type do backend para role do frontend
    const userTypeMap = {
      'paciente': 'patient',
      'profissional': 'professional',
      'admin': 'admin'
    };

    const userData = {
      id: response.data.user_id,
      name: response.data.nome,
      role: userTypeMap[response.data.user_type] || response.data.user_type,
      token: response.data.access_token,
      email: credentials.email
    };
    
    // Armazenar
    setUser(userData);
    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('user', JSON.stringify(userData));
    
    console.log('📱 Dados salvos:', userData);
    
    setLoading(false);
    return userData;
    
  } catch (error) {
    console.error('❌ Erro no login:', error);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoading(false);
    
    // Extrair mensagem de erro da API
    const errorMessage = error.response?.data?.error || 
                        error.message || 
                        'Credenciais inválidas. Tente novamente.';
    throw new Error(errorMessage);
  }
};
  
// Função para lidar com o logout
const logout = () => {
  setUser(null);
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/'; // Redireciona para home
};

const value = {
  user,
  isAuthenticated: !!user, // Booleano: true se user não for null
  isAdmin: user?.role === 'admin',
  isProfessional: user?.role === 'professional',
  isPatient: user?.role === 'patient',
  loading,
  login,
  logout,
  checkAuth
};

// O provedor compartilha o objeto 'value' com os componentes filhos
return (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
);
}

// 3. Cria um Hook Customizado para consumo
export function useAuth() {
  return useContext(AuthContext);
}