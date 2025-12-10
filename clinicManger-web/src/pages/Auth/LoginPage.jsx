import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [loginField, setLoginField] = useState('');
  const [senha, setSenha] = useState(''); 
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, isAuthenticated, user, loading } = useAuth();
  const navigate = useNavigate();

  // Redireciona se já estiver autenticado
  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      console.log('🔄 Usuário autenticado, redirecionando:', user);
      
      let redirectPath = '/';
      if (user.tipo === 'admin' || user.role === 'admin') {
        redirectPath = '/admin/dashboard';
      } else if (user.tipo === 'profissional' || user.role === 'professional') {
        redirectPath = '/prof/agenda';
      } else if (user.tipo === 'paciente' || user.role === 'patient') {
        redirectPath = '/patient/dashboard';
      }
      
      console.log(`📍 Redirecionando para: ${redirectPath}`);
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!loginField || !senha) {
      setError('Por favor, preencha todos os campos.');
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('📤 Iniciando login...');
      
      const userData = await login({ 
        email: loginField,
        senha: senha
      });
      
      console.log('✅ Login processado com sucesso!', userData);
      // O redirecionamento será feito pelo useEffect
      
    } catch (err) {
      console.error('❌ Erro no login:', err);
      setError(err.message || 'Erro ao tentar logar.');
      setIsSubmitting(false);
    }
  };

 
  useEffect(() => {
    console.log('🔍 Estado atual do login:', {
      loading,
      isAuthenticated,
      user,
      token: localStorage.getItem('token')
    });
  }, [loading, isAuthenticated, user]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" variant="primary" />
        <span className="ms-3">Verificando autenticação...</span>
      </Container>
    );
  }

  if (isAuthenticated && user) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" variant="primary" />
        <span className="ms-3">Redirecionando...</span>
      </Container>
    );
  }
  
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '25rem' }}>
        <Card.Header className="text-center bg-primary text-white">
          <Card.Title className="mb-0">Acessar ClinicManager</Card.Title>
        </Card.Header>
        <Card.Body>
          <p className="text-center text-muted">
            Use as credenciais de teste: 
            <br />
            <strong>teste1@email.com</strong> (Senha: 12345678)
          </p>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>E-mail ou CPF</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="teste1@email.com" 
                value={loginField} 
                onChange={(e) => setLoginField(e.target.value)} 
                required
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="12345678" 
                value={senha} 
                onChange={(e) => setSenha(e.target.value)} 
                required
              />
            </Form.Group>
            
            <Button 
              variant="primary" 
              type="submit" 
              className="w-100" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Entrando...
                </>
              ) : 'Entrar'}
            </Button>
          </Form>
          
          {/* Debug info */}
          <div className="mt-3 small text-muted">
            <hr />
            <p className="mb-1">
              <strong>Para debug:</strong>
            </p>
            <button 
              type="button" 
              className="btn btn-sm btn-outline-secondary"
              onClick={() => {
                console.log('🔍 Debug info:');
                console.log('Token:', localStorage.getItem('token'));
                console.log('User:', JSON.parse(localStorage.getItem('user') || '{}'));
                console.log('Estado do AuthContext:', { isAuthenticated, user, loading });
              }}
            >
              Mostrar Info Debug
            </button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LoginPage;