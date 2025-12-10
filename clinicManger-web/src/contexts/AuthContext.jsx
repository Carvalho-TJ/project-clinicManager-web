import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

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

  /*const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await authAPI.login({
        login: credentials.email,
        senha: credentials.senha
      });

      console.log('✅ Resposta do login:', response.data);
      
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
      
      const errorMessage = error.response?.data?.error || 
                          error.message || 
                          'Credenciais inválidas. Tente novamente.';
      throw new Error(errorMessage);
    }
  };*/
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const value = {
    user,
    setUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isProfessional: user?.role === 'professional',
    isPatient: user?.role === 'patient',
    loading,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}