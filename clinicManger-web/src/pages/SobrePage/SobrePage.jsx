import React from 'react';
import SobreSection from '../../components/Sobre/SobreSection';
import HistorySection from '../../components/Sobre/HistorySection';
import ValoresSection from '../../components/Sobre/ValoresSection';
import TeamSection from '../../components/Sobre/TeamSection';
import ContactSection from '../../components/Sobre/ContactSection';

const AboutPage = () => {
  return (
    <>
      {/* Primeira Seção: Intro */}
      <SobreSection />
      
      {/* Segunda Seção: História, Equipe e Estatísticas */}
      <HistorySection />
      
      {/* Terceira Seção: Nossos Valores */}
      <ValoresSection />

      {/* Quarta Seção: Nossa Equipe */}
      <TeamSection />

      {/* Quinta Seção: Localização e Contato */}
      <ContactSection />
    </>
  );
};

export default AboutPage;