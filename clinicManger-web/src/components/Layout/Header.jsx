import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import Logo from '../../assets/logo.png';

const PRIMARY_COLOR = '#8c3d7e';

const Header = () => {
    return (
        <header>

            {/* -------------------------- */}
            {/* TOP BAR (Contatos)         */}
            {/* -------------------------- */}
            <div 
                style={{ backgroundColor: PRIMARY_COLOR, color: 'white', fontSize: '0.9rem' }}
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
                        <div className="mt-2 mt-md-0">
                            <FaClock className="me-2" />
                            Seg-Sex: 8h-18h | Sáb: 8h-12h
                        </div>

                    </div>
                </Container>
            </div>

            {/* -------------------------- */}
            {/* MAIN NAVBAR                */}
            {/* -------------------------- */}
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
                            alt="logo" 
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
                        <Button
                            as={Link}
                            to="/agendamento"
                            style={{
                                backgroundColor: PRIMARY_COLOR,
                                borderColor: PRIMARY_COLOR,
                                padding: '10px 25px',
                                borderRadius: '2rem',
                                fontWeight: 500
                            }}
                        >
                            Agendar Consulta
                        </Button>

                    </Navbar.Collapse>

                </Container>
            </Navbar>

        </header>
    );
};

export default Header;