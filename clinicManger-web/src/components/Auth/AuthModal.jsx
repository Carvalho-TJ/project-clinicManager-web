import React, { useState } from 'react';
import { Modal, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { FaEnvelope, FaKey } from 'react-icons/fa';
import { authAPI } from '../../services/api';

// Cores baseadas no layout
const PRIMARY_COLOR = '#8c3d7e';
const GRADIENT_START = '#8c3d7e';
const GRADIENT_END = '#c678b4';
const LIGHT_BG = '#fcf5fa';

// Componente LoginForm 
const LoginForm = ({ handleLogin, loading, error }) => (
    <Form onSubmit={handleLogin}>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <FaEnvelope color="#8c3d7e" />
            <Form.Label style={{ color: PRIMARY_COLOR }}>Email</Form.Label>
            <Form.Control 
                type="email" 
                name="email"
                placeholder="seu@email.com" 
                style={{ height: '50px', borderRadius: '0.5rem', borderColor: '#ccc' }} 
                required 
            />
        </Form.Group>

        <Form.Group className="mb-4" controlId="formBasicPassword">
            <FaKey color="#8c3d7e" />
            <Form.Label style={{ color: PRIMARY_COLOR }}>Senha</Form.Label>
            <Form.Control 
                type="password" 
                name="senha"
                placeholder="********" 
                style={{ height: '50px', borderRadius: '0.5rem', borderColor: '#ccc' }} 
                required 
            />
        </Form.Group>
        
        <Button 
            variant="primary" 
            type="submit" 
            className="w-100 py-3 fw-bold"
            disabled={loading}
            style={{ 
                background: `linear-gradient(to right, ${GRADIENT_START}, ${GRADIENT_END})`,
                border: 'none', 
                borderRadius: '0.5rem'
            }}
        >
            {loading ? <Spinner size="sm" animation="border" /> : 'Entrar'}
        </Button>
    </Form>
);

// Componente RegisterForm
const RegisterForm = ({ handleRegister, loading, error }) => (
    <Form onSubmit={handleRegister}>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <h6 className="fw-bold mb-3" style={{ color: PRIMARY_COLOR }}>Dados Pessoais</h6>
        <Row>
            <Col md={12}>
                <Form.Group className="mb-3" controlId="formRegisterName">
                    <Form.Label>Nome Completo *</Form.Label>
                    <Form.Control type="text" name="nome" placeholder="João Silva" required />
                </Form.Group>
            </Col>

            <Col md={6}>
                <Form.Group className="mb-3" controlId="formRegisterCPF">
                    <Form.Label>CPF *</Form.Label>
                    <Form.Control type="text" name="cpf" placeholder="000.000.000-00" required />
                </Form.Group>
            </Col>

            <Col md={6}>
                <Form.Group className="mb-3" controlId="formRegisterBirthDate">
                    <Form.Label>Data de Nascimento *</Form.Label>
                    <Form.Control type="date" name="dataNascimento" required />
                </Form.Group>
            </Col>

            <Col md={12}>
                <Form.Group className="mb-4" controlId="formRegisterMaritalStatus">
                    <Form.Label>Estado Civil *</Form.Label>
                    <Form.Select name="estadoCivil" required>
                        <option value="">Selecione</option>
                        <option value="Solteiro(a)">Solteiro(a)</option>
                        <option value="Casado(a)">Casado(a)</option>
                        <option value="Divorciado(a)">Divorciado(a)</option>
                        <option value="Viúvo(a)">Viúvo(a)</option>
                    </Form.Select>
                </Form.Group>
            </Col>
            
            <Col md={6}>
                <Form.Group className="mb-3" controlId="formRegisterEmail">
                    <Form.Label>Email *</Form.Label>
                    <Form.Control type="email" name="email" placeholder="seu@email.com" required />
                </Form.Group>
            </Col>

            <Col md={6}>
                <Form.Group className="mb-3" controlId="formRegisterPhone">
                    <Form.Label>Telefone *</Form.Label>
                    <Form.Control type="tel" name="telefone" placeholder="(92) 99999-9999" required />
                </Form.Group>
            </Col>
        </Row>

        <h6 className="fw-bold mb-3" style={{ color: PRIMARY_COLOR }}>Endereço</h6>
        <Row>
            <Col md={8}>
                <Form.Group className="mb-3" controlId="formRegisterStreet">
                    <Form.Label>Rua *</Form.Label>
                    <Form.Control type="text" name="rua" placeholder="Av. Amazonas" required />
                </Form.Group>
            </Col>

            <Col md={6}>
                <Form.Group className="mb-3" controlId="formRegisterDistrict">
                    <Form.Label>Bairro *</Form.Label>
                    <Form.Control type="text" name="bairro" placeholder="Centro" required />
                </Form.Group>
            </Col>
            
            <Col md={4}>
                <Form.Group className="mb-3" controlId="formRegisterNumber">
                    <Form.Label>Número *</Form.Label>
                    <Form.Control type="text" name="numero" placeholder="123" required />
                </Form.Group>
            </Col>

            <Col md={4}>
                <Form.Group className="mb-4" controlId="formRegisterCEP">
                    <Form.Label>CEP *</Form.Label>
                    <Form.Control type="text" name="cep" placeholder="69000-000" required />
                </Form.Group>
            </Col>
            
            <Col md={5}>
                <Form.Group className="mb-3" controlId="formRegisterCity">
                    <Form.Label>Cidade *</Form.Label>
                    <Form.Control type="text" name="cidade" placeholder="Parintins" required />
                </Form.Group>
            </Col>
            
            <Col md={3}>
                <Form.Group className="mb-3" controlId="formRegisterState">
                    <Form.Label>Estado *</Form.Label>
                    <Form.Select name="estado" required>
                        <option value="AM">AM</option>
                        <option value="AC">AC</option>
                        <option value="AL">AL</option>
                        {/* Adicionar outros estados (Verificar API para estado e cidades) */}
                    </Form.Select>
                </Form.Group>
            </Col>
        </Row>
        
        <h6 className="fw-bold mb-3" style={{ color: PRIMARY_COLOR }}>Senha</h6>
        <Row className="mb-4">
            <Col md={6}>
                <Form.Group controlId="formRegisterPassword">
                    <Form.Label>Senha *</Form.Label>
                    <Form.Control type="password" name="senha" placeholder="********" required />
                </Form.Group>
            </Col>
            
            <Col md={6}>
                <Form.Group controlId="formRegisterConfirmPassword">
                    <Form.Label>Confirmar Senha *</Form.Label>
                    <Form.Control type="password" name="confirmarSenha" placeholder="********" required />
                </Form.Group>
            </Col>
        </Row>
        
        <Button 
            variant="primary" 
            type="submit" 
            className="w-100 py-3 fw-bold"
            disabled={loading}
            style={{ 
                background: `linear-gradient(to right, ${GRADIENT_START}, ${GRADIENT_END})`,
                border: 'none', 
                borderRadius: '0.5rem'
            }}
        >
            {loading ? <Spinner size="sm" animation="border" /> : 'Cadastrar'}
        </Button>
    </Form>
);

const AuthModal = ({ show, handleClose }) => {
    const [activeTab, setActiveTab] = useState('login');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

   const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const senha = formData.get('senha');

    console.log('📤 Tentando login com:', { email, senha });

    try {
        const response = await authAPI.login({
            login: email,
            senha: senha,
        });

        console.log('✅ Resposta completa da API:', response.data);
        
        const token = response.data.access_token;
        if (!token) {
            console.error('❌ Token não encontrado na resposta:', response.data);
            throw new Error('Token não recebido do servidor');
        }

        
        const userTypeMap = {
            'paciente': 'patient',
            'profissional': 'professional', 
            'admin': 'admin'
        };

        const userData = {
            id: response.data.user_id,
            name: response.data.nome,
            role: userTypeMap[response.data.user_type] || response.data.user_type,
            tipo: response.data.user_type, 
            email: email,
            token: token
        };

        console.log('📱 Dados processados para localStorage:', userData);

        // SALVAR CORRETAMENTE
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));

        console.log('✅ Verificação do localStorage:');
        console.log('- Token salvo:', localStorage.getItem('token')?.substring(0, 20) + '...');
        console.log('- User salvo:', JSON.parse(localStorage.getItem('user')));

        // FECHAR MODAL
        handleClose();

        //REDIRECIONAR PARA AGENDAMENTO SE FOR PACIENTE
        setTimeout(() => {
            const redirectPath = localStorage.getItem('redirectAfterLogin');
            console.log('🎯 Iniciando redirecionamento...');
            console.log('👤 Tipo de usuário:', response.data.user_type);
            
            if (redirectPath) {
                // Se tem redirecionamento pendente, usa ele
                console.log('📍 Redirecionando para caminho salvo:', redirectPath);
                localStorage.removeItem('redirectAfterLogin'); 
                window.location.href = redirectPath;
            } else {
                // Redirecionamento padrão baseado no tipo de usuário
                console.log('🎯 Iniciando redirecionamento padrão...');
                console.log('👤 Tipo de usuário:', response.data.user_type);
            }
            if (response.data.user_type === 'paciente') {
                console.log('✅ É paciente, redirecionando para AGENDAMENTO...');
                window.location.href = '/patient/dashboard';
            } else if (response.data.user_type === 'profissional') {
                console.log('👨‍⚕️ É profissional, redirecionando para agenda...');
                window.location.href = '/prof/dashboard';
            } else if (response.data.user_type === 'admin') {
                console.log('👑 É admin, redirecionando para dashboard...');
                window.location.href = '/admin/dashboard';
            } else {
                console.log('⚠️ Tipo desconhecido, redirecionando para home...');
                window.location.href = '/';
            }
        }, 300);

    } catch (err) {
        console.error('❌ Erro completo no login:', err);
        
        
        // MENSAGENS DE ERRO MAIS DESCRITIVAS
        let errorMessage = 'Erro ao fazer login';
        
        if (err.response?.status === 400) {
            errorMessage = err.response.data.error || 'Credenciais inválidas';
        } else if (err.response?.status === 401) {
            errorMessage = 'Email ou senha incorretos';
        } else if (err.response?.status === 403) {
            errorMessage = 'Usuário desativado';
        } else{
            errorMessage = err.message || 'Erro ao conectar com o servidor';
        }
        
        setError(errorMessage);
        setLoading(false);
    }
};

const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const nome = e.target.nome.value;
        const cpf = e.target.cpf.value.replace(/\D/g, '');
        const dataNascimento = e.target.dataNascimento.value;
        const estadoCivil = e.target.estadoCivil.value;
        const telefone = e.target.telefone.value.replace(/\D/g, '');
        const email = e.target.email.value;
        const senha = e.target.senha.value;
        const confirmarSenha = e.target.confirmarSenha.value;

         if (senha !== confirmarSenha) {
            setError('As senhas não coincidem');
            setLoading(false);
            return;
        }

        if (!nome || !email || !senha) {
            setError('Nome, email e senha são obrigatórios');
            setLoading(false);
            return;
        }

        const formData = {
            nome: nome,
            cpf: cpf,
            data_nasc: dataNascimento,
            estado_civil: estadoCivil,
            telefone: telefone,
            email: email,
            login: email,
            senha: senha
        };

        console.log('Enviando para API (cadastro):', formData);

        try {
            const response = await authAPI.registerPatient(formData);
            console.log('Resposta da API (cadastro):', response.data);
            
            alert('✅ Cadastro realizado com sucesso! Faça login para continuar.');
            setActiveTab('login');
            setError('');
            
            e.target.reset();
            
        } catch (err) {
            console.error('Erro completo no cadastro:', err);
            setError(err.response?.data?.error || err.message || 'Erro ao cadastrar');
        } finally {
            setLoading(false);
        }
    };

   
    const activeTabStyle = {
        backgroundColor: 'white',
        color: PRIMARY_COLOR,
        border: `1px solid ${PRIMARY_COLOR}`,
    };
    
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
                
                <div 
                    className="d-flex mb-4 p-1" 
                    style={{ backgroundColor: LIGHT_BG, borderRadius: '0.5rem' }}
                >
                    <div 
                        onClick={() => {setActiveTab('login'); setError('');}}
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
                        onClick={() => {setActiveTab('register'); setError('');}}
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

                {activeTab === 'login' ? (
                    <LoginForm 
                        handleLogin={handleLogin} 
                        loading={loading}
                        error={error}
                    />
                ) : (
                    <RegisterForm 
                        handleRegister={handleRegister} 
                        loading={loading}
                        error={error}
                    />
                )}
                
            </Modal.Body>
        </Modal>
    );
};

export default AuthModal;