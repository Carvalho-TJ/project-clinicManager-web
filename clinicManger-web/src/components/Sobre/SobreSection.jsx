import React from 'react';
import { Container } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa'; 


const GRADIENT_START = '#8c3d7e'; // Roxo escuro
const GRADIENT_END = '#c678b4'; // Rosa mais claro

const AboutHeroSection = () => {
  return (
    <section 
      className="py-5 text-center text-white" 
      style={{
        // Fundo com gradiente de cor
        background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
        minHeight: '400px', // Altura mínima para visualização
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container className="my-5">
        
        {/* Ícone Central em um Círculo */}
        <div 
          className="d-inline-flex justify-content-center align-items-center mb-4"
          style={{
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Círculo semitransparente
            border: '2px solid rgba(255, 255, 255, 0.4)'
          }}
        >
          <FaHeart style={{ fontSize: '2.5rem', color: 'white' }} />
        </div>
        
        {/* Título Principal */}
        <h3 className="mb-3 fw-bold">Sobre o ClinicManager</h3>
        
        {/* Descrição/Missão */}
        <p className="lead mx-auto" style={{ maxWidth: '800px', fontSize: '1.2rem' }}>
          Há mais de 20 anos cuidando da saúde da comunidade de Parintins-AM com excelência, dedicação e tecnologia de ponta. Nossa missão é oferecer um atendimento humanizado e completo.
        </p>

      </Container>
    </section>
  );
};

export default AboutHeroSection;