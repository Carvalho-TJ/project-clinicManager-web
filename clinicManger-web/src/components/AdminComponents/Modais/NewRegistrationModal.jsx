import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsCalendar, BsClock } from 'react-icons/bs';

const PRIMARY_COLOR = '#8c3d7e';

const PatientForm = () => (
  <>
    <Row>
        <h6 className="fw-bold mb-3" style={{ color: PRIMARY_COLOR }}>Dados Pessoais</h6>
        <Col md={12}>
            <Form.Group className="mb-3" controlId="formRegisterName">
                <Form.Label>Nome Completo *</Form.Label>
                <Form.Control type="text" name="nome" placeholder="João Silva" required />
            </Form.Group>
        </Col>

        <Col md={6}>
            <Form.Group className="mb-3" controlId="formRegisterCPF">
                <Form.Label>CPF *</Form.Label>
                <Form.Control type="text" name="cpf" placeholder="000.000.000-00" required />
            </Form.Group>
        </Col>

        <Col md={6}>
            <Form.Group className="mb-3" controlId="formRegisterBirthDate">
                <Form.Label>Data de Nascimento *</Form.Label>
                <Form.Control type="date" name="dataNascimento" required />
            </Form.Group>
        </Col>

        <Col md={12}>
            <Form.Group className="mb-4" controlId="formRegisterMaritalStatus">
                <Form.Label>Estado Civil *</Form.Label>
                <Form.Select name="estadoCivil" required>
                    <option value="">Selecione</option>
                    <option value="Solteiro(a)">Solteiro(a)</option>
                    <option value="Casado(a)">Casado(a)</option>
                    <option value="Divorciado(a)">Divorciado(a)</option>
                    <option value="Viúvo(a)">Viúvo(a)</option>
                </Form.Select>
            </Form.Group>
        </Col>
        
        <Col md={6}>
            <Form.Group className="mb-3" controlId="formRegisterEmail">
                <Form.Label>Email *</Form.Label>
                <Form.Control type="email" name="email" placeholder="seu@email.com" required />
            </Form.Group>
        </Col>

        <Col md={6}>
            <Form.Group className="mb-3" controlId="formRegisterPhone">
                <Form.Label>Telefone *</Form.Label>
                <Form.Control type="tel" name="telefone" placeholder="(92) 99999-9999" required />
            </Form.Group>
        </Col>
    </Row>

    <h6 className="fw-bold mb-3" style={{ color: PRIMARY_COLOR }}>Endereço</h6>
    <Row>
        <Col md={8}>
            <Form.Group className="mb-3" controlId="formRegisterStreet">
                <Form.Label>Rua *</Form.Label>
                <Form.Control type="text" name="rua" placeholder="Av. Amazonas" required />
            </Form.Group>
        </Col>

        <Col md={6}>
            <Form.Group className="mb-3" controlId="formRegisterDistrict">
                <Form.Label>Bairro *</Form.Label>
                <Form.Control type="text" name="bairro" placeholder="Centro" required />
            </Form.Group>
        </Col>
        
        <Col md={4}>
            <Form.Group className="mb-3" controlId="formRegisterNumber">
                <Form.Label>Número *</Form.Label>
                <Form.Control type="text" name="numero" placeholder="123" required />
            </Form.Group>
        </Col>

        <Col md={4}>
            <Form.Group className="mb-4" controlId="formRegisterCEP">
                <Form.Label>CEP *</Form.Label>
                <Form.Control type="text" name="cep" placeholder="69000-000" required />
            </Form.Group>
        </Col>
        
        <Col md={5}>
            <Form.Group className="mb-3" controlId="formRegisterCity">
                <Form.Label>Cidade *</Form.Label>
                <Form.Control type="text" name="cidade" placeholder="Parintins" required />
            </Form.Group>
        </Col>
        
        <Col md={3}>
            <Form.Group className="mb-3" controlId="formRegisterState">
                <Form.Label>Estado *</Form.Label>
                <Form.Select name="estado" required>
                    <option value="AM">AM</option>
                    <option value="AC">AC</option>
                    <option value="AL">AL</option>
                    {/* Adicionar outros estados (Verificar API para estado e cidades) */}
                </Form.Select>
            </Form.Group>
        </Col>
    </Row>

    <h6 className="fw-bold mb-3" style={{ color: PRIMARY_COLOR }}>Senha</h6>
    <Row className="mb-4">
        <Col md={6}>
            <Form.Group controlId="formRegisterPassword">
                <Form.Label>Senha *</Form.Label>
                <Form.Control type="password" name="senha" placeholder="********" required />
            </Form.Group>
        </Col>
        
        <Col md={6}>
            <Form.Group controlId="formRegisterConfirmPassword">
                <Form.Label>Confirmar Senha *</Form.Label>
                <Form.Control type="password" name="confirmarSenha" placeholder="********" required />
            </Form.Group>
        </Col>
    </Row>
  </>
);

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

const ProfessionalForm = () => {
    // Estado mockado para simular a seleção de dias (Terça e Sábado selecionados na imagem)
    const [selectedDays, setSelectedDays] = useState(['Terça', 'Sábado']);
    const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    const toggleDay = (day) => {
        setSelectedDays(prevDays => 
            prevDays.includes(day)
                ? prevDays.filter(d => d !== day)
                : [...prevDays, day]
        );
    };

    return (
        <>
            <Row>
                <Col md={6} className="mb-3">
                    <Form.Group controlId="formProfNome">
                        <Form.Label>Nome Completo *</Form.Label>
                        <Form.Control type="text" placeholder="Dra. Paula Costa" required />
                    </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                    <Form.Group controlId="formProfEspecialidade">
                        <Form.Label>Especialidade *</Form.Label>
                        <Form.Control type="text" placeholder="Odontologia - Clínica Geral" required />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6} className="mb-3">
                    <Form.Group controlId="formProfRegistro">
                        <Form.Label>CRM/CRO *</Form.Label>
                        <Form.Control type="text" placeholder="CRO-AM 12345" required />
                    </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                    <Form.Group controlId="formProfTelefone">
                        <Form.Label>Telefone *</Form.Label>
                        <Form.Control type="tel" placeholder="(00) 00000-0000" required />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={12} className="mb-3">
                    <Form.Group controlId="formProfEmail">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control type="email" placeholder="paula.costa@clinicmanager.com" required />
                    </Form.Group>
                </Col>
            </Row>

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

            <Row>
                <Col md={6} className="mb-3">
                    <Form.Group controlId="formHorarioInicio">
                        <Form.Label>Horário Início *</Form.Label>
                        <div className="input-group">
                            <Form.Control type="text" placeholder="08:00" required />
                            <span className="input-group-text bg-white" style={{ borderColor: '#ced4da' }}>
                                <BsClock color="#6c757d" />
                            </span>
                        </div>
                    </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                    <Form.Group controlId="formHorarioFim">
                        <Form.Label>Horário Fim *</Form.Label>
                        <div className="input-group">
                            <Form.Control type="text" placeholder="18:00" required />
                            <span className="input-group-text bg-white" style={{ borderColor: '#ced4da' }}>
                                <BsClock color="#6c757d" />
                            </span>
                        </div>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={6}>
                    <Form.Group controlId="formRegisterPassword">
                        <Form.Label>Senha *</Form.Label>
                        <Form.Control type="password" name="senha" placeholder="********" required />
                    </Form.Group>
                </Col>
                
                <Col md={6}>
                    <Form.Group controlId="formRegisterConfirmPassword">
                        <Form.Label>Confirmar Senha *</Form.Label>
                        <Form.Control type="password" name="confirmarSenha" placeholder="********" required />
                    </Form.Group>
                </Col>
            </Row>
        </>
    );
};


const NewRegistrationModal = ({ show, handleClose, type }) => {
  const isPatient = type === 'patient';
  const title = isPatient ? 'Novo Paciente' : 'Novo Profissional';
  const FormComponent = isPatient ? PatientForm : ProfessionalForm;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Dados enviados para cadastro de ${title}`);
    // Adicionar aqui a lógica de envio para o backend
    handleClose();
  };

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
          <FormComponent />
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

          {/* Botão Cadastrar Profissional (Cor Primária) */}
          <Button 
            type="submit" 
            className="fw-bold px-4 py-2 text-white"
            style={{ backgroundColor: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}
          >
            Cadastrar {isPatient ? 'Paciente' : 'Profissional'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NewRegistrationModal;