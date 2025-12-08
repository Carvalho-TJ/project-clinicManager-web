import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Maria from '../../assets/maria.png';
import Joao from '../../assets/Joao.png';
import Paula from '../../assets/Paula.png';
import Carlos from '../../assets/Carlos.png';

const PRIMARY_COLOR = '#8c3d7e'; // Roxo principal
const LIGHT_PINK_BG = '#fcf5fa'; // Fundo levemente rosado para a tag

const teamData = [
    { 
        name: 'Dra. Maria Oliveira', 
        specialty: 'Pediatra', 
        description: 'Especialista em saúde infantil com mais de 15 anos de experiência.',
        image: Maria
    },
    { 
        name: 'Dr. João Silva', 
        specialty: 'Cardiologista', 
        description: 'Especialista em saúde cardiovascular e prevenção.',
        image: Joao 
    },
    { 
        name: 'Dra. Paula Costa', 
        specialty: 'Ortodontista', 
        description: 'Especialista em ortodontia e estética dental.',
        image: Paula 
    },
    { 
        name: 'Dr. Carlos Santos', 
        specialty: 'Clínico Geral', 
        description: 'Atendimento completo para toda a família.',
        image: Carlos 
    },
];

const TeamSection = () => {
    return (
        <section className="py-5" style={{ backgroundColor: 'white' }}>
            <Container className="text-center">
                
                {/* Cabeçalho da Seção */}
                <span className="d-inline-block px-3 py-1 rounded-pill fw-bold mb-3" 
                      style={{ backgroundColor: LIGHT_PINK_BG, color: PRIMARY_COLOR, fontSize: '0.9rem' }}>
                    Nossa Equipe
                </span>
                
                <p className="mb-5 mx-auto" style={{ maxWidth: '600px', color: '#6c757d' }}>
                    Profissionais altamente qualificados e dedicados ao seu bem-estar.
                </p>

                {/* Grid dos Profissionais */}
                <Row className="justify-content-center">
                    {teamData.map((member, index) => (
                        <Col lg={3} md={6} xs={12} key={index} className="mb-4">
                            <Card className="h-100 border-0 shadow-sm text-start" style={{ borderRadius: '0.5rem', overflow: 'hidden' }}>
                                
                                {/* Imagem do Profissional */}
                                <div style={{ height: '300px', overflow: 'hidden' }}>
                                    <img 
                                        src={member.image} 
                                        alt={member.name} 
                                        className="w-100 h-100" 
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                
                                <Card.Body className="p-4">
                                    
                                    {/* Nome */}
                                    <h5 className="fw-bold mb-1" style={{ color: PRIMARY_COLOR }}>
                                        {member.name}
                                    </h5>
                                    
                                    {/* Especialidade */}
                                    <p className="fw-bolder mb-2" style={{ color: '#333', fontSize: '1rem' }}>
                                        {member.specialty}
                                    </p>
                                    
                                    {/* Descrição */}
                                    <Card.Text style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                                        {member.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default TeamSection;