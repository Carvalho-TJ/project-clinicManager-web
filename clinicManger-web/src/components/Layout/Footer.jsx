import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// Ícones de Mídias Sociais e Contato
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

// Cores do seu layout
const DARK_BG_COLOR = '#192842'; // Cor de fundo escura do Footer
const PRIMARY_COLOR = '#8c3d7e'; // Para destacar o logo ou links, se necessário

const Footer = () => {
    return (
        <footer style={{ backgroundColor: DARK_BG_COLOR, color: 'white' }} className="pt-5 mt-auto">
            <Container>
                <Row className="mb-4">
                    
                    {/* COLUNA 1: Logo e Mídias Sociais */}
                    <Col lg={3} md={6} className="mb-4">
                        <div className="d-flex align-items-center mb-3">
                            {/* Logo (Referência à imagem) */}
                            {/*  */}
                            <p className="mb-0 fw-bold" style={{ fontSize: '1.2rem', color: 'white' }}>ClinicManager</p>
                        </div>
                        <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                            Cuidando da sua saúde com excelência há mais de 20 anos.
                        </p>
                        
                        <div className="d-flex mt-3">
                            {/* Ícones Sociais */}
                            <a href="#" className="text-white me-3" style={{ fontSize: '1.2rem', color: PRIMARY_COLOR }}>
                                <FaFacebookF />
                            </a>
                            <a href="#" className="text-white me-3" style={{ fontSize: '1.2rem', color: PRIMARY_COLOR }}>
                                <FaInstagram />
                            </a>
                            <a href="#" className="text-white" style={{ fontSize: '1.2rem', color: PRIMARY_COLOR }}>
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </Col>

                    {/* COLUNA 2: Links Rápidos */}
                    <Col lg={3} md={6} className="mb-4">
                        <h5 className="mb-3">Links Rápidos</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/" className="text-white text-decoration-none" style={{ opacity: 0.8 }}>Início</Link></li>
                            <li><Link to="/servicos" className="text-white text-decoration-none" style={{ opacity: 0.8 }}>Serviços</Link></li>
                            <li><Link to="/sobre-nos" className="text-white text-decoration-none" style={{ opacity: 0.8 }}>Sobre Nós</Link></li>
                            <li><Link to="/equipe" className="text-white text-decoration-none" style={{ opacity: 0.8 }}>Equipe</Link></li>
                        </ul>
                    </Col>

                    {/* COLUNA 3: Acessos */}
                    <Col lg={3} md={6} className="mb-4">
                        <h5 className="mb-3">Acessos</h5>
                        <ul className="list-unstyled">
                            {/* Redirecionamento para a página de login com perfis específicos */}
                            <li><Link to="/login" className="text-white text-decoration-none" style={{ opacity: 0.8 }}>Portal do Profissional</Link></li>
                            <li><Link to="/login" className="text-white text-decoration-none" style={{ opacity: 0.8 }}>Portal Administrativo</Link></li>
                        </ul>
                    </Col>

                    {/* COLUNA 4: Contato */}
                    <Col lg={3} md={6} className="mb-4">
                        <h5 className="mb-3">Contato</h5>
                        <ul className="list-unstyled" style={{ fontSize: '0.9rem' }}>
                            <li className="d-flex mb-2">
                                <FaMapMarkerAlt className="me-3" style={{ marginTop: '5px', color: PRIMARY_COLOR }} />
                                <div>
                                    Av. Amazonas, 1000<br/>
                                    Parintins - AM
                                </div>
                            </li>
                            <li className="d-flex mb-2">
                                <FaPhoneAlt className="me-3" style={{ marginTop: '5px', color: PRIMARY_COLOR }} />
                                (92) 99459-0890
                            </li>
                            <li className="d-flex mb-2">
                                <FaEnvelope className="me-3" style={{ marginTop: '5px', color: PRIMARY_COLOR }} />
                                contato@clinicmanager.com.br
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>

            {/* Rodapé de Copyright */}
            <div style={{ backgroundColor: '#142036' }} className="py-3 mt-4">
                <Container className="text-center" style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                    &copy; 2025 ClinicManager. Todos os direitos reservados.
                </Container>
            </div>
        </footer>
    );
};

export default Footer;