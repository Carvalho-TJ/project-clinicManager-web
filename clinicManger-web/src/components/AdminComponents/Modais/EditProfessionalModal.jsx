import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsClock } from 'react-icons/bs';

const PRIMARY_COLOR = '#8c3d7e';

const initialProfessionalData = {
    id: 1,
    nome: 'Dra. Paula Costa',
    especialidade: 'Odontologia - Clínica Geral',
    registro: 'CRO-AM 12345',
    telefone: '(92) 99111-2222',
    email: 'paula.costa@clinicmanager.com',
    diasAtendimento: ['Terça', 'Sábado'], // Campo novo para dias selecionados
    horarioInicio: '08:00',
    horarioFim: '18:00',
};

const DaySelectionButton = ({ day, isSelected, onClick }) => (
    <Button 
        variant={isSelected ? 'custom-primary' : 'light'}
        onClick={onClick}
        className="fw-bold me-2 mb-2"
        style={{
            backgroundColor: isSelected ? PRIMARY_COLOR : '#e9ecef',
            borderColor: isSelected ? PRIMARY_COLOR : '#e9ecef',
            color: isSelected ? 'white' : 'black',
            fontSize: '0.9rem',
            padding: '0.5rem 1rem'
        }}
    >
        {day}
    </Button>
);

const EditProfessionalModal = ({ show, handleClose, professionalData = initialProfessionalData }) => {

    const [formData, setFormData] = useState(professionalData);
    const [selectedDays, setSelectedDays] = useState(professionalData.diasAtendimento || []);
    
    useEffect(() => {
        setFormData(professionalData);
        setSelectedDays(professionalData.diasAtendimento || []);
    }, [professionalData]);

    const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    const toggleDay = (day) => {
        setSelectedDays(prevDays => 
            prevDays.includes(day)
                ? prevDays.filter(d => d !== day)
                : [...prevDays, day]
        );
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        const key = id.replace('formProf', '').toLowerCase();
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedData = { ...formData, diasAtendimento: selectedDays };
        console.log("Alterações do Profissional salvas:", updatedData);
        // Lógica de envio ao backend (PUT/PATCH)
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered size="lg"> 
            <Modal.Header 
                style={{ backgroundColor: PRIMARY_COLOR, borderBottom: 'none' }} 
                closeButton
            >
                <Modal.Title className="text-white fw-bold">
                    Editar Profissional
                </Modal.Title>
            </Modal.Header>
            
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    {/* Primeira Linha: Nome e Especialidade */}
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="formProfNome">
                                <Form.Label>Nome Completo *</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Nome do profissional" 
                                    required
                                    value={formData.nome || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="formProfEspecialidade">
                                <Form.Label>Especialidade *</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Especialidade" 
                                    required
                                    value={formData.especialidade || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Segunda Linha: CRM/CRO e Telefone */}
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="formProfRegistro">
                                <Form.Label>CRM/CRO *</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Registro" 
                                    required
                                    value={formData.registro || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="formProfTelefone">
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

                    {/* Terceira Linha: Email (Linha Completa) */}
                    <Row>
                        <Col md={12} className="mb-3">
                            <Form.Group controlId="formProfEmail">
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
                    </Row>

                    {/* Quarta Linha: Dias de Atendimento */}
                    <Row className="mb-4">
                        <Col md={12}>
                            <Form.Label>Dias de Atendimento *</Form.Label>
                            <div className="d-flex flex-wrap">
                                {daysOfWeek.map(day => (
                                    <DaySelectionButton
                                        key={day}
                                        day={day}
                                        isSelected={selectedDays.includes(day)}
                                        onClick={() => toggleDay(day)}
                                    />
                                ))}
                            </div>
                        </Col>
                    </Row>

                    {/* Quinta Linha: Horário Início e Fim */}
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="formProfHorarioInicio">
                                <Form.Label>Horário Início *</Form.Label>
                                <div className="input-group">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="08:00" 
                                        required
                                        value={formData.horarioInicio || ''}
                                        onChange={handleChange}
                                    />
                                    <span className="input-group-text bg-white" style={{ borderColor: '#ced4da' }}>
                                        <BsClock color="#6c757d" />
                                    </span>
                                </div>
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="formProfHorarioFim">
                                <Form.Label>Horário Fim *</Form.Label>
                                <div className="input-group">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="18:00" 
                                        required
                                        value={formData.horarioFim || ''}
                                        onChange={handleChange}
                                    />
                                    <span className="input-group-text bg-white" style={{ borderColor: '#ced4da' }}>
                                        <BsClock color="#6c757d" />
                                    </span>
                                </div>
                            </Form.Group>
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

export default EditProfessionalModal;