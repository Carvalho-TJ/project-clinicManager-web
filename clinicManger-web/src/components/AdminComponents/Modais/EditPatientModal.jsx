// src/components/EditPatientModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsCalendar } from 'react-icons/bs';

// Cor primária do projeto
const PRIMARY_COLOR = '#8c3d7e';

// Dados iniciais de exemplo para demonstração (geralmente viriam via props)
const initialPatientData = {
    nome: 'Ana Silva',
    cpf: '123.456.789-00',
    email: 'ana@email.com',
    telefone: '(92) 99123-4567',
    nascimento: '15/05/1990',
    endereco: 'Rua das Flores, 123',
    cidade: 'Parintins',
    estado: 'Amazonas'
};


const EditPatientModal = ({ show, handleClose, patientData = initialPatientData }) => {
    // Estado para gerenciar os dados do formulário
    const [formData, setFormData] = useState(patientData);

    // Efeito para garantir que, se os dados externos mudarem, o estado interno seja atualizado
    useEffect(() => {
        setFormData(patientData);
    }, [patientData]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id.replace('form', '').toLowerCase()]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Alterações salvas:", formData);
        // Adicione aqui a lógica para enviar os dados atualizados ao backend (PUT/PATCH)
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <Modal.Header 
                style={{ backgroundColor: PRIMARY_COLOR, borderBottom: 'none' }} 
                closeButton
            >
                <Modal.Title className="text-white fw-bold">
                    Editar Paciente
                </Modal.Title>
            </Modal.Header>
            
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {/* Linhas de Campos do Formulário (Layout de duas colunas) */}
                    
                    {/* Primeira Linha: Nome e CPF */}
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="formNome">
                                <Form.Label>Nome Completo *</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Nome do paciente" 
                                    required
                                    value={formData.nome || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="formCpf">
                                <Form.Label>CPF *</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="000.000.000-00" 
                                    required 
                                    value={formData.cpf || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Segunda Linha: Email e Telefone */}
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email *</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="email@exemplo.com" 
                                    required 
                                    value={formData.email || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="formTelefone">
                                <Form.Label>Telefone *</Form.Label>
                                <Form.Control 
                                    type="tel" 
                                    placeholder="(00) 00000-0000" 
                                    required 
                                    value={formData.telefone || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Terceira Linha: Data de Nascimento e Endereço */}
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="formNascimento">
                                <Form.Label>Data de Nascimento *</Form.Label>
                                <div className="input-group">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="dd/mm/aaaa" 
                                        required 
                                        value={formData.nascimento || ''}
                                        onChange={handleChange}
                                    />
                                    <span className="input-group-text bg-white" style={{ borderColor: '#ced4da' }}>
                                        <BsCalendar color="#6c757d" />
                                    </span>
                                </div>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="formEndereco">
                                <Form.Label>Endereço</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Rua, número, complemento"
                                    value={formData.endereco || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Quarta Linha: Cidade e Estado */}
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="formCidade">
                                <Form.Label>Cidade</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    value={formData.cidade || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="formEstado">
                                <Form.Label>Estado</Form.Label>
                                <Form.Select 
                                    value={formData.estado || 'Amazonas'}
                                    onChange={handleChange}
                                >
                                    <option>Amazonas</option>
                                    <option>Pará</option>
                                    {/* ... outros estados */}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    
                </Modal.Body>
                <Modal.Footer className="border-top-0 d-flex justify-content-end">
                    {/* Botão Cancelar (Cinza Claro) */}
                    <Button 
                        variant="light" 
                        className="text-dark fw-bold px-4 py-2"
                        onClick={handleClose}
                        style={{ backgroundColor: '#e9ecef', borderColor: '#e9ecef' }}
                    >
                        Cancelar
                    </Button>

                    {/* Botão Salvar Alterações (Cor Primária) */}
                    <Button 
                        type="submit" 
                        className="fw-bold px-4 py-2 text-white"
                        style={{ backgroundColor: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}
                    >
                        Salvar Alterações
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default EditPatientModal;