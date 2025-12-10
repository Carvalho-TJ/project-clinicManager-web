import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const StatisticCard = ({ title, value, icon, iconBgColor, iconColor }) => {
  return (
    <div className="col-12 col-md-4 mb-4">
      <div className="card h-100 p-3 shadow-sm border-0">
        <div className="card-body d-flex align-items-center justify-content-between">
          <div>
            <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>{title}</p>
            <h3 className="fw-bold mb-0">{value}</h3>
          </div>
          <div 
            className="p-3 rounded-circle" 
            style={{ 
              backgroundColor: iconBgColor, 
              color: iconColor, 
              fontSize: '1.5rem',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticCard;