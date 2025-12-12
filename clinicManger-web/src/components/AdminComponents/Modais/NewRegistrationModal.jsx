import React, { useState, useMemo, useCallback } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsCalendar, BsClock } from 'react-icons/bs';
import api from '../../../services/api'; 

const PRIMARY_COLOR = '#8c3d7e';

const PatientForm = React.memo(({ formData, setFormData }) => (
  <>
    <Row>
        <h6 className="fw-bold mb-3" style={{ color: PRIMARY_COLOR }}>Dados Pessoais</h6>
        <Col md={12}>
            <Form.Group className="mb-3" controlId="formRegisterName">
                <Form.Label>Nome Completo *</Form.Label>
                <Form.Control 
                  type="text" 
                  name="nome" 
                  placeholder="João Silva" 
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  required 
                />
            </Form.Group>
        </Col>

        <Col md={6}>
            <Form.Group className="mb-3" controlId="formRegisterCPF">
                <Form.Label>CPF *</Form.Label>
                <Form.Control 
                  type="text" 
                  name="cpf" 
                  placeholder="000.000.000-00" 
                  value={formData.cpf}
                  onChange={(e) => setFormData({...formData, cpf: e.target.value})}
                  required 
                />
            </Form.Group>
        </Col>

        <Col md={6}>
            <Form.Group className="mb-3" controlId="formRegisterBirthDate">
                <Form.Label>Data de Nascimento *</Form.Label>
                <Form.Control 
                  type="date" 
                  name="data_nasc" 
                  value={formData.data_nasc}
                  onChange={(e) => setFormData({...formData, data_nasc: e.target.value})}
                  required 
                />
            </Form.Group>
        </Col>

        <Col md={12}>
            <Form.Group className="mb-4" controlId="formRegisterMaritalStatus">
                <Form.Label>Estado Civil *</Form.Label>
                <Form.Select 
                  name="estado_civil" 
                  value={formData.estado_civil}
                  onChange={(e) => setFormData({...formData, estado_civil: e.target.value})}
                  required
                >
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
                <Form.Control 
                  type="email" 
                  name="email" 
                  placeholder="seu@email.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                />
            </Form.Group>
        </Col>

        <Col md={6}>
            <Form.Group className="mb-3" controlId="formRegisterPhone">
                <Form.Label>Telefone *</Form.Label>
                <Form.Control 
                  type="tel" 
                  name="telefone" 
                  placeholder="(92) 99999-9999" 
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  required 
                />
            </Form.Group>
        </Col>
    </Row>

    <h6 className="fw-bold mb-3" style={{ color: PRIMARY_COLOR }}>Endereço</h6>
    <Row>
        <Col md={8}>
            <Form.Group className="mb-3" controlId="formRegisterStreet">
                <Form.Label>Rua *</Form.Label>
                <Form.Control 
                  type="text" 
                  name="rua" 
                  placeholder="Av. Amazonas" 
                  value={formData.rua}
                  onChange={(e) => setFormData({...formData, rua: e.target.value})}
                  required 
                />
            </Form.Group>
        </Col>

        <Col md={6}>
            <Form.Group className="mb-3" controlId="formRegisterDistrict">
                <Form.Label>Bairro *</Form.Label>
                <Form.Control 
                  type="text" 
                  name="bairro" 
                  placeholder="Centro" 
                  value={formData.bairro}
                  onChange={(e) => setFormData({...formData, bairro: e.target.value})}
                  required 
                />
            </Form.Group>
        </Col>
        
        <Col md={4}>
            <Form.Group className="mb-3" controlId="formRegisterNumber">
                <Form.Label>Número *</Form.Label>
                <Form.Control 
                  type="text" 
                  name="numero" 
                  placeholder="123" 
                  value={formData.numero}
                  onChange={(e) => setFormData({...formData, numero: e.target.value})}
                  required 
                />
            </Form.Group>
        </Col>

        <Col md={4}>
            <Form.Group className="mb-4" controlId="formRegisterCEP">
                <Form.Label>CEP *</Form.Label>
                <Form.Control 
                  type="text" 
                  name="cep" 
                  placeholder="69000-000" 
                  value={formData.cep}
                  onChange={(e) => setFormData({...formData, cep: e.target.value})}
                  required 
                />
            </Form.Group>
        </Col>
        
        <Col md={5}>
            <Form.Group className="mb-3" controlId="formRegisterCity">
                <Form.Label>Cidade *</Form.Label>
                <Form.Control 
                  type="text" 
                  name="cidade" 
                  placeholder="Parintins" 
                  value={formData.cidade}
                  onChange={(e) => setFormData({...formData, cidade: e.target.value})}
                  required 
                />
            </Form.Group>
        </Col>
        
        <Col md={3}>
            <Form.Group className="mb-3" controlId="formRegisterState">
                <Form.Label>Estado *</Form.Label>
                <Form.Select 
                  name="estado" 
                  value={formData.estado}
                  onChange={(e) => setFormData({...formData, estado: e.target.value})}
                  required
                >
                    <option value="AM">AM</option>
                    <option value="AC">AC</option>
                    <option value="AL">AL</option>
                </Form.Select>
            </Form.Group>
        </Col>
    </Row>

    <h6 className="fw-bold mb-3" style={{ color: PRIMARY_COLOR }}>Senha</h6>
    <Row className="mb-4">
        <Col md={6}>
            <Form.Group controlId="formRegisterPassword">
                <Form.Label>Senha *</Form.Label>
                <Form.Control 
                  type="password" 
                  name="senha" 
                  placeholder="********" 
                  value={formData.senha}
                  onChange={(e) => setFormData({...formData, senha: e.target.value})}
                  required 
                />
            </Form.Group>
        </Col>
        
        <Col md={6}>
            <Form.Group controlId="formRegisterConfirmPassword">
                <Form.Label>Confirmar Senha *</Form.Label>
                <Form.Control 
                  type="password" 
                  name="confirmarSenha" 
                  placeholder="********" 
                  value={formData.confirmarSenha}
                  onChange={(e) => setFormData({...formData, confirmarSenha: e.target.value})}
                  required 
                />
            </Form.Group>
        </Col>
    </Row>
  </>
));

const DaySelectionButton = React.memo(({ day, isSelected, onClick }) => (
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
));

const ProfessionalForm = React.memo(({ formData, setFormData }) => {
    // Mapeamento bidirecional
    const numberToDay = useMemo(() => ({
        1: 'Segunda', 2: 'Terça', 3: 'Quarta', 
        4: 'Quinta', 5: 'Sexta', 6: 'Sábado'
    }), []);
    
    const dayToNumber = useMemo(() => ({
        'Segunda': 1, 'Terça': 2, 'Quarta': 3, 
        'Quinta': 4, 'Sexta': 5, 'Sábado': 6
    }), []);
    
    const daysOfWeek = useMemo(() => 
        ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'], 
    []);

    // Use useMemo para evitar recálculos desnecessários
    const selectedDayNames = useMemo(() => {
        return (formData.diasSelecionados || [])
            .map(num => numberToDay[num])
            .filter(Boolean);
    }, [formData.diasSelecionados, numberToDay]);

    const toggleDay = useCallback((day) => {
        const dayNumber = dayToNumber[day];
        setFormData(prev => {
            const currentNumbers = prev.diasSelecionados || [];
            const newNumbers = currentNumbers.includes(dayNumber)
                ? currentNumbers.filter(num => num !== dayNumber)
                : [...currentNumbers, dayNumber].sort();
            
            return {
                ...prev, 
                diasSelecionados: newNumbers
            };
        });
    }, [dayToNumber]);


    return (
        <>
            <Row>
                <Col md={6} className="mb-3">
                    <Form.Group controlId="formProfNome">
                        <Form.Label>Nome Completo *</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Dra. Paula Costa" 
                          value={formData.nome}
                          onChange={(e) => setFormData({...formData, nome: e.target.value})}
                          required 
                        />
                    </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                    <Form.Group controlId="formProfEspecialidade">
                        <Form.Label>Especialidade *</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Odontologia - Clínica Geral" 
                          value={formData.especialidade}
                          onChange={(e) => setFormData({...formData, especialidade: e.target.value})}
                          required 
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={6} className="mb-3">
                    <Form.Group controlId="formProfRegistro">
                        <Form.Label>CRM/CRO *</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="CRO-AM 12345" 
                          value={formData.crm}
                          onChange={(e) => setFormData({...formData, crm: e.target.value})}
                          required 
                        />
                    </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                    <Form.Group controlId="formProfTelefone">
                        <Form.Label>Telefone *</Form.Label>
                        <Form.Control 
                          type="tel" 
                          placeholder="(00) 00000-0000" 
                          value={formData.telefone}
                          onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                          required 
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col md={12} className="mb-3">
                    <Form.Group controlId="formProfEmail">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control 
                          type="email" 
                          placeholder="paula.costa@clinicmanager.com" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required 
                        />
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
                                isSelected={selectedDayNames.includes(day)}
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
                            <Form.Control 
                              type="text" 
                              placeholder="08:00" 
                              value={formData.hora_inicio}
                              onChange={(e) => setFormData({...formData, hora_inicio: e.target.value})}
                              required 
                            />
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
                            <Form.Control 
                              type="text" 
                              placeholder="18:00" 
                              value={formData.hora_fim}
                              onChange={(e) => setFormData({...formData, hora_fim: e.target.value})}
                              required 
                            />
                            <span className="input-group-text bg-white" style={{ borderColor: '#ced4da' }}>
                                <BsClock color="#6c757d" />
                            </span>
                        </div>
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={6}>
                    <Form.Group controlId="formProfPassword">
                        <Form.Label>Senha *</Form.Label>
                        <Form.Control 
                          type="password" 
                          name="senha" 
                          placeholder="********" 
                          value={formData.senha}
                          onChange={(e) => setFormData({...formData, senha: e.target.value})}
                          required 
                        />
                    </Form.Group>
                </Col>
                
                <Col md={6}>
                    <Form.Group controlId="formProfConfirmPassword">
                        <Form.Label>Confirmar Senha *</Form.Label>
                        <Form.Control 
                          type="password" 
                          name="confirmarSenha" 
                          placeholder="********" 
                          value={formData.confirmarSenha}
                          onChange={(e) => setFormData({...formData, confirmarSenha: e.target.value})}
                          required 
                        />
                    </Form.Group>
                </Col>
            </Row>
        </>
    );
});


const NewRegistrationModal = ({ show, handleClose, type }) => {
  const isPatient = type === 'patient';
  const title = isPatient ? 'Novo Paciente' : 'Novo Profissional';
  
  // Estado do formulário
  const [formData, setFormData] = useState({
    // Dados comuns
    nome: '',
    email: '',
    telefone: '',
    login: '',
    senha: '',
    confirmarSenha: '',
    
    // Dados específicos de paciente
    cpf: '',
    data_nasc: '',
    estado_civil: '',
    rua: '',
    bairro: '',
    numero: '',
    cep: '',
    cidade: '',
    estado: 'AM',
    
    // Dados específicos de profissional
    especialidade: '',
    crm: '',
    diasSelecionados: [2, 6], // Terça (2) e Sábado (6) por padrão
    hora_inicio: '08:00',
    hora_fim: '18:00'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      console.log(`📤 Enviando dados para cadastro de ${title}:`, formData);

      // Validação básica
      if (!formData.nome || !formData.email || !formData.senha) {
        throw new Error('Preencha todos os campos obrigatórios');
      }

      if (formData.senha !== formData.confirmarSenha) {
        throw new Error('As senhas não coincidem');
      }

      // Pegar token do localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Usuário não autenticado. Faça login novamente.');
      }

      let response;
      
      if (isPatient) {
        // Cadastro de paciente
        const pacienteData = {
          nome: formData.nome,
          cpf: formData.cpf.replace(/\D/g, ''),
          data_nasc: formData.data_nasc,
          estado_civil: formData.estado_civil,
          telefone: formData.telefone.replace(/\D/g, ''),
          email: formData.email,
          login: formData.email, // Usa email como login
          senha: formData.senha,
          rua: formData.rua,
          bairro: formData.bairro,
          numero: formData.numero,
          cep: formData.cep.replace(/\D/g, ''),
          cidade: formData.cidade,
          estado: formData.estado
        };
        
        console.log('📤 Cadastrando paciente:', pacienteData);
        response = await api.post('/auth/registrar-paciente', pacienteData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
      } else {
        // Cadastro de profissional
        const profissionalData = {
          nome: formData.nome,
          especialidade: formData.especialidade,
          crm: formData.crm,
          telefone: formData.telefone.replace(/\D/g, ''),
          email: formData.email,
          login: formData.email, // Usa email como login
          senha: formData.senha,
          diasSelecionados: formData.diasSelecionados,
          hora_inicio: formData.hora_inicio,
          hora_fim: formData.hora_fim
        };
        
        console.log('📤 Cadastrando profissional:', profissionalData);
        response = await api.post('/profissionais', profissionalData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      console.log('✅ Resposta da API:', response.data);
      
      setSuccess(`${title} cadastrado com sucesso!`);
      
      // Fecha o modal após 2 segundos e recarrega a página
      setTimeout(() => {
        handleClose();
        window.location.reload(); // Recarrega para ver o novo cadastro
      }, 2000);

    } catch (err) {
      console.error('❌ Erro ao cadastrar:', err);
      setError(err.response?.data?.error || err.message || `Erro ao cadastrar ${title}`);
    } finally {
      setLoading(false);
    }
  };

  const FormComponent = isPatient 
    ? (props) => <PatientForm {...props} />
    : (props) => <ProfessionalForm {...props} />;

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
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          
          <FormComponent 
            formData={formData} 
            setFormData={setFormData} 
          />
        </Modal.Body>
        <Modal.Footer className="border-top-0 d-flex justify-content-end">
          <Button 
            variant="light" 
            className="text-dark fw-bold px-4 py-2"
            onClick={handleClose}
            disabled={loading}
            style={{ backgroundColor: '#e9ecef', borderColor: '#e9ecef' }}
          >
            Cancelar
          </Button>

          <Button 
            type="submit" 
            className="fw-bold px-4 py-2 text-white"
            disabled={loading}
            style={{ backgroundColor: PRIMARY_COLOR, borderColor: PRIMARY_COLOR }}
          >
            {loading ? 'Salvando...' : `Cadastrar ${isPatient ? 'Paciente' : 'Profissional'}`}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NewRegistrationModal;