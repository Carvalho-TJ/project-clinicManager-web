// components/ProtectedButton.js
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import AuthModal from './AuthModal';
import { useAuth } from '../contexts/AuthContext';

const ProtectedButton = ({ 
    children, 
    redirectTo = '/agendar-consulta',
    variant = 'primary',
    style = {},
    className = '',
    ...props 
}) => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const { isAuthenticated } = useAuth();
    
    const handleClick = () => {
        if (!isAuthenticated) {
            // Se não está autenticado, salva onde quer ir e abre o modal
            localStorage.setItem('redirectAfterLogin', redirectTo);
            setShowAuthModal(true);
        } else {
            // Se já está autenticado, vai direto para o destino
            window.location.href = redirectTo;
        }
    };
    
    return (
        <>
            <AuthModal 
                show={showAuthModal} 
                handleClose={() => setShowAuthModal(false)} 
            />
            
            <Button 
                onClick={handleClick}
                variant={variant}
                style={style}
                className={className}
                {...props}
            >
                {children}
            </Button>
        </>
    );
};

export default ProtectedButton;