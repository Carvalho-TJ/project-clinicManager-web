import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './SideBar';
import { Container } from 'react-bootstrap';

// Este Layout será usado apenas por usuários LOGADOS
const MainLayout = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <Container fluid className="p-4 flex-grow-1">
        {/* O <Outlet /> renderiza o conteúdo da rota filha (AdminDashboard, ProfessionalAgenda, etc.) */}
        <Outlet /> 
      </Container>
    </div>
  );
};

export default MainLayout;