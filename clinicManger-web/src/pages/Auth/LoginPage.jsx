import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Redireciona se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      // Redireciona para o dashboard correto com base no perfil (role)
      let redirectPath = '/';
      if (user.role === 'admin') {
        redirectPath = '/admin/dashboard';
      } else if (user.role === 'professional') {
        redirectPath = '/prof/agenda';
      } else if (user.role === 'patient') {
        redirectPath = '/patient/dashboard';
      }
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Chama a função de login do AuthContext (que ainda usa o mock)
      const userData = await login({ email, password });
      
      // 2. O useEffect cuida do redirecionamento após o sucesso do login.
      
    } catch (err) {
      // Exibe a mensagem de erro do mockLoginAPI (Credenciais inválidas)
      setError(err.message || 'Erro ao tentar logar.');
      setIsSubmitting(false);
    }
  };

  if (isAuthenticated) {
    // Se o useEffect ainda não redirecionou (muito rápido), mostre um loader
    return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  }
  
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '25rem' }}>
        <Card.Header className="text-center bg-primary text-white">
          <Card.Title className="mb-0">Acessar ClinicManager</Card.Title>
        </Card.Header>
        <Card.Body>
          <p className="text-center text-muted">Use as credenciais de teste: <strong>admin@clinic.com</strong>, <strong>dr.joao@clinic.com</strong> ou <strong>paciente@email.com</strong> (Senha: 123)</p>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Seu e-mail de acesso" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Sua senha" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
              />
            </Form.Group>
            
            <Button 
              variant="primary" 
              type="submit" 
              className="w-100" 
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner animation="border" size="sm" /> : 'Entrar'}
            </Button>
          </Form>
          
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;