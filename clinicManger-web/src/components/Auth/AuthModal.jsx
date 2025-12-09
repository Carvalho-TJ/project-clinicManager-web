import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { FaEnvelope, FaKey } from 'react-icons/fa';

// Cores baseadas no layout
const PRIMARY_COLOR = '#8c3d7e'; // Roxo principal
const GRADIENT_START = '#8c3d7e'; // Roxo escuro para o botão
const GRADIENT_END = '#c678b4'; // Rosa mais claro para o botão
const LIGHT_BG = '#fcf5fa'; // Fundo do Card de Cadastro/Aba Inativa

// Componentes internos para o formulário
const LoginForm = ({ handleLogin }) => (
    <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <FaEnvelope color="#8c3d7e" />
            <Form.Label style={{ color: PRIMARY_COLOR }}><i className="fa fa-envelope me-2"></i>Email</Form.Label>
            <Form.Control 
                type="email" 
                placeholder="seu@email.com" 
                style={{ height: '50px', borderRadius: '0.5rem', borderColor: '#ccc' }} 
                required 
            />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicPassword">
            <FaKey color="#8c3d7e" />
            <Form.Label style={{ color: PRIMARY_COLOR }}><i className="fa fa-lock me-2"></i>Senha</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="********" 
                style={{ height: '50px', borderRadius: '0.5rem', borderColor: '#ccc' }} 
                required 
            />
        </Form.Group>
        
        {/* Botão Entrar com Gradiente */}
        <Button 
            variant="primary" 
            type="submit" 
            className="w-100 py-3 fw-bold"
            style={{ 
                background: `linear-gradient(to right, ${GRADIENT_START}, ${GRADIENT_END})`,
                border: 'none', 
                borderRadius: '0.5rem'
            }}
        >
            Entrar
        </Button>
    </Form>
);

const RegisterForm = ({ handleRegister }) => (
    <Form onSubmit={handleRegister}>
        {/* === SEÇÃO 1: DADOS PESSOAIS === */}
        <h6 className="fw-bold mb-3" style={{ color: PRIMARY_COLOR }}>Dados Pessoais</h6>
        <Row>
            {/* Nome Completo */}
            <Col md={12}>
                <Form.Group className="mb-3" controlId="formRegisterName">
                    <Form.Label>Nome Completo *</Form.Label>
                    <Form.Control type="text" placeholder="João Silva" required />
                </Form.Group>
            </Col>

            {/* CPF */}
            <Col md={6}>
                <Form.Group className="mb-3" controlId="formRegisterCPF">
                    <Form.Label>CPF *</Form.Label>
                    <Form.Control type="text" placeholder="000.000.000-00" required />
                </Form.Group>
            </Col>

            {/* Data de Nascimento */}
            <Col md={6}>
                <Form.Group className="mb-3" controlId="formRegisterBirthDate">
                    <Form.Label>Data de Nascimento *</Form.Label>
                    <Form.Control type="date" required />
                </Form.Group>
            </Col>

            {/* Estado Civil */}
            <Col md={12}>
                <Form.Group className="mb-4" controlId="formRegisterMaritalStatus">
                    <Form.Label>Estado Civil *</Form.Label>
                    <Form.Select required>
                        <option value="">Selecione</option>
                        <option>Solteiro(a)</option>
                        <option>Casado(a)</option>
                        <option>Divorciado(a)</option>
                        <option>Viúvo(a)</option>
                    </Form.Select>
                </Form.Group>
            </Col>
            
            {/* Email */}
            <Col md={6}>
                <Form.Group className="mb-3" controlId="formRegisterEmail">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control type="email" placeholder="seu@email.com" required />
                </Form.Group>
            </Col>

            {/* Telefone */}
            <Col md={6}>
                <Form.Group className="mb-3" controlId="formRegisterPhone">
                    <Form.Label>Telefone *</Form.Label>
                    <Form.Control type="tel" placeholder="(92) 99999-9999" required />
                </Form.Group>
            </Col>
            
        </Row>

        {/* === SEÇÃO 2: ENDEREÇO E SENHA === */}
        <h6 className="fw-bold mb-3" style={{ color: PRIMARY_COLOR }}>Endereço</h6>
        <Row>
            {/* Rua */}
            <Col md={8}>
                <Form.Group className="mb-3" controlId="formRegisterStreet">
                    <Form.Label>Rua *</Form.Label>
                    <Form.Control type="text" placeholder="Av. Amazonas" required />
                </Form.Group>
            </Col>

            {/* Bairro */}
            <Col md={6}>
                <Form.Group className="mb-3" controlId="formRegisterDistrict">
                    <Form.Label>Bairro *</Form.Label>
                    <Form.Control type="text" placeholder="Centro" required />
                </Form.Group>
            </Col>
            
            {/* Número */}
            <Col md={4}>
                <Form.Group className="mb-3" controlId="formRegisterNumber">
                    <Form.Label>Número *</Form.Label>
                    <Form.Control type="text" placeholder="123" required />
                </Form.Group>
            </Col>

            {/* CEP */}
            <Col md={4}>
                <Form.Group className="mb-4" controlId="formRegisterCEP">
                    <Form.Label>CEP *</Form.Label>
                    <Form.Control type="text" placeholder="69000-000" required />
                </Form.Group>
            </Col>
            
            {/* Cidade */}
            <Col md={5}>
                <Form.Group className="mb-3" controlId="formRegisterCity">
                    <Form.Label>Cidade *</Form.Label>
                    <Form.Control type="text" placeholder="Parintins" required />
                </Form.Group>
            </Col>
            
            {/* Estado (UF) */}
            <Col md={3}>
                <Form.Group className="mb-3" controlId="formRegisterState">
                    <Form.Label>Estado *</Form.Label>
                    <Form.Select required>
                        <option value="AM">AM</option>
                        {/* Adicionar outros estados aqui... */}
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>
        
        {/* === SEÇÃO 3: SENHA === */}
        <h6 className="fw-bold mb-3" style={{ color: PRIMARY_COLOR }}>Senha</h6>
        <Row className="mb-4">
            {/* Senha */}
            <Col md={6}>
                <Form.Group controlId="formRegisterPassword">
                    <Form.Label>Senha *</Form.Label>
                    <Form.Control type="password" placeholder="********" required />
                </Form.Group>
            </Col>
            
            {/* Confirmar Senha */}
            <Col md={6}>
                <Form.Group controlId="formRegisterConfirmPassword">
                    <Form.Label>Confirmar Senha *</Form.Label>
                    <Form.Control type="password" placeholder="********" required />
                </Form.Group>
            </Col>
        </Row>
        
        {/* Botão Cadastrar com Gradiente */}
        <Button 
            variant="primary" 
            type="submit" 
            className="w-100 py-3 fw-bold"
            style={{ 
                background: `linear-gradient(to right, ${GRADIENT_START}, ${GRADIENT_END})`,
                border: 'none', 
                borderRadius: '0.5rem'
            }}
        >
            Cadastrar
        </Button>
    </Form>
);

const AuthModal = ({ show, handleClose }) => {
    // Estado para controlar se está em Login ou Cadastro
    const [activeTab, setActiveTab] = useState('login');

    const handleLogin = (e) => {
        e.preventDefault();
        alert('Simulação: Tentativa de Login. (FUTURO: Chamar API)');
        // handleClose(); // Fechar após o login (real)
    };
    
    const handleRegister = (e) => {
        e.preventDefault();
        alert('Simulação: Tentativa de Cadastro. (FUTURO: Chamar API)');
        // handleClose(); // Fechar após o cadastro (real)
    };

    // Estilo da Aba Ativa
    const activeTabStyle = {
        backgroundColor: 'white',
        color: PRIMARY_COLOR,
        border: `1px solid ${PRIMARY_COLOR}`,
    };
    
    // Estilo da Aba Inativa
    const inactiveTabStyle = {
        backgroundColor: LIGHT_BG,
        color: '#6c757d',
        border: 'none',
    };

    return (
        <Modal 
            show={show} 
            onHide={handleClose} 
            centered
            size="md"
            style={{ borderRadius: '1rem' }}
        >
            <Modal.Header closeButton>
                <Modal.Title className="fw-bold">
                    {activeTab === 'login' ? 'Entrar na sua conta' : 'Criar nova conta'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                
                {/* Abas de Navegação (Login / Cadastrar) */}
                <div 
                    className="d-flex mb-4 p-1" 
                    style={{ backgroundColor: LIGHT_BG, borderRadius: '0.5rem' }}
                >
                    <div 
                        onClick={() => setActiveTab('login')}
                        className="flex-fill text-center py-2 fw-bold"
                        style={{ 
                            cursor: 'pointer', 
                            borderRadius: '0.5rem', 
                            transition: 'all 0.3s',
                            ...(activeTab === 'login' ? activeTabStyle : inactiveTabStyle)
                        }}
                    >
                        Login
                    </div>
                    <div 
                        onClick={() => setActiveTab('register')}
                        className="flex-fill text-center py-2 fw-bold"
                        style={{ 
                            cursor: 'pointer', 
                            borderRadius: '0.5rem', 
                            transition: 'all 0.3s',
                            ...(activeTab === 'register' ? activeTabStyle : inactiveTabStyle)
                        }}
                    >
                        Cadastrar
                    </div>
                </div>

                {/* Conteúdo do Formulário */}
                {activeTab === 'login' ? (
                    <LoginForm handleLogin={handleLogin} />
                ) : (
                    <RegisterForm handleRegister={handleRegister} />
                )}
                
            </Modal.Body>
        </Modal>
    );
};

export default AuthModal;