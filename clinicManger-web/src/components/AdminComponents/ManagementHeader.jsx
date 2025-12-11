import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsSearch, BsPlusCircleFill, BsPeopleFill, BsHeartPulse } from 'react-icons/bs'; 

const PRIMARY_COLOR = '#8c3d7e';

const ManagementHeader = ({ activeTab, onTabChange, onNewActionClick, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabClick = (tabName) => {
    onTabChange(tabName);
    setSearchTerm(''); 
    onSearch(''); 
  };
  
  const handleSearchChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term); 
  };

  const activeTabStyle = {
    color: PRIMARY_COLOR, 
    borderBottom: `2px solid ${PRIMARY_COLOR}`,
    fontWeight: 'bold',
  };

  const tabStyle = {
    padding: '0.5rem 0',
    marginRight: '2rem',
    cursor: 'pointer',
    color: '#6c757d', 
    transition: 'color 0.2s',
    display: 'flex',
    alignItems: 'center',
  };
  
  const actionText = activeTab === 'patients' ? 'Novo Paciente' : 'Novo Profissional';
  const placeholderText = activeTab === 'patients' 
    ? 'Buscar por nome, email ou CPF...'
    : 'Buscar por nome, email ou especialidade...';

  return (
    <div className="mt-4">
      {/* Abas de Navegação */}
      <div className="d-flex mb-4">
        {/* Aba Gerenciar Pacientes */}
        <span
          style={activeTab === 'patients' ? activeTabStyle : tabStyle}
          onClick={() => handleTabClick('patients')}
        >
          <BsPeopleFill className="me-2" style={{ color: activeTab === 'patients' ? PRIMARY_COLOR : '#6c757d' }} />
          Gerenciar Pacientes
        </span>
        
        {/* Aba Gerenciar Profissionais */}
        <span
          style={activeTab === 'professionals' ? activeTabStyle : tabStyle}
          onClick={() => handleTabClick('professionals')}
        >
          <BsHeartPulse className="me-2" style={{ color: activeTab === 'professionals' ? PRIMARY_COLOR : '#6c757d' }} /> 
          Gerenciar Profissionais
        </span>
      </div>

      {/* Busca e Botão de Ação */}
      <div className="d-flex align-items-center mb-4">
        <div className="input-group flex-grow-1 me-3">
          <span className="input-group-text bg-white border-end-0" style={{ borderColor: '#ced4da' }}>
            <BsSearch color="#6c757d" />
          </span>
          <input
            type="text"
            className="form-control border-start-0 py-2"
            placeholder={placeholderText}
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ borderColor: '#ced4da' }}
          />
        </div>
        
        <button 
          className="btn text-white py-2 px-4" 
          style={{ backgroundColor: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }} 
          onClick={onNewActionClick}
        >
          <BsPlusCircleFill className="me-2" />
          {actionText}
        </button>
      </div>
    </div>
  );
};

export default ManagementHeader;