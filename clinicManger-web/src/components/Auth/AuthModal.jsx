import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
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
        {/* Adicione campos adicionais para cadastro (ex: Nome, Telefone) */}
        <Form.Group className="mb-3" controlId="formRegisterName">
            <Form.Label style={{ color: PRIMARY_COLOR }}>Nome Completo</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="Seu Nome" 
                style={{ height: '50px', borderRadius: '0.5rem', borderColor: '#ccc' }} 
                required 
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formRegisterEmail">
            <Form.Label style={{ color: PRIMARY_COLOR }}>Email</Form.Label>
            <Form.Control 
                type="email" 
                placeholder="seu@email.com" 
                style={{ height: '50px', borderRadius: '0.5rem', borderColor: '#ccc' }} 
                required 
            />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formRegisterPassword">
            <Form.Label style={{ color: PRIMARY_COLOR }}>Senha</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="********" 
                style={{ height: '50px', borderRadius: '0.5rem', borderColor: '#ccc' }} 
                required 
            />
        </Form.Group>
        
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
                <Modal.Title className="fw-bold">Entrar na sua conta</Modal.Title>
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