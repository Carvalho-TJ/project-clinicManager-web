import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Alert, Spinner } from 'react-bootstrap';

/**
 * Componente que protege rotas com base no status de autenticação e no perfil (role).
 * @param {string[]} allowedRoles - Array de perfis permitidos (ex: ['admin', 'professional'])
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = useAuth();
  
  if (loading) {
    // Exibe um spinner de carregamento enquanto verifica o localStorage
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <p>Carregando dados de usuário...</p>
      </div>
    );
  }

  // 1. Se não estiver autenticado, redireciona para a página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. Se o usuário estiver autenticado, verifica o perfil (role)
  const userRole = user?.role;
  
  // Verifica se o perfil do usuário está na lista de perfis permitidos
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    // Se o perfil não for permitido, exibe uma mensagem de acesso negado
    return (
      <Alert variant="danger" className="m-5">
        Acesso Negado. Seu perfil ({userRole}) não tem permissão para esta área.
        <p><a href="/login">Voltar para o Login</a></p>
      </Alert>
    );
  }

  // 3. Se tudo estiver ok, renderiza os componentes filhos (a página)
  return children;
};

export default ProtectedRoute;