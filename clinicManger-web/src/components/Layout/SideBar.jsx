import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; // Ajuda a usar Link com Bootstrap Nav
import { useAuth } from '../../contexts/AuthContext';


const Sidebar = () => {
  const { user, isProfessional, isAdmin, isPatient, logout } = useAuth();
  
  if (!user) return null; // Não mostra a sidebar se não houver usuário logado

  return (
    <div style={{ 
      width: '250px', 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa', 
      padding: '1rem',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)' 
    }}>
      <h5 className="mb-4 text-primary">{user.name} ({user.role.toUpperCase()})</h5>
      <hr />
      <Nav className="flex-column">
        
        {/* Links do ADMINISTRADOR */}
        {isAdmin && (
          <>
            <LinkContainer to="/admin/dashboard"><Nav.Link>Dashboard Admin</Nav.Link></LinkContainer>
            <LinkContainer to="/admin/users"><Nav.Link>Gestão de Usuários</Nav.Link></LinkContainer>
          </>
        )}
        
        {/* Links do PROFISSIONAL */}
        {isProfessional && (
          <>
            <LinkContainer to="/prof/agenda"><Nav.Link>Minha Agenda</Nav.Link></LinkContainer>
            <LinkContainer to="/prof/patients"><Nav.Link>Meus Pacientes</Nav.Link></LinkContainer>
            <LinkContainer to="/prof/records"><Nav.Link>Prontuários</Nav.Link></LinkContainer>
          </>
        )}
        
        {/* Links do PACIENTE */}
        {isPatient && (
          <>
            <LinkContainer to="/patient/dashboard"><Nav.Link>Meus Agendamentos</Nav.Link></LinkContainer>
            <LinkContainer to="/patient/history"><Nav.Link>Histórico Clínico</Nav.Link></LinkContainer>
          </>
        )}
        
        <hr className="mt-3 mb-3" />
        
        {/* Botão de Logout */}
        <Nav.Link onClick={logout} className="text-danger">Sair</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;