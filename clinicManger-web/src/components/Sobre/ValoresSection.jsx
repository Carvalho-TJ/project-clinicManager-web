import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaHeart, FaMedal, FaUsers, FaClock } from 'react-icons/fa'; // Ícones para os valores

// Cores e Estilos consistentes com o tema
const PRIMARY_COLOR = '#8c3d7e'; // Roxo principal
const LIGHT_PINK_BG = '#fcf5fa'; // Fundo levemente rosado
const GRADIENT_START = '#8c3d7e'; // Roxo escuro para o ícone
const GRADIENT_END = '#c678b4'; // Rosa mais claro para o ícone

// Dados dos Valores (Mock Data)
const valuesData = [
    { 
        icon: FaHeart, 
        title: 'Humanização', 
        description: 'Atendimento acolhedor e empático para cada paciente.' 
    },
    { 
        icon: FaMedal, 
        title: 'Excelência', 
        description: 'Compromisso com a qualidade em todos os serviços.' 
    },
    { 
        icon: FaUsers, 
        title: 'Equipe Qualificada', 
        description: 'Profissionais constantemente atualizados.' 
    },
    { 
        icon: FaClock, 
        title: 'Pontualidade', 
        description: 'Respeito ao tempo dos nossos pacientes.' 
    },
];

const ValuesSection = () => {
    return (
        // O fundo da seção é branco puro
        <section className="py-5" style={{ backgroundColor: 'white' }}>
            <Container className="text-center">
                
                {/* Cabeçalho da Seção */}
                <span className="d-inline-block px-3 py-1 rounded-pill fw-bold mb-5" 
                      style={{ backgroundColor: LIGHT_PINK_BG, color: PRIMARY_COLOR, fontSize: '0.9rem' }}>
                    Nossos Valores
                </span>
                
                {/* Grid dos Cards de Valores */}
                <Row className="justify-content-center">
                    {valuesData.map((value, index) => {
                        const ValueIcon = value.icon;
                        return (
                            <Col lg={3} md={6} xs={12} key={index} className="mb-4">
                                <Card className="h-100 border-0 shadow-sm" style={{ 
                                    borderRadius: '1rem', 
                                    backgroundColor: LIGHT_PINK_BG // Cor de fundo do card levemente rosada
                                }}>
                                    <Card.Body className="p-4">
                                        
                                        {/* Área do Ícone (Círculo com Gradiente) */}
                                        <div 
                                          className="d-inline-flex justify-content-center align-items-center mb-3"
                                          style={{
                                            width: '60px', 
                                            height: '60px', 
                                            borderRadius: '50%', 
                                            // Aplica o gradiente roxo/rosa no fundo do ícone
                                            background: `linear-gradient(45deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                                          }}
                                        >
                                          {ValueIcon && (
                                              <ValueIcon style={{ fontSize: '1.8rem', color: 'white' }} />
                                          )}
                                        </div>

                                        {/* Título */}
                                        <Card.Title className="fw-bold mb-2" style={{ color: PRIMARY_COLOR }}>
                                            {value.title}
                                        </Card.Title>
                                        
                                        {/* Descrição */}
                                        <Card.Text style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                                            {value.description}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </section>
    );
};

export default ValuesSection;