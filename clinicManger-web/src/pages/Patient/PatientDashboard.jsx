import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Container, Card, ListGroup, Alert } from 'react-bootstrap';

const PatientDashboard = () => {
  const { user } = useAuth();
  
  // Mock de próximos agendamentos
  const nextAppointments = [
    { date: '15/12/2025', time: '11:00', doctor: 'Dr. João Silva' },
    { date: '20/01/2026', time: '15:30', doctor: 'Dr. Lucas Pereira' },
  ];

  return (
    <Container fluid>
      <h2 className="mb-4">Área do Paciente</h2>
      <Alert variant="success">
        Bem-vindo(a), **{user?.name}**! Aqui você pode gerenciar seus agendamentos e ver seu histórico.
      </Alert>

      <Card className="shadow-sm">
        <Card.Header as="h5" className="bg-light">Próximos Agendamentos</Card.Header>
        <ListGroup variant="flush">
          {nextAppointments.map((app, index) => (
            <ListGroup.Item key={index}>
              **{app.date}** às **{app.time}** com {app.doctor} 
              <span className="ms-auto float-end">
                <a href="#cancel" className="text-danger ms-3">Cancelar</a>
              </span>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Card.Body>
          <Card.Link href="#new-app">Agendar Nova Consulta</Card.Link>
        </Card.Body>
      </Card>
      
      <p className="mt-4">
        Esta página só é visível se o perfil for **'patient'**.
      </p>

    </Container>
  );
};

export default PatientDashboard;