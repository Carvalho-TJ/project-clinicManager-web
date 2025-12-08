import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
// Importa o ícone de estrela para o rating
import { FaStar } from 'react-icons/fa'; 

// Dados dos depoimentos (Mock Data)
const testimonialsData = [
    { 
        review: "Excelente atendimento! Os médicos são muito atenciosos e a estrutura da clínica é impecável. Recomendo!", 
        author: "Paulo Rodrigues", 
        role: "Paciente", 
        rating: 5 
    },
    { 
        review: "Fui muito bem atendida desde a recepção até a consulta. Profissionais competentes e ambiente acolhedor.", 
        author: "Marina Costa", 
        role: "Paciente", 
        rating: 5 
    },
    { 
        review: "A melhor clínica da região! Atendimento rápido, equipe qualificada e tecnologia de ponta.", 
        author: "Roberto Lima", 
        role: "Paciente", 
        rating: 5 
    },
];

// Cores baseadas no layout (rosa suave e rosa choque)
const PINK_ACCENT = '#ff99cc'; // Cor das estrelas e tag de título
const LIGHT_BG = '#fcf5fa'; // Cor de fundo levemente rosada da seção

// Componente auxiliar para renderizar as estrelas
const RatingStars = ({ count }) => {
    return (
        <div className="mb-3">
            {[...Array(count)].map((_, i) => (
                <FaStar key={i} style={{ color: PINK_ACCENT, fontSize: '1.2rem' }} className="me-1" />
            ))}
        </div>
    );
};

const TestimonialsSection = () => {
    return (
        // Fundo da seção deve ser levemente rosado como na imagem
        <section className="py-5" style={{ backgroundColor: LIGHT_BG }}>
            <Container className="text-center">
                
                {/* Cabeçalho da Seção */}
                <span className="d-inline-block px-3 py-1 rounded-pill fw-bold mb-3" 
                      style={{ backgroundColor: 'white', color: PINK_ACCENT, border: `1px solid ${PINK_ACCENT}`, fontSize: '0.9rem' }}>
                    Depoimentos
                </span>
                
                <h2 className="mb-2 fw-bolder">O que nossos pacientes dizem</h2>
                
                <p className="mb-5 mx-auto" style={{ maxWidth: '600px', color: '#6c757d' }}>
                    A satisfação dos nossos pacientes é nossa maior conquista.
                </p>

                {/* Grid dos Depoimentos */}
                <Row className="justify-content-center">
                    {testimonialsData.map((testimonial, index) => (
                        <Col lg={4} md={6} xs={12} key={index} className="mb-4">
                            <Card className="h-100 border-0 shadow-sm" style={{ borderRadius: '0.5rem' }}>
                                <Card.Body className="p-4 text-start">
                                    
                                    {/* Estrelas de Avaliação */}
                                    <RatingStars count={testimonial.rating} />

                                    {/* Depoimento */}
                                    <p className="mb-4" style={{ fontStyle: 'italic', color: '#333' }}>
                                        "{testimonial.review}"
                                    </p>
                                    
                                    <hr /> {/* Linha divisória como na imagem */}
                                    
                                    {/* Autor */}
                                    <h5 className="fw-bold mb-0">{testimonial.author}</h5>
                                    <p className="text-muted" style={{ fontSize: '0.9rem' }}>{testimonial.role}</p>

                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default TestimonialsSection;