import React, {useState} from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import UserDropdown from '../Layout/UserDropdown';

import Logo from '../../assets/logo.png';

const HEADER_TOP_COLOR = '#8c3d7e';
const PRIMARY_COLOR = '#a3488f';

const Header = () => {
    // ESTADO DE SIMULAÇÃO (FUTURO: Virá de um Contexto Global de Autenticação)
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Temporariamente 'true' para testar o dropdown
    const userName = "Tiago"; // Nome de exemplo
    
    const handleLogout = () => {
        // FUTURO: Chamar API de Logout e limpar tokens
        alert('Saindo da conta...');
        setIsLoggedIn(false); // Simulação de logout
    };

    return (
        <header>
            
            {/* Barra de Contato Superior */}
            <div 
                style={{ backgroundColor: HEADER_TOP_COLOR, color: 'white', fontSize: '0.9rem' }}
                className="w-100"
            >
                <Container fluid className="py-2">
                    <div className="d-flex flex-wrap justify-content-between align-items-center">

                        {/* Contatos */}
                        <div className="d-flex flex-wrap gap-4">
                            <span>
                                <FaPhoneAlt className="me-2" />
                                (92) 99459-0890
                            </span>

                            <span>
                                <FaEnvelope className="me-2" />
                                contato@clinicmanager.com.br
                            </span>
                        </div>

                        {/* Horários */}
                        <div className="d-flex align-items-center mt-2 mt-md-0">
                            <FaClock className="me-2" />
                            Seg-Sex: 8h-18h | Sáb: 8h-12h
                            
                            {isLoggedIn && (
                                // O dropdown é colocado em uma div que força a margem E que utiliza o estilo flex:
                                <div className="ms-4 d-flex align-items-center">
                                    <UserDropdown userName={userName} onLogout={handleLogout} />
                                </div>
                            )}
                        </div>

                    </div>
                </Container>
            </div>

            {/* Navbar Principal */}
            <Navbar 
                bg="white" 
                expand="lg" 
                className="py-3 shadow-sm w-100"
            >
                <Container fluid>

                    {/* LOGO */}
                    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                        <img 
                            src={Logo} 
                            alt="ClinicManager Logo" 
                            style={{ 
                                maxHeight: "50px",
                                width: "auto",
                                objectFit: "contain"
                            }} 
                        />
                    </Navbar.Brand>

                    <Navbar.Toggle />

                    <Navbar.Collapse className="justify-content-end">

                        {/* LINKS */}
                        <Nav className="me-3">
                            <Nav.Link as={Link} to="/" className="mx-2" style={{ color: '#333' }}>
                                Início
                            </Nav.Link>

                            <Nav.Link as={Link} to="/sobre-nos" className="mx-2" style={{ color: '#333' }}>
                                Sobre Nós
                            </Nav.Link>
                        </Nav>

                        {/* BOTÃO AGENDAR */}
                        {/* LÓGICA CONDICIONAL: Botão Agendar ou Dropdown de Usuário */}
                        {!isLoggedIn ? (
                                // Usuário NÃO LOGADO: Exibe o botão Agendar Consulta
                                <Link to="/agendamento" className="ms-md-3">
                                    <Button 
                                        style={{ 
                                            backgroundColor: PRIMARY_COLOR, 
                                            border: 'none', 
                                            padding: '8px 25px', 
                                            fontWeight: 'bold',
                                            lineHeight: '1.5'
                                        }}
                                    >
                                        Agendar Consulta
                                    </Button>
                                </Link>
                            ) : (
                                // Usuário LOGADO: Não exibe o botão principal aqui (ficará no topo)
                                null 
                            )}

                    </Navbar.Collapse>

                </Container>
            </Navbar>

        </header>
    );
};

export default Header;