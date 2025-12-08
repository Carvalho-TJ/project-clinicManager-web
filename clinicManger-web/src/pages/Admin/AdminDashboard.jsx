import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Container, Card, Row, Col, Alert } from 'react-bootstrap';

const AdminDashboard = () => {
  const { user } = useAuth(); // Apenas para mostrar informações do usuário
  
  return (
    <Container fluid>
      <h2 className="mb-4">Painel de Administração</h2>
      <Alert variant="info">
        Bem-vindo(a), **{user?.name}**! Você acessou a área de Administrador.
      </Alert>

      <Row>
        <Col md={4} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Total de Profissionais</Card.Title>
              <Card.Text as="h3" className="text-primary">12</Card.Text>
              <Card.Text className="text-muted">ativos na clínica.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Pacientes Cadastrados</Card.Title>
              <Card.Text as="h3" className="text-success">450</Card.Text>
              <Card.Text className="text-muted">no sistema.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Agendamentos Hoje</Card.Title>
              <Card.Text as="h3" className="text-warning">25</Card.Text>
              <Card.Text className="text-muted">necessitam de confirmação.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <p className="mt-4">
        Esta página só é visível se o perfil for **'admin'** (protegido por `ProtectedRoute`).
      </p>

    </Container>
  );
};

export default AdminDashboard;