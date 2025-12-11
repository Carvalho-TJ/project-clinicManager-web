import React, { useState, forwardRef } from 'react'; // Adicionar useState e forwardRef
import { Dropdown } from 'react-bootstrap';
// NÃO PRECISAMOS MAIS DE DropdownContext AQUI
import { FaUser, FaHistory, FaSignOutAlt, FaChevronUp, FaChevronDown } from 'react-icons/fa';

const PRIMARY_COLOR = '#8c3d7e';

// 1. O CustomToggle AGORA RECEBE isMenuOpen
const CustomToggle = forwardRef(({ children, onClick, userName, isMenuOpen }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
        className="d-flex align-items-center text-decoration-none text-white" 
        style={{ cursor: 'pointer', fontSize: '1rem', transition: 'color 0.2s' }}
    >
        <FaUser className="me-2" style={{ color: 'white' }} /> 
        <span className="me-2 d-none d-lg-inline">{userName || 'Usuário'}</span>
        
        {/* LÓGICA CONDICIONAL: Usa o estado 'isMenuOpen' passado como prop */}
        {isMenuOpen ? (
            <FaChevronUp style={{ fontSize: '0.7rem', color: 'white' }} /> 
        ) : (
            <FaChevronDown style={{ fontSize: '0.7rem', color: 'white' }} /> 
        )}
        
        {children}
    </a>
));


const UserDropdown = ({ userName, onLogout }) => {
    
    // 2. Controlar o estado do menu internamente
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // 3. Handler para atualizar o estado quando o dropdown abre/fecha
    const handleToggle = (isOpen, event, metadata) => {
        setIsMenuOpen(isOpen);
    };

    return (
        <Dropdown 
            align="end" 
            className="ms-3"
            show={isMenuOpen} // Controla o Dropdown com o estado interno
            onToggle={handleToggle} // Atualiza o estado interno na abertura/fechamento
        >
            {/* 4. Passa o estado isMenuOpen como prop para o CustomToggle */}
            <Dropdown.Toggle 
                as={CustomToggle} 
                id="dropdown-custom-components" 
                userName={userName}
                isMenuOpen={isMenuOpen} // <<<< CHAVE DA CORREÇÃO
            />

            {/* Menu do Dropdown (inalterado) */}
            <Dropdown.Menu style={{ borderRadius: '0.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                
                {/* Minha Conta */}
                <Dropdown.Item as="button" href="/minha-conta" className="py-2" style={{ color: PRIMARY_COLOR }}>
                    <FaUser className="me-3" /> Minha Conta
                </Dropdown.Item>
                
                {/* Meu Histórico */}
                <Dropdown.Item as="button" href="/meu-historico" className="py-2" style={{ color: PRIMARY_COLOR }}>
                    <FaHistory className="me-3" /> Meu Histórico
                </Dropdown.Item>
                
                <Dropdown.Divider />
                
                {/* Sair */}
                <Dropdown.Item 
                    as="button" 
                    onClick={onLogout} 
                    className="py-2" 
                    style={{ color: PRIMARY_COLOR, fontWeight: 'bold' }}
                >
                    <FaSignOutAlt className="me-3" /> Sair
                </Dropdown.Item>
                
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default UserDropdown;