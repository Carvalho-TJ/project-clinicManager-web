import React, {useState} from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
// Importa os ícones do Font Awesome (necessário que 'react-icons' esteja instalado)
import { 
    FaHeart, FaStethoscope, FaEye, FaBolt, 
    FaBaby, FaBrain, FaDumbbell, FaUserAlt // Usando FaUserAlt para Ginecologia (ícone simples)
} from 'react-icons/fa';

// Mapeia os nomes dos ícones do mock para os componentes reais
const IconMap = {
    FaHeart, FaStethoscope, FaBolt, FaEye, FaBaby, FaBrain, FaDumbbell, FaUserAlt
};

// Dados das especialidades (Mock Data)
const servicesData = [
    { icon: 'FaHeart', title: 'Cardiologia', description: 'Cuidados especializados para a saúde do seu coração com equipamentos modernos de diagnóstico.' },
    { icon: 'FaStethoscope', title: 'Odontologia', description: 'Tratamentos dentários completos para manter seu sorriso saudável e bonito.' },
    { icon: 'FaBolt', title: 'Ortopedia', description: 'Tratamento de lesões e doenças do sistema musculoesquelético.' },
    { icon: 'FaEye', title: 'Oftalmologia', description: 'Cuidados completos para a saúde dos seus olhos com tecnologia de ponta.' },
    { icon: 'FaBaby', title: 'Pediatria', description: 'Atendimento especializado para bebês, crianças e adolescentes.' },
    { icon: 'FaBrain', title: 'Neurologia', description: 'Diagnóstico e tratamento de doenças do sistema nervoso.' },
    { icon: 'FaDumbbell', title: 'Fisioterapia', description: 'Reabilitação e tratamento fisioterapêutico personalizado.' },
    { icon: 'FaUserAlt', title: 'Ginecologia', description: 'Saúde integral da mulher em todas as fases da vida.' },
];

// Cores baseadas no layout (rosa suave e rosa choque)
const PINK_ACCENT = '#ff99cc'; // Rosa para o ícone
const LIGHT_PINK_BG = '#fcf5fa'; // Fundo levemente rosado para a área do ícone
const PRIMARY_COLOR = '#8c3d7e'; // Cor da borda no hover (roxo escuro)

const ServicesSection = () => {
    // Estado para rastrear o índice do card que está sob o mouse
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section className="py-5" style={{ backgroundColor: 'white' }}>
            <Container className="text-center">
                
                {/* Cabeçalho da Seção */}
                <span className="d-inline-block px-3 py-1 rounded-pill fw-bold mb-3" 
                      style={{ backgroundColor: LIGHT_PINK_BG, color: PINK_ACCENT, fontSize: '0.9rem' }}>
                    Nossos Serviços
                </span>
                
                <h2 className="mb-2 fw-bolder">Especialidades Médicas</h2>
                
                <p className="mb-5 mx-auto" style={{ maxWidth: '600px', color: '#6c757d' }}>
                    Oferecemos uma ampla gama de especialidades médicas com profissionais altamente qualificados para cuidar da sua saúde.
                </p>

                {/* Grid dos Cards de Serviço */}
                <Row className="justify-content-center">
                    {servicesData.map((service, index) => {
                        const ServiceIcon = IconMap[service.icon]; // Pega o componente do ícone

                        // Define se o card atual está sob o mouse
                        const isHovered = index === hoveredIndex;

                        // Estilos dinâmicos do Card
                        const cardStyle = {
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            // Estilos do hover
                            transition: 'all 0.3s ease-in-out',
                            transform: isHovered ? 'translateY(-5px) scale(1.01)' : 'translateY(0) scale(1)', // Eleva e escala
                            boxShadow: isHovered ? '0 10px 20px rgba(0, 0, 0, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.1)', // Sombra mais forte
                            borderColor: isHovered ? PRIMARY_COLOR : 'transparent', // Borda colorida
                            borderWidth: isHovered ? '2px' : '1px',
                            borderStyle: 'solid',
                        };

                        return (
                            <Col lg={3} md={6} xs={12} key={index} className="mb-4">
                                <Card 
                                    className="h-100 border-0" 
                                    style={cardStyle}
                                    // Eventos de Mouse
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <Card.Body className="p-4 text-start">
                                        
                                        {/* Área do Ícone (Sem Alteração) */}
                                        <div className="mb-3 d-inline-flex justify-content-center align-items-center"
                                            style={{ 
                                                backgroundColor: LIGHT_PINK_BG, 
                                                borderRadius: '0.5rem', 
                                                width: '50px', 
                                                height: '50px' 
                                            }}>
                                            {ServiceIcon && (
                                                <ServiceIcon style={{ fontSize: '1.5rem', color: PINK_ACCENT }} />
                                            )}
                                        </div>

                                        {/* Título e Descrição (Sem Alteração) */}
                                        <Card.Title className="fw-bold mb-2" style={{ fontSize: '1.1rem' }}>
                                            {service.title}
                                        </Card.Title>
                                        
                                        <Card.Text style={{ fontSize: '0.9rem', color: '#6c757d' }}>
                                            {service.description}
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

export default ServicesSection;