import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsHeartPulseFill } from 'react-icons/bs';

const PRIMARY_COLOR = '#8c3d7e';

const AdminHeader = () => {
  return (
    <nav className="navbar navbar-light bg-white border-bottom py-3 mb-4">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          {/* Ícone do Portal */}
          <BsHeartPulseFill style={{ color: PRIMARY_COLOR, fontSize: '2rem', marginRight: '10px' }} />
          
          <div>
            <h1 className="navbar-brand mb-0 h4 fw-bold" style={{ color: '#343a40' }}>
              Portal Administrativo
            </h1>
            <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>
              Gestão de Pacientes - ClinicManager
            </p>
          </div>
        </div>
        
        {/* Indicador de Status/Notificação e Botão Sair */}
        <div className="d-flex align-items-center">
          {/* Exemplo de Notificação (o ponto vermelho na imagem) */}
          <span 
            className="d-inline-block rounded-circle bg-danger me-4" 
            style={{ width: '8px', height: '8px' }}
            title="Notificações Pendentes"
          ></span>
          
          <button 
            className="btn btn-outline-secondary btn-sm"
            onClick={() => console.log('Usuário saiu')}
          >
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;