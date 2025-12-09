import React, {useState} from 'react';
import AgendarHeroSection from '../../components/Agendar/AgendarHeroSection';
import AgendarCardSection from '../../components/Agendar/AgendarCardSection';
import AuthModal from '../../components/Auth/AuthModal';

const AgendarPage = () => {
    const [showAuthModal, setShowAuthModal] = useState(false);

    const handleOpenModal = () => setShowAuthModal(true);
    const handleCloseModal = () => setShowAuthModal(false);

    return (
        <>
            {/* Primeira Seção: Header da Agenda */}
            <AgendarHeroSection />
            
            {/* Segunda Seção: Prompt de Login/Cadastro para Iniciar Agendamento */}
            <AgendarCardSection onStartClick={handleOpenModal}/>

            {/* Modal de Autenticação */}
            <AuthModal 
                show={showAuthModal} 
                handleClose={handleCloseModal} 
            />
        </>
    );
};

export default AgendarPage;