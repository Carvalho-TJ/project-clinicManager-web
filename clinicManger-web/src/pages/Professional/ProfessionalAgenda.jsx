import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Container, Table, Alert, Badge } from 'react-bootstrap';

const ProfessionalAgenda = () => {
  const { user } = useAuth();
  
  // Mock de agendamentos para teste
  const appointments = [
    { time: '09:00', patient: 'Ana Oliveira', status: 'Confirmado' },
    { time: '10:30', patient: 'Bruno Mendes', status: 'Pendente' },
    { time: '14:00', patient: 'Carla Dias', status: 'Confirmado' },
    { time: '16:00', patient: 'Felipe Santos', status: 'Cancelado' },
  ];

  return (
    <Container fluid>
      <h2 className="mb-4">Minha Agenda - {new Date().toLocaleDateString('pt-BR')}</h2>
      <Alert variant="info">
        Olá, **{user?.name}**! Seu foco hoje são os 4 agendamentos.
      </Alert>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Horário</th>
            <th>Paciente</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((app, index) => (
            <tr key={index}>
              <td>{app.time}</td>
              <td>{app.patient}</td>
              <td>
                <Badge bg={
                  app.status === 'Confirmado' ? 'success' : 
                  app.status === 'Pendente' ? 'warning' : 'danger'
                }>
                  {app.status}
                </Badge>
              </td>
              <td>
                <a href="#start" className="btn btn-sm btn-outline-primary">Iniciar</a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      <p className="mt-4">
        Esta página só é visível se o perfil for **'professional'**.
      </p>

    </Container>
  );
};

export default ProfessionalAgenda;