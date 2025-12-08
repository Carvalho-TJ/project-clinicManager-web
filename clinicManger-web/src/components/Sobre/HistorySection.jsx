import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaUserMd, FaHeart, FaRegSmile, FaMale, FaFemale, FaClock } from 'react-icons/fa';

import TeamImage from '../../assets/team-medicos.jpg';

// Cores baseadas no layout
const PINK_ACCENT = '#ff99cc'; 
const PRIMARY_COLOR = '#8c3d7e'; 
const LIGHT_BG = '#fcf5fa'; 

// Dados das Estatísticas
const statsData = [
    { icon: FaClock, count: '20+', label: 'Anos de Experiência', color: PINK_ACCENT },
    { icon: FaUserMd, count: '33+', label: 'Profissionais Especializados', color: PINK_ACCENT },
    { icon: FaMale, count: '50K+', label: 'Pacientes Atendidos', color: PINK_ACCENT },
    { icon: FaRegSmile, count: '98%', label: 'Satisfação dos Pacientes', color: PINK_ACCENT },
];


const AboutHistorySection = () => {
    return (
        <section className="py-5" style={{ backgroundColor: 'white' }}>
            <Container>
                <Row className="align-items-center">
                    
                    {/* COLUNA ESQUERDA: Imagem da Equipe e Bloco de Destaque */}
                    <Col lg={6} className="mb-4 mb-lg-0">
                        <div style={{ position: 'relative' }}>
                            <Card className="shadow-lg border-0" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
                                <Card.Body className="p-0">
                                    <img 
                                        src={TeamImage} 
                                        alt="Equipe Médica da Clínica" 
                                        className="img-fluid w-100"
                                        style={{ height: '450px', objectFit: 'cover' }} 
                                    />
                                </Card.Body>
                            </Card>

                            {/* Bloco de Destaque Flutuante */}
                            <div style={{
                                position: 'absolute',
                                bottom: '10%',
                                right: '-5%', // Posiciona o bloco sobrepondo a borda
                                backgroundColor: PRIMARY_COLOR,
                                color: 'white',
                                padding: '15px 30px',
                                borderRadius: '0.5rem',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                            }}>
                                <h4 className="fw-bold mb-0">20+</h4>
                                <p className="mb-0" style={{ fontSize: '0.9rem' }}>
                                    Anos servindo a comunidade com excelência em saúde.
                                </p>
                            </div>
                        </div>
                    </Col>
                    
                    {/* COLUNA DIREITA: Texto e Estatísticas */}
                    <Col lg={6} className="ps-lg-5">
                        
                        {/* Tag de Destaque */}
                        <span className="d-inline-block px-3 py-1 rounded-pill fw-bold mb-3" 
                              style={{ backgroundColor: LIGHT_BG, color: PINK_ACCENT, fontSize: '0.9rem' }}>
                            Sobre Nós
                        </span>
                        
                        <h2 className="mb-4 fw-bolder">Compromisso com sua saúde e bem-estar</h2>
                        
                        {/* Parágrafos Descrition */}
                        <p style={{ color: '#555', marginBottom: '1.5rem' }}>
                            Somos uma clínica médica dedicada a fornecer atendimento de saúde de qualidade excepcional. Nossa equipe de profissionais altamente qualificados está comprometida em oferecer cuidados personalizados e compassivos.
                        </p>
                        <p style={{ color: '#555', marginBottom: '2.5rem' }}>
                            Com mais de duas décadas de experiência, investimos continuamente em tecnologia de ponta e no desenvolvimento de nossa equipe para garantir que nossos pacientes recebam o melhor tratamento possível.
                        </p>
                        
                        {/* Estatísticas (Grid 2x2) */}
                        <Row>
                            {statsData.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <Col md={6} xs={12} key={index} className="mb-4 d-flex align-items-start">
                                        <div className="me-3" style={{ color: stat.color, fontSize: '1.5rem' }}>
                                            <Icon />
                                        </div>
                                        <div>
                                            <h4 className="fw-bolder mb-0" style={{ color: stat.color }}>{stat.count}</h4>
                                            <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>{stat.label}</p>
                                        </div>
                                    </Col>
                                );
                            })}
                        </Row>
                        
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default AboutHistorySection;