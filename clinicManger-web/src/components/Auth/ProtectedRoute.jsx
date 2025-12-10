// ProtectedRoute.js ATUALIZADO
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Alert, Spinner } from 'react-bootstrap';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <p>Carregando dados de usuário...</p>
      </div>
    );
  }

  // 1. Se não estiver autenticado
  if (!isAuthenticated) {
    // SALVA A URL ATUAL PARA REDIRECIONAR DEPOIS DO LOGIN 
    const currentPath = window.location.pathname;
    console.log('🔐 Tentativa de acesso a rota protegida:', currentPath);
    localStorage.setItem('redirectAfterLogin', currentPath);
    
    // Redireciona para home onde terá o modal de login
    return <Navigate to="/" replace />;
  }

  // 2. Verifica se o perfil é permitido
  const userRole = user?.role;
  
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return (
      <Alert variant="danger" className="m-5">
        Acesso Negado. Seu perfil ({userRole}) não tem permissão para esta área.
        <p><a href="/">Voltar para Home</a></p>
      </Alert>
    );
  }

  // 3. Permite acesso
  return children;
};

export default ProtectedRoute;