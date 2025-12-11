import React, { useState, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importação dos componentes
import AdminHeader from '../../components/AdminComponents/AdminHeader';
import DashboardStats from '../../components/AdminComponents/DashboardStats';
import ManagementHeader from '../../components/AdminComponents/ManagementHeader';
import PatientTable from '../../components/AdminComponents/PatientTable';
import ProfessionalTable from '../../components/AdminComponents/ProfessionalTable';
import NewRegistrationModal from '../../components/AdminComponents/Modais/NewRegistrationModal';
import EditPatientModal from '../../components/AdminComponents/Modais/EditPatientModal';
import EditProfessionalModal from '../../components/AdminComponents/Modais/EditProfessionalModal';
import DeleteConfirmationModal from '../../components/AdminComponents/Modais/DeleteConfirmationModal';
import MedicalRecordModal from '../../components/AdminComponents/Modais/MedicalRecordModal';
import NewRecordModal from '../../components/AdminComponents/Modais/NewRecordModal'; // NOVO COMPONENTE


const mockPatientWithoutRecords = {
    records: []
};

const anaSilvaRecords = [
    {
        data: '14/11/2024',
        diagnostico: 'Cárie no dente 16',
        tratamento: 'Restauração em resina composta',
        observacoes: 'Paciente orientado sobre higiene bucal adequada',
        profissional: 'Dra. Paula Costa',
        anexos: [{ nome: 'raio-x-dental.jpg', tamanho: '239.84 KB' }]
    },
];

// Dados de exemplo para simular o filtro (base)
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

// Dados de Pacientes com Prontuários (para o modal de visualização)
const mockPatientsWithRecords = mockPatients.map((patient) => {
    let records = mockPatientWithoutRecords.records; 
    let extraData = { nascimento: null, endereco: null, estado: null };
    
    // Adiciona dados específicos e registros
    if (patient.id === 1) {
        records = anaSilvaRecords;
        extraData = { nascimento: '15/05/1990', endereco: 'Rua das Flores, 123', estado: 'Amazonas' };
    } else if (patient.id === 2) {
        extraData = { nascimento: '01/01/1985', endereco: 'Av. Principal, 45', estado: 'Amazonas' };
    }

    return {
        ...patient,
        ...extraData,
        records: records 
    };
});


const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('patients');
    const [searchTerm, setSearchTerm] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('patient');

    // ESTADOS PARA EDIÇÃO DE PACIENTE
    const [showEditModal, setShowEditModal] = useState(false);
    const [patientToEdit, setPatientToEdit] = useState(null);

    // ESTADOS PARA EDIÇÃO DE PROFISSIONAL
    const [showEditProfModal, setShowEditProfModal] = useState(false);
    const [professionalToEdit, setProfessionalToEdit] = useState(null);

    // ESTADOS PARA EXCLUSÃO
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null); 
    const [entityType, setEntityType] = useState(''); 
    
    // ESTADOS PARA O PRONTUÁRIO
    const [showRecordModal, setShowRecordModal] = useState(false);
    const [patientRecordData, setPatientRecordData] = useState(null);

    // ESTADOS PARA ADICIONAR NOVO REGISTRO
    const [showNewRecordModal, setShowNewRecordModal] = useState(false);
    const [patientForNewRecord, setPatientForNewRecord] = useState(null); // NOVO ESTADO

    // Lógica de filtro
    const filteredPatients = useMemo(() => {
        if (activeTab !== 'patients' || !searchTerm) return mockPatients;
        const lowerCaseSearch = searchTerm.toLowerCase();
        return mockPatients.filter(patient => 
            patient.nome.toLowerCase().includes(lowerCaseSearch) ||
            patient.cpf.includes(lowerCaseSearch) ||
            patient.email.toLowerCase().includes(lowerCaseSearch)
        );
    }, [searchTerm, activeTab]);

    const filteredProfessionals = useMemo(() => {
        if (activeTab !== 'professionals' || !searchTerm) return mockProfessionals;
        const lowerCaseSearch = searchTerm.toLowerCase();
        return mockProfessionals.filter(prof => 
            prof.nome.toLowerCase().includes(lowerCaseSearch) ||
            prof.especialidade.toLowerCase().includes(lowerCaseSearch) ||
            prof.email.toLowerCase().includes(lowerCaseSearch)
        );
    }, [searchTerm, activeTab]);
    
    // FUNÇÃO PARA ABRIR O MODAL DE EDIÇÃO PACIENTE
    const handleEditPatient = (patient) => {
        setPatientToEdit(patient); 
        setShowEditModal(true);     
    };
    
    // FUNÇÃO PARA FECHAR O MODAL DE EDIÇÃO PACIENTE
    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setPatientToEdit(null);
    };

    // FUNÇÃO PARA ABRIR O MODAL DE EDIÇÃO DE PROFISSIONAL
    const handleEditProfessional = (professional) => {
        setProfessionalToEdit(professional);
        setShowEditProfModal(true);
    };
    
    // FUNÇÃO PARA FECHAR O MODAL DE EDIÇÃO DE PROFISSIONAL
    const handleCloseEditProfModal = () => {
        setShowEditProfModal(false);
        setProfessionalToEdit(null); 
    };

    // FUNÇÃO PARA ABRIR O MODAL DE EXCLUSÃO
    const handleDeleteClick = (item, type) => {
        setItemToDelete(item);
        setEntityType(type);
        setShowDeleteModal(true);
    };

    // FUNÇÃO PARA FECHAR O MODAL DE EXCLUSÃO
    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setItemToDelete(null);
        setEntityType('');
    };
    
    // FUNÇÃO PARA CONFIRMAR A EXCLUSÃO
    const handleConfirmDelete = () => {
        if (!itemToDelete) return;

        console.log(`Exclusão confirmada para o(a) ${entityType}: ID ${itemToDelete.id}, Nome: ${itemToDelete.nome}`);
        
        // **AQUI ENTRA A LÓGICA REAL DE EXCLUSÃO (API)**
        
        alert(`O(A) ${entityType} ${itemToDelete.nome} seria excluído(a) do sistema.`);
        
        handleCloseDeleteModal();
    };

    // Função que é chamada ao clicar em "Novo Paciente/Profissional"
    const handleNewAction = () => {
        setModalType(activeTab === 'patients' ? 'patient' : 'professional');
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);

    // FUNÇÕES DE EXCLUSÃO
    const deletePatientHandler = (patient) => handleDeleteClick(patient, 'Paciente');
    const deleteProfessionalHandler = (professional) => handleDeleteClick(professional, 'Profissional');
    
    // FUNÇÃO PARA ABRIR O MODAL DE PRONTUÁRIO
    const handleViewRecord = (patient) => {
        // ATENÇÃO: chamada API aqui:
        const patientDataWithRecords = mockPatientsWithRecords.find(p => p.id === patient.id) || { ...patient, records: [] };
        
        setPatientRecordData(patientDataWithRecords);
        setShowRecordModal(true);
    };

    // FUNÇÃO PARA FECHAR O MODAL DE PRONTUÁRIO
    const handleCloseRecordModal = () => {
        setShowRecordModal(false);
        setPatientRecordData(null); 
    };

    // Ação ao clicar em "Adicionar Novo Registro" dentro do modal (LÓGICA CORRIGIDA)
    const handleNewRecordAction = () => {
        // 1. Fecha o modal de visualização do prontuário
        handleCloseRecordModal(); 

        // 2. Transfere os dados do paciente
        setPatientForNewRecord(patientRecordData);
        
        // 3. Abre o modal de novo registro
        setShowNewRecordModal(true);
    };

    // FUNÇÃO PARA FECHAR O MODAL DE NOVO REGISTRO
    const handleCloseNewRecordModal = () => {
        setShowNewRecordModal(false);
        setPatientForNewRecord(null);
    };


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
                        <PatientTable 
                            patients={filteredPatients}
                            onEditClick={handleEditPatient}
                            onDeleteClick={deletePatientHandler}
                            onViewRecordClick={handleViewRecord}
                        />
                    ) : (
                        <ProfessionalTable
                            professionals={filteredProfessionals}
                            onEditClick={handleEditProfessional}
                            onDeleteClick={deleteProfessionalHandler}
                        />
                    )}
                </div>
            </div>

            {/* 1. MODAL DE NOVO CADASTRO */}
            <NewRegistrationModal
                show={showModal}
                handleClose={handleCloseModal}
                type={modalType}
            />
            
            {/* 2. MODAL DE EDIÇÃO DE PACIENTE */}
            {patientToEdit && (
                <EditPatientModal
                    show={showEditModal}
                    handleClose={handleCloseEditModal}
                    patientData={patientToEdit}
                />
            )}

            {/* 3. MODAL DE EDIÇÃO DE PROFISSIONAL */}
            {professionalToEdit && (
                <EditProfessionalModal
                    show={showEditProfModal}
                    handleClose={handleCloseEditProfModal}
                    professionalData={professionalToEdit}
                />
            )}

            {/* 4. MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
            {itemToDelete && (
                <DeleteConfirmationModal
                    show={showDeleteModal}
                    handleClose={handleCloseDeleteModal}
                    handleConfirm={handleConfirmDelete}
                    entityName={entityType}
                    itemName={itemToDelete.nome}
                />
            )}

            {/* 5. MODAL DE REGISTROS MÉDICOS (PRONTUÁRIO) */}
            {patientRecordData && (
                <MedicalRecordModal
                    show={showRecordModal}
                    handleClose={handleCloseRecordModal}
                    patientData={patientRecordData}
                    onNewRecordClick={handleNewRecordAction}
                />
            )}

            {/* 6. MODAL DE ADICIONAR NOVO REGISTRO (NOVA RENDERIZAÇÃO) */}
            {patientForNewRecord && (
                <NewRecordModal
                    show={showNewRecordModal}
                    handleClose={handleCloseNewRecordModal}
                    patientData={patientForNewRecord}
                />
            )}

        </div>
    );
};

export default AdminPage;