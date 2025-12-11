import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const { user, isProfessional, isAdmin, isPatient, logout } = useAuth();
  
  if (!user) return null;

  return (
    <div style={{ 
      width: '250px', 
      minHeight: '100vh', 
      background: "linear-gradient(145deg,#9e3d6d,#c26797)", // gradiente igual ao dashboard
      padding: '1.5rem',
      boxShadow: '2px 0 8px rgba(0,0,0,0.15)',
      color: 'white',
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      {/* Cabeçalho do usuário */}
      <h5 style={{ marginBottom: "1rem", fontWeight: "bold" }}>
        {user.name} <span style={{ fontSize: "0.9em", opacity: 0.8 }}>({user.role.toUpperCase()})</span>
      </h5>
      <hr style={{ borderColor: "rgba(255,255,255,0.3)" }} />

      <Nav className="flex-column">
        {/* Links do ADMINISTRADOR */}
        {isAdmin && (
          <>
            <LinkContainer to="/admin/dashboard">
              <Nav.Link style={linkStyle}>📊 Dashboard Admin</Nav.Link>
            </LinkContainer>           
          </>
        )}

        {/* Links do PROFISSIONAL */}
        {isProfessional && (
          <>
            <LinkContainer to="/prof/agenda">
              <Nav.Link style={linkStyle}>📆 Minha Agenda</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/prof/dashboard">
              <Nav.Link style={linkStyle}>📁 Meus Pacientes</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/prof/records">
              <Nav.Link style={linkStyle}>📄Prontuários</Nav.Link>
            </LinkContainer>
          </>
        )}

        {/* Links do PACIENTE */}
        {isPatient && (
          <>
            <LinkContainer to="/patient/dashboard">
              <Nav.Link style={linkStyle}>📅 Meus Agendamentos</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/patient/history">
              <Nav.Link style={linkStyle}>📜 Histórico Clínico</Nav.Link>
            </LinkContainer>
          </>
        )}

        <hr style={{ borderColor: "rgba(255,255,255,0.3)", margin: "1rem 0" }} />

        {/* Botão de Logout */}
        <Nav.Link 
          onClick={logout} 
          style={{ 
            color: "#f8b4b4", 
            fontWeight: "bold", 
            cursor: "pointer" 
          }}
        >
          ⏻ Sair
        </Nav.Link>
      </Nav>
    </div>
  );
};

// 🔹 Estilo aplicado a todos os links com hover
const linkStyle = {
  color: "white",
  fontWeight: "500",
  padding: "8px 0",
  transition: "all 0.2s ease",
  cursor: "pointer"
};

// Adiciona efeito hover via CSS-in-JS
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  .nav-link:hover {
    color: #ffd6ec !important; /* tom mais claro */
    background-color: rgba(0,0,0,0.1);
    border-radius: 6px;
  }
`, styleSheet.cssRules.length);

export default Sidebar;
