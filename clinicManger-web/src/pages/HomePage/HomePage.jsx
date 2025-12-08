import React from 'react';
import HeroSection from '../../components/HomePage/HeroSection';
import ServicesSection from '../../components/HomePage/ServicesSection'; // <-- NOVO IMPORT
import DepoimentosSection from '../../components/HomePage/DepoimentosSection';

const HomePage = () => (
    <>
        <HeroSection />
        <ServicesSection />
        <DepoimentosSection />
        
    </>
);
export default HomePage;