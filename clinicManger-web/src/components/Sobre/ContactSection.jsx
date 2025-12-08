import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

// Cores e Estilos consistentes (usaremos o roxo principal para títulos)
const PRIMARY_COLOR = '#8c3d7e'; // Roxo principal
const LIGHT_BG = '#fcf5fa'; // Fundo levemente rosado para a seção

// Dados (Extraídos do footer.png e layouts)
const contactData = {
    address: {
        title: 'Endereço',
        line1: 'Av. Amazonas, 1000',
        line2: 'Parintins - AM'
    },
    contact: {
        title: 'Contato',
        phone: '(92) 99459-0890',
        email: 'contato@clinicmanager.com.br'
    },
    hours: {
        title: 'Horário de Funcionamento',
        weekday: 'Segunda a Sexta: 8h às 18h',
        saturday: 'Sábado: 8h às 12h'
    }
};

const LocationContactSection = () => {
    return (
        // Fundo da seção deve ser levemente rosado
        <section className="py-5" style={{ backgroundColor: LIGHT_BG }}>
            <Container className="text-center">
                
                {/* Título da Seção */}
                <h3 className="fw-bolder mb-5" style={{ color: PRIMARY_COLOR }}>
                    Nossa Localização
                </h3>

                {/* Card Central com Informações */}
                <Row className="justify-content-center">
                    <Col lg={7} md={9} sm={12}>
                        <Card className="shadow-lg border-0 text-start" style={{ borderRadius: '1rem', padding: '30px' }}>
                            <Card.Body>
                                <Row>
                                    
                                    {/* Coluna Esquerda: Endereço e Horário */}
                                    <Col md={6} className="mb-4 mb-md-0">
                                        
                                        {/* Endereço */}
                                        <h5 className="fw-bold mb-2" style={{ color: PRIMARY_COLOR }}>{contactData.address.title}</h5>
                                        <p className="mb-1">{contactData.address.line1}</p>
                                        <p className="mb-4">{contactData.address.line2}</p>
                                        
                                        {/* Horário */}
                                        <h5 className="fw-bold mb-2" style={{ color: PRIMARY_COLOR }}>{contactData.hours.title}</h5>
                                        <p className="mb-1">{contactData.hours.weekday}</p>
                                        <p className="mb-0">{contactData.hours.saturday}</p>

                                    </Col>
                                    
                                    {/* Coluna Direita: Contato */}
                                    <Col md={6}>
                                        
                                        {/* Contato */}
                                        <h5 className="fw-bold mb-2" style={{ color: PRIMARY_COLOR }}>{contactData.contact.title}</h5>
                                        <p className="mb-1">{contactData.contact.phone}</p>
                                        <p className="mb-4" style={{ wordBreak: 'break-all' }}>{contactData.contact.email}</p>
                                        
                                        {/* Você pode adicionar um mapa aqui, se desejar */}
                                        {/* <div style={{ height: '150px', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            [Placeholder do Google Maps]
                                        </div> */}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default LocationContactSection;