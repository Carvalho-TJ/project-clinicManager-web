// src/components/NewRecordModal.jsx
import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col, Card } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsCalendar, BsChevronDown, BsCloudUpload } from 'react-icons/bs';

const PRIMARY_COLOR = '#8c3d7e';

// Componente para a área de upload de arquivos
const FileUploadArea = () => (
    <div 
        className="text-center p-4 mt-2" 
        style={{ border: '2px dashed #ced4da', borderRadius: '0.25rem', cursor: 'pointer' }}
        onClick={() => alert("Simulação: Abrindo seletor de arquivos...")}
    >
        <BsCloudUpload size={24} color="#6c757d" />
        <p className="mb-1 text-muted fw-bold">Clique para selecionar arquivos</p>
        <small className="text-muted">Formatos aceitos: PDF, JPG, PNG, DOC, DOCX (Máx. 10MB por arquivo)</small>
    </div>
);

/**
 * Modal para adicionar um novo registro médico ao prontuário.
 * @param {boolean} show - Se o modal está visível.
 * @param {function} handleClose - Função para fechar o modal.
 * @param {object} patientData - Dados do paciente (deve ter o campo 'nome').
 */
const NewRecordModal = ({ show, handleClose, patientData }) => {
    // Inicialização do estado do formulário (vazio para um novo registro)
    const [formData, setFormData] = useState({
        dataAtendimento: '',
        profissionalResponsavel: '',
        diagnostico: '',
        tratamento: '',
        observacoes: '',
        // files: [] // Para simular o upload
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        // Mapeamento simples de IDs (ex: formRecordDiagnostico -> diagnostico)
        const key = id.replace('formRecord', '');
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Novo Registro Salvo para", patientData.nome, ":", formData);
        // Lógica de envio ao backend (POST)
        handleClose();
        // Resetar o formulário após o envio
        setFormData({
            dataAtendimento: '',
            profissionalResponsavel: '',
            diagnostico: '',
            tratamento: '',
            observacoes: '',
        });
    };

    const patientName = patientData?.nome || 'Paciente';
    const title = `Novo Registro - ${patientName}`;

    return (
        <Modal show={show} onHide={handleClose} centered size="lg"> 
            <Modal.Header 
                style={{ backgroundColor: PRIMARY_COLOR, borderBottom: 'none' }} 
                closeButton
            >
                <Modal.Title className="text-white fw-bold">
                    {title}
                </Modal.Title>
            </Modal.Header>
            
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {/* Linha 1: Data do Atendimento */}
                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group controlId="formRecordDataAtendimento">
                                <Form.Label>Data do Atendimento *</Form.Label>
                                <div className="input-group">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="dd/mm/aaaa" 
                                        required
                                        value={formData.dataAtendimento}
                                        onChange={handleChange}
                                    />
                                    <span className="input-group-text bg-white" style={{ borderColor: '#ced4da' }}>
                                        <BsCalendar color="#6c757d" />
                                    </span>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    {/* Linha 2: Profissional Responsável */}
                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group controlId="formRecordProfissionalResponsavel">
                                <Form.Label>Profissional Responsável *</Form.Label>
                                {/* Simulação de um campo Select com ícone */}
                                <div className="input-group">
                                    <Form.Control 
                                        as="select" 
                                        required
                                        value={formData.profissionalResponsavel}
                                        onChange={handleChange}
                                        style={{ appearance: 'none', paddingRight: '2.5rem' }} // Esconde a seta nativa
                                    >
                                        <option value="">Selecione o profissional...</option>
                                        <option value="Dra. Paula Costa">Dra. Paula Costa</option>
                                        <option value="Dr. Carlos Mendes">Dr. Carlos Mendes</option>
                                    </Form.Control>
                                    <span 
                                        className="input-group-text bg-white" 
                                        style={{ borderColor: '#ced4da', position: 'absolute', right: 0, top: 0, height: '100%', pointerEvents: 'none' }}
                                    >
                                        <BsChevronDown color="#6c757d" />
                                    </span>
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    {/* Linha 3: Diagnóstico */}
                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group controlId="formRecordDiagnostico">
                                <Form.Label>Diagnóstico *</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={3} 
                                    placeholder="Descreva o diagnóstico..." 
                                    required
                                    value={formData.diagnostico}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Linha 4: Tratamento */}
                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group controlId="formRecordTratamento">
                                <Form.Label>Tratamento *</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={3} 
                                    placeholder="Descreva o tratamento realizado..." 
                                    required
                                    value={formData.tratamento}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Linha 5: Observações */}
                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group controlId="formRecordObservacoes">
                                <Form.Label>Observações</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    rows={3} 
                                    placeholder="Observações adicionais..." 
                                    value={formData.observacoes}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Linha 6: Anexar Exames e Documentos */}
                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Label className="d-block mb-1">
                                <BsCloudUpload className="me-1" /> Anexar Exames e Documentos
                            </Form.Label>
                            <FileUploadArea />
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer className="border-top-0 d-flex justify-content-end">
                    {/* Botão Cancelar */}
                    <Button 
                        variant="light" 
                        className="text-dark fw-bold px-4 py-2"
                        onClick={handleClose}
                        style={{ backgroundColor: '#e9ecef', borderColor: '#e9ecef' }}
                    >
                        Cancelar
                    </Button>

                    {/* Botão Salvar Registro (Cor Primária com Gradiente) */}
                    <Button 
                        type="submit" 
                        className="fw-bold px-4 py-2 text-white"
                        style={{ 
                            backgroundColor: PRIMARY_COLOR, 
                            borderColor: PRIMARY_COLOR,
                            backgroundImage: `linear-gradient(to right, ${PRIMARY_COLOR}, #b065a2)` // Simula o gradiente
                        }}
                    >
                        Salvar Registro
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default NewRecordModal;