import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; 
import Footer from './Footer';

const PublicLayout = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      {/* O <main> deve ter flex-grow para empurrar o footer para baixo */}
      <main style={{ flexGrow: 1 }}>
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;