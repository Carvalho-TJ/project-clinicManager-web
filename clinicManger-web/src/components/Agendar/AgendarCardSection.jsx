import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaCalendarAlt, FaChevronRight } from 'react-icons/fa'; // Ícone de calendário e seta

// Cores baseadas no layout
const PRIMARY_COLOR = '#8c3d7e';
const GRADIENT_START = '#8c3d7e';
const GRADIENT_END = '#c678b4';
const LIGHT_PINK_BG = '#fcf5fa';

const AgendarCardSection = ({ onStartClick }) => {

    return (
        <section className="py-5" style={{ backgroundColor: 'white' }}>
            <Container className="text-center">
                
                {/* Tag de Destaque */}
                <span className="d-inline-block px-3 py-1 rounded-pill fw-bold mb-3" 
                      style={{ backgroundColor: LIGHT_PINK_BG, color: PRIMARY_COLOR, fontSize: '0.9rem' }}>
                    Agendamento Online
                </span>
                
                <h3 className="fw-bolder mb-3" style={{ color: '#333' }}>Agende Sua Consulta</h3>
                
                <p className="text-muted mx-auto mb-5" style={{ maxWidth: '600px' }}>
                    Escolha o tipo de atendimento, o profissional e o horário que melhor se encaixam na sua rotina.
                </p>

                {/* Card de Ação Central */}
                <Row className="justify-content-center">
                    <Col lg={5} md={8} sm={10}>
                        <Card className="shadow-lg border-0" style={{ borderRadius: '1rem', padding: '30px 0' }}>
                            <Card.Body>
                                
                                {/* Ícone Central (Grande) */}
                                <div 
                                  className="d-inline-flex justify-content-center align-items-center mb-4"
                                  style={{
                                    width: '90px', 
                                    height: '90px', 
                                    borderRadius: '50%', 
                                    // Gradiente do ícone
                                    background: `linear-gradient(45deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                  }}
                                >
                                  <FaCalendarAlt style={{ fontSize: '2.5rem', color: 'white' }} />
                                </div>

                                <Card.Title className="fw-bolder mb-2" style={{ color: PRIMARY_COLOR }}>
                                    Pronto para agendar sua consulta?
                                </Card.Title>
                                
                                <Card.Text className="text-muted mb-4">
                                    Faça login ou cadastre-se para continuar.
                                </Card.Text>

                                {/* Botão de Iniciar Agendamento */}
                                <Button 
                                    onClick={onStartClick}
                                    style={{ 
                                        // Gradiente do botão
                                        background: `linear-gradient(to right, ${GRADIENT_START}, ${GRADIENT_END})`,
                                        border: 'none', 
                                        padding: '12px 30px', 
                                        fontWeight: 'bold',
                                        borderRadius: '0.5rem'
                                    }}
                                >
                                    Iniciar Agendamento <FaChevronRight className="ms-2" />
                                </Button>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                
            </Container>
        </section>
    );
};

export default AgendarCardSection;