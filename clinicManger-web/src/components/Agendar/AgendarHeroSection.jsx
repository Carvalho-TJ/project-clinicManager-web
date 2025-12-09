import React from 'react';
import { Container } from 'react-bootstrap';
import { FaRegCalendarAlt } from 'react-icons/fa'; 

const GRADIENT_START = '#8c3d7e'; // Roxo escuro
const GRADIENT_END = '#c678b4'; // Rosa mais claro

const AgendaHeroSection = () => {
  return (
    <section 
      className="py-5 text-center text-white" 
      style={{
        // Fundo com gradiente de cor
        background: `linear-gradient(135deg, ${GRADIENT_START} 0%, ${GRADIENT_END} 100%)`,
        minHeight: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container className="my-4">
        
        {/* Ícone Central em um Círculo */}
        <div 
          className="d-inline-flex justify-content-center align-items-center mb-4"
          style={{
            width: '80px', 
            height: '80px', 
            borderRadius: '50%', 
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            border: '2px solid rgba(255, 255, 255, 0.4)'
          }}
        >
          <FaRegCalendarAlt style={{ fontSize: '2.5rem', color: 'white' }} />
        </div>
        
        {/* Título Principal */}
        <h3 className="mb-3 fw-bold">Agende Sua Consulta</h3>
        
        {/* Descrição */}
        <p className="lead mx-auto" style={{ maxWidth: '600px', fontSize: '1.1rem' }}>
          Agende sua consulta de forma rápida e prática. Escolha o profissional, data e horário que melhor se adequam à sua rotina.
        </p>

      </Container>
    </section>
  );
};

export default AgendaHeroSection;