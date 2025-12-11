// src/components/MedicalRecordModal.jsx
import React from 'react';
import { Modal, Button, Card, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsCalendar, BsCloudUpload, BsFileEarmarkText } from 'react-icons/bs';

const PRIMARY_COLOR = '#8c3d7e';

// Dados mockados para simular um paciente (Ana Silva) com registros
const mockPatientWithRecords = {
    id: 1,
    nome: 'Ana Silva',
    records: [
        {
            data: '14/11/2024',
            diagnostico: 'Cárie no dente 16',
            tratamento: 'Restauração em resina composta',
            observacoes: 'Paciente orientado sobre higiene bucal adequada',
            profissional: 'Dra. Paula Costa',
            anexos: [{ nome: 'raio-x-dental.jpg', tamanho: '239.84 KB' }]
        },
        {
            data: '19/10/2024',
            diagnostico: 'Limpeza preventiva',
            tratamento: 'Profilaxia dental completa',
            observacoes: 'Próxima limpeza em 6 meses',
            profissional: 'Dra. Paula Costa',
            anexos: []
        },
    ]
};

// Dados mockados para simular um paciente sem registros
const mockPatientWithoutRecords = {
    id: 4,
    nome: 'Carlos Souza',
    records: []
};

// Componente para exibir um registro médico individual
const RecordEntry = ({ label, value, color = 'text-dark' }) => (
    <div className="mb-2">
        <strong className="d-block text-muted" style={{ fontSize: '0.9rem' }}>{label}</strong>
        <span className={color} style={{ fontSize: '1rem' }}>{value}</span>
    </div>
);

// Componente para exibir o card de cada registro médico
const RecordCard = ({ record }) => (
    <Card className="mb-4 shadow-sm border-0">
        <Card.Body>
            <Row className="align-items-start">
                {/* Ícone de Calendário (À direita, conforme a imagem) */}
                <Col xs={1} className="text-end">
                    <BsCalendar color={PRIMARY_COLOR} size={24} />
                </Col>
                
                {/* Conteúdo Principal do Registro */}
                <Col xs={11}>
                    <RecordEntry label="Data" value={record.data} />
                    <RecordEntry label="Diagnóstico" value={record.diagnostico} color={PRIMARY_COLOR} />
                    <RecordEntry label="Tratamento" value={record.tratamento} />
                    <RecordEntry label="Observações" value={record.observacoes} />
                    <RecordEntry label="Profissional" value={record.profissional} />
                    
                    {/* Anexos */}
                    {record.anexos && record.anexos.length > 0 && (
                        <div className="mt-2">
                            <strong className="d-block text-muted" style={{ fontSize: '0.9rem' }}>Anexos</strong>
                            {record.anexos.map((anexo, index) => (
                                <p key={index} className="m-0">
                                    <BsFileEarmarkText className="me-1" color="#6c757d" /> 
                                    <a href="#" className="text-decoration-none text-secondary">
                                        {anexo.nome} ({anexo.tamanho})
                                    </a>
                                </p>
                            ))}
                        </div>
                    )}
                </Col>
            </Row>
        </Card.Body>
    </Card>
);


/**
 * Modal de Registros Médicos (Prontuário).
 */
const MedicalRecordModal = ({ show, handleClose, patientData = mockPatientWithRecords, onNewRecordClick }) => {
    const hasRecords = patientData.records && patientData.records.length > 0;
    const title = `Registros Médicos de ${patientData.nome}`;

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            {/* Cabeçalho */}
            <Modal.Header 
                style={{ backgroundColor: PRIMARY_COLOR, borderBottom: 'none' }} 
                closeButton
            >
                <Modal.Title className="text-white fw-bold">
                    {title}
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto', paddingBottom: '70px' }}>
                {/* Conteúdo: Registros ou Mensagem de Vazio */}
                {hasRecords ? (
                    patientData.records.map((record, index) => (
                        <RecordCard key={index} record={record} />
                    ))
                ) : (
                    <div className="text-center py-5">
                        <p className="lead text-muted">
                            Nenhum registro médico encontrado para este paciente.
                        </p>
                    </div>
                )}
            </Modal.Body>

            {/* Rodapé Fixo com Botão "Adicionar Novo Registro" */}
            <div 
                className="modal-footer fixed-bottom-footer bg-white shadow-lg p-3" 
                style={{ position: 'sticky', bottom: 0, zIndex: 1055, borderTop: 'none' }}
            >
                <Button 
                    type="button" 
                    className="w-100 fw-bold py-3 text-white"
                    style={{ 
                        backgroundColor: PRIMARY_COLOR, 
                        borderColor: PRIMARY_COLOR,
                        backgroundImage: `linear-gradient(to right, ${PRIMARY_COLOR}, #b065a2)` // Simula o gradiente da imagem
                    }}
                    onClick={onNewRecordClick} // Função para abrir o formulário de novo registro
                >
                    <BsCloudUpload className="me-2" />
                    Adicionar Novo Registro
                </Button>
            </div>
        </Modal>
    );
};

export default MedicalRecordModal;