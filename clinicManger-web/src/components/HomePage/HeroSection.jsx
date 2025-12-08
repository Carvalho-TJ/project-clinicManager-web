import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart, FaCertificate, FaArrowRight, FaStethoscope, FaUserMd } from 'react-icons/fa';

import ClinicaFachada from '../../assets/clinica.jpg'

// Cores baseadas no layout
const PRIMARY_COLOR = '#8c3d7e';
const LIGHT_BG = '#fcf5fa'; // Fundo levemente rosado
const BUTTON_OUTLINE_COLOR = '#8c3d7e'; 
const CERT_GREEN = '#28a745'; // Verde para o certificado

const HeroSection = () => {
    
    // Dados para os cards de estatísticas
    const stats = [
        { count: '20+', label: 'Anos de experiência', icon: <FaArrowRight /> },
        { count: '15+', label: 'Especialidades', icon: <FaStethoscope /> },
        { count: '50k+', label: 'Pacientes atendidos', icon: <FaArrowRight /> },
    ];
    
    return (
        <section style={{ backgroundColor: LIGHT_BG, paddingTop: '5rem', paddingBottom: '5rem' }}>
            <Container>
                <Row className="align-items-center">
                    
                    {/* COLUNA ESQUERDA: Texto, CTAs e Estatísticas */}
                    <Col lg={6} className="pe-lg-5 mb-5 mb-lg-0">
                        
                        {/* Tag de Destaque */}
                        <p className="text-uppercase fw-bold mb-3" style={{ color: PRIMARY_COLOR, fontSize: '0.9rem' }}>
                            <FaHeart className="me-2" style={{ color: '#ff69b4' }} />
                            Atendimento de Excelência em Parintins-AM
                        </p>
                        
                        {/* Título e Slogan */}
                        <h1 className="display-4 fw-bolder mb-3" style={{ color: '#333' }}>
                            Cuidando da sua saúde com profissionalismo e carinho
                        </h1>
                        
                        {/* Descrição */}
                        <p className="lead mb-4" style={{ fontSize: '1.1rem', color: '#555' }}>
                            Há mais de 20 anos oferecendo serviços médicos e odontológicos de qualidade para toda a família. Agende sua consulta e conte com uma equipe especializada.
                        </p>
                        
                        {/* Botões CTA (Call to Action) */}
                        <div className="d-flex mb-5">
                            <Button 
                                as={Link} 
                                to="/agendamento" 
                                style={{ 
                                    backgroundColor: PRIMARY_COLOR, 
                                    borderColor: PRIMARY_COLOR, 
                                    padding: '12px 30px', 
                                    borderRadius: '0.5rem', 
                                    marginRight: '1rem'
                                }}
                                className="fw-bold"
                            >
                                Agendar Consulta
                            </Button>
                            
                            <Button 
                                as={Link} 
                                to="/servicos" 
                                variant="outline"
                                style={{
                                    borderColor: BUTTON_OUTLINE_COLOR,
                                    color: BUTTON_OUTLINE_COLOR,
                                    padding: '12px 30px',
                                    borderRadius: '0.5rem',
                                    backgroundColor: 'transparent'
                                }}
                                className="fw-bold"
                            >
                                Nossos Serviços
                            </Button>
                        </div>
                        
                        {/* Estatísticas (Linha de Cards Inferior) */}
                        <Row className="mt-4 pt-4 border-top">
                            {stats.map((stat, index) => (
                                <Col key={index} xs={4} className="text-center">
                                    <p style={{ color: PRIMARY_COLOR, fontSize: '1.5rem', marginBottom: '0.3rem' }}>
                                        {stat.icon}
                                    </p>
                                    <h4 className="fw-bolder mb-0" style={{ color: PRIMARY_COLOR }}>{stat.count}</h4>
                                    <p className="text-muted" style={{ fontSize: '0.9rem' }}>{stat.label}</p>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                    
                    {/* COLUNA DIREITA: Imagem da Clínica com Certificado */}
                    <Col lg={6}>
                        <div style={{ position: 'relative' }}>
                            {/* Card para simular a imagem arredondada (Você substituiria por uma tag <img> real) */}
                            <Card className="shadow-lg border-0" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
                                <Card.Body className="p-0">
                                    {/* Placeholder da Imagem da Clínica */}
                                    <img 
                                        src={ClinicaFachada} 
                                        alt="Fachada da Clinica"
                                        className="img-fluid w-100"
                                        style={{ height: '450px', objectFit: 'cover' }}
                                    />
                                </Card.Body>
                            </Card>
                            
                            {/* Badge de Certificação (Posicionado sobre a imagem) */}
                            <div style={{
                                position: 'absolute',
                                bottom: '5%',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                backgroundColor: 'white',
                                padding: '10px 20px',
                                borderRadius: '0.5rem',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                            }}>
                                <h6 className="mb-0 fw-bold" style={{ color: CERT_GREEN }}>
                                    <FaCertificate className="me-2" style={{ color: CERT_GREEN }} />
                                    Atendimento de Qualidade
                                </h6>
                                <p className="mb-0" style={{ fontSize: '0.8rem', color: '#666' }}>
                                    Certificado pelo CFM
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default HeroSection;