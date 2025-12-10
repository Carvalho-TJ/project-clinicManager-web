import React, { useState, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importação dos componentes
import AdminHeader from '../../components/AdminComponents/AdminHeader';
import DashboardStats from '../../components/AdminComponents/DashboardStats';
import ManagementHeader from '../../components/AdminComponents/ManagementHeader';
import PatientTable from '../../components/AdminComponents/PatientTable';
import ProfessionalTable from '../../components/AdminComponents/ProfessionalTable';
import NewRegistrationModal from '../../components/AdminComponents/Modais/NewRegistrationModal';

// Dados de exemplo para simular o filtro
const mockPatients = [
    { id: 1, nome: 'Ana Silva', cpf: '123.456.789-00', telefone: '(92) 99123-4567', email: 'ana@email.com', cidade: 'Parintins/AM', cadastro: '14/01/2024' },
    { id: 2, nome: 'Carlos Souza', cpf: '234.567.890-11', telefone: '(92) 99234-5678', email: 'carlos@email.com', cidade: 'Parintins/AM', cadastro: '19/02/2024' },
    { id: 3, nome: 'Maria Santos', cpf: '345.678.901-22', telefone: '(92) 99345-6789', email: 'maria@email.com', cidade: 'Parintins/AM', cadastro: '09/03/2024' },
];

const mockProfessionals = [
    { id: 1, nome: 'Dra. Paula Costa', especialidade: 'Odontologia - Clínica Geral', registro: 'CRO-AM 12345', telefone: '(92) 99111-2222', email: 'paula.costa@clinicmanager.com', horario: '08:00 - 18:00' },
    { id: 2, nome: 'Dr. Carlos Mendes', especialidade: 'Odontologia - Ortodontia', registro: 'CRO-AM 23456', telefone: '(92) 99222-3333', email: 'carlos.mendes@clinicmanager.com', horario: '09:00 - 17:00' },
    { id: 3, nome: 'Dra. Ana Souza', especialidade: 'Medicina - Clínica Geral', registro: 'CRM-AM 34567', telefone: '(92) 99333-4444', email: 'ana.souza@clinicmanager.com', horario: '08:00 - 14:00' },
];

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('patients');
    const [searchTerm, setSearchTerm] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('patient');
    
    // Lógica de filtro para Pacientes
    const filteredPatients = useMemo(() => {
        if (activeTab !== 'patients' || !searchTerm) return mockPatients;
        const lowerCaseSearch = searchTerm.toLowerCase();
        return mockPatients.filter(patient => 
            patient.nome.toLowerCase().includes(lowerCaseSearch) ||
            patient.cpf.includes(lowerCaseSearch) ||
            patient.email.toLowerCase().includes(lowerCaseSearch)
        );
    }, [searchTerm, activeTab]);

    // Lógica de filtro para Profissionais
    const filteredProfessionals = useMemo(() => {
        if (activeTab !== 'professionals' || !searchTerm) return mockProfessionals;
        const lowerCaseSearch = searchTerm.toLowerCase();
        return mockProfessionals.filter(prof => 
            prof.nome.toLowerCase().includes(lowerCaseSearch) ||
            prof.especialidade.toLowerCase().includes(lowerCaseSearch) ||
            prof.email.toLowerCase().includes(lowerCaseSearch)
        );
    }, [searchTerm, activeTab]);

    // Função que é chamada ao clicar em "Novo Paciente/Profissional"
    const handleNewAction = () => {
        setModalType(activeTab === 'patients' ? 'patient' : 'professional');
        setShowModal(true); // Abre o modal
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <div className="admin-page-container bg-light min-vh-100">
            <AdminHeader />
            
            <div className="container-fluid px-5">
                <DashboardStats />
                
                {/* 3. Área de Gerenciamento */}
                <ManagementHeader 
                    activeTab={activeTab} 
                    onTabChange={setActiveTab} 
                    onNewActionClick={handleNewAction}
                    onSearch={setSearchTerm}
                />

                {/* 4. Renderização Condicional da Tabela */}
                <div className="mt-4">
                    {activeTab === 'patients' ? (
                        <PatientTable patients={filteredPatients} />
                    ) : (
                        <ProfessionalTable professionals={filteredProfessionals} />
                    )}
                </div>
            </div>

            <NewRegistrationModal
                show={showModal}
                handleClose={handleCloseModal}
                type={modalType}
            />

        </div>
    );
};

export default AdminPage;