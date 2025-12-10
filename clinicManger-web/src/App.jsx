import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // <-- Aqui está o BrowserRouter!

// IMPORTAÇÕES DOS COMPONENTES
import MainLayout from './components/Layout/MainLayout';
import LoginPage from './pages/Auth/LoginPage'; 
import ProtectedRoute from './components/Auth/ProtectedRoute'; 
import AdminDashboard from './pages/AdminPage/AdminDashboard'; 
import ProfessionalAgenda from './pages/Professional/ProfessionalAgenda';
import PatientDashboard from './pages/Patient/PatientDashboard';
import PublicLayout from './components/Layout/PublicLayout';
import HomePage from './pages/HomePage/HomePage';
import SobrePage from './pages/SobrePage/SobrePage';
import AgendarPage from './pages/AgendarPage/AgendarPage';
import ProfessionalLogin from './pages/Professional/ProfessionalLogin';
import ProfessionalDashboard from './pages/Professional/ProfessionalDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas (Sem login necessário) */}
        <Route element={<PublicLayout />}>
             <Route path="/" element={<HomePage />} />
             <Route path="/sobre-nos" element={<SobrePage />} />
             <Route path="/admin/dashboard" element={<AdminDashboard />} />
             <Route path="/PatientDashboard" element={<PatientDashboard />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/prof/login" element={<ProfessionalLogin />} />

        <Route element={<MainLayout />}>
          <Route 
            path="/admin/dashboard" 
            element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/prof/agenda" 
            element={<ProtectedRoute allowedRoles={['professional']}><ProfessionalAgenda /></ProtectedRoute>} 
          />
          <Route 
            path="/patient/dashboard" 
            element={<ProtectedRoute allowedRoles={['patient']}><PatientDashboard /></ProtectedRoute>} 
          />
          {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
          <Route 
            path="/agendar-consulta" 
            element={<ProtectedRoute allowedRoles={['patient']}><AgendarPage /></ProtectedRoute>} 
          />   
          <Route 
            path="/prof/dashboard" 
            element={<ProtectedRoute allowedRoles={['professional']}><ProfessionalDashboard /></ProtectedRoute>} 
          />          
        </Route>    
        <Route path="/" element={<Navigate to="/login" replace />} /> 
        
        <Route path="*" element={<h1>Página Não Encontrada (404)</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;