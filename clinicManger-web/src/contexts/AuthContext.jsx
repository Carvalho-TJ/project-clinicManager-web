import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Cria o Contexto
const AuthContext = createContext();

// Função de mock para simular a chamada à API de login
const mockLoginAPI = async (credentials) => {
  // Simula o delay da rede
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Lógica de autenticação simplificada (apenas para o frontend)
  if (credentials.email === 'admin@clinic.com' && credentials.password === '123') {
    return { 
      id: 1, 
      name: 'Admin Master', 
      role: 'admin', 
      token: 'mock-admin-token' 
    };
  }
  if (credentials.email === 'dr.joao@clinic.com' && credentials.password === '123') {
    return { 
      id: 2, 
      name: 'Dr. João Silva', 
      role: 'professional', 
      token: 'mock-prof-token' 
    };
  }
  if (credentials.email === 'paciente@email.com' && credentials.password === '123') {
    return { 
      id: 3, 
      name: 'Maria Paciente', 
      role: 'patient', 
      token: 'mock-patient-token' 
    };
  }

  throw new Error('Credenciais inválidas. Tente novamente.');
};

// 2. Cria o Provedor do Contexto
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verifica se existe um usuário ou token no localStorage ao carregar a aplicação
  useEffect(() => {
    const storedUser = localStorage.getItem('clinic_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Função para lidar com o login
  const login = async (credentials) => {
    setLoading(true);
    try {
      const userData = await mockLoginAPI(credentials);
      
      // Armazena no estado e no localStorage (necessário para persistir o login ao recarregar)
      setUser(userData);
      localStorage.setItem('clinic_user', JSON.stringify(userData));
      
      setLoading(false);
      return userData;

    } catch (error) {
      setUser(null);
      localStorage.removeItem('clinic_user');
      setLoading(false);
      throw error;
    }
  };

  // Função para lidar com o logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('clinic_user');
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