import React, { useState, useEffect } from 'react';
import { 
  Container, Card, Row, Col, Button, Form, 
  Alert, Spinner, ListGroup, Badge
} from 'react-bootstrap';
import { 
  FaStethoscope, FaUserMd, FaCalendarAlt, 
  FaClock, FaCheck, FaArrowLeft, FaArrowRight,
  FaCalendarDay, FaCalendarWeek, FaCalendar
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { agendamentoAPI } from '../../services/api';

const AgendarFluxo = () => {
  const navigate = useNavigate();
  
  // Estados do fluxo
  const [passoAtual, setPassoAtual] = useState(1);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  
  // Dados disponíveis
  const [especialidades, setEspecialidades] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [datasDisponiveis, setDatasDisponiveis] = useState([]);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  
  // Dados selecionados
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState('');
  const [profissionalSelecionado, setProfissionalSelecionado] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [horarioSelecionado, setHorarioSelecionado] = useState('');

  // Dias da semana para exibição
  const diasDaSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  
  // Carregar especialidades ao iniciar
  useEffect(() => {
    carregarEspecialidades();
  }, []);
  
  const carregarEspecialidades = async () => {
    setLoading(true);
    setErro('');
    try {
      const response = await agendamentoAPI.getEspecialidades();
      setEspecialidades(response.data || response || []);
    } catch (error) {
      console.error('Erro ao carregar especialidades:', error);
      setErro('Erro ao carregar especialidades. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  
  const carregarProfissionais = async (especialidade) => {
    setLoading(true);
    setErro('');
    try {
      let response;
      
      // Tenta a rota específica primeiro
      try {
        response = await agendamentoAPI.getProfissionaisPorEspecialidade(especialidade);
      } catch (error) {
        // Se não existir, busca todos e filtra
        console.log('Rota específica não encontrada, filtrando no frontend...');
        response = await agendamentoAPI.getProfissionais();
        // Filtra por especialidade
        if (response.data && Array.isArray(response.data)) {
          response.data = response.data.filter(p => 
            p.especialidade && p.especialidade.toLowerCase() === especialidade.toLowerCase()
          );
        }
      }
      
      setProfissionais(response.data || response || []);
      
      if (!response.data || response.data.length === 0) {
        setErro('Nenhum profissional disponível para esta especialidade no momento.');
      }
    } catch (error) {
      console.error('Erro ao carregar profissionais:', error);
      setErro('Erro ao carregar profissionais. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  
  const carregarDatasDisponiveis = async (profissionalId) => {
    setLoading(true);
    setErro('');
    try {
      const hoje = new Date();
      const mes = hoje.getMonth() + 1;
      const ano = hoje.getFullYear();
      
      const response = await agendamentoAPI.getDatasDisponiveis(profissionalId, mes, ano);
      setDatasDisponiveis(response.data || response || []);
      
      if (!response.data || response.data.length === 0) {
        setErro('Nenhuma data disponível para este profissional no momento.');
      }
    } catch (error) {
      console.error('Erro ao carregar datas:', error);
      setErro('Erro ao carregar datas disponíveis. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  
  const carregarHorariosDisponiveis = async (profissionalId, data) => {
    setLoading(true);
    setErro('');
    try {
      const response = await agendamentoAPI.getHorariosDisponiveis(profissionalId, data);
      setHorariosDisponiveis(response.data || response || []);
      
      if (!response.data || response.data.length === 0) {
        setErro('Nenhum horário disponível para esta data.');
      }
    } catch (error) {
      console.error('Erro ao carregar horários:', error);
      setErro('Erro ao carregar horários disponíveis. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  
  // Handlers para mudança de passo
  const handleSelecionarEspecialidade = (especialidade) => {
    setEspecialidadeSelecionada(especialidade);
    setProfissionais([]);
    carregarProfissionais(especialidade);
    setPassoAtual(2);
  };
  
  const handleSelecionarProfissional = (profissional) => {
    setProfissionalSelecionado(profissional);
    setDatasDisponiveis([]);
    const profissionalId = profissional.id_profissional || profissional.id;
    carregarDatasDisponiveis(profissionalId);
    setPassoAtual(3);
  };
  
  const handleSelecionarData = (data) => {
    setDataSelecionada(data);
    setHorariosDisponiveis([]);
    const profissionalId = profissionalSelecionado?.id_profissional || profissionalSelecionado?.id;
    carregarHorariosDisponiveis(profissionalId, data);
    setPassoAtual(4);
  };
  
  const handleSelecionarHorario = (horario) => {
    setHorarioSelecionado(horario);
    setPassoAtual(5);
  };
  
  const handleVoltar = () => {
    if (passoAtual > 1) {
      setPassoAtual(passoAtual - 1);
      setErro('');
    }
  };
  
  const handleConfirmarAgendamento = async () => {
    setLoading(true);
    setErro('');
    
    try {
      // Formata data e hora para o formato do backend
      const dataHora = new Date(`${dataSelecionada}T${horarioSelecionado}:00`);
      
      const agendamentoData = {
        id_profissional: profissionalSelecionado.id_profissional || profissionalSelecionado.id,
        data_hora: dataHora.toISOString(),
        especialidade: especialidadeSelecionada,
        duracao_min: 30 // Padrão 30 minutos
      };
      
      console.log('📤 Enviando agendamento:', agendamentoData);
      
      const response = await agendamentoAPI.criarAgendamento(agendamentoData);
      
      alert('✅ Consulta agendada com sucesso!');
      navigate('/patient/dashboard');
      
    } catch (error) {
      console.error('❌ Erro ao agendar:', error);
      const errorMsg = error.response?.data?.error || 
                      error.response?.data?.erro || 
                      'Erro ao agendar consulta';
      setErro(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  
  // Formatar data para exibição
  const formatarData = (dataStr) => {
    try {
      const data = new Date(dataStr);
      if (isNaN(data.getTime())) return dataStr;
      
      return data.toLocaleDateString('pt-BR', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });
    } catch (error) {
      return dataStr;
    }
  };
  
  // Formatar data curta (para cards)
  const formatarDataCurta = (dataStr) => {
    try {
      const data = new Date(dataStr);
      if (isNaN(data.getTime())) return dataStr;
      
      const diaSemana = diasDaSemana[data.getDay()] || `Dia ${data.getDay()}`;
      return `${diaSemana}, ${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}`;
    } catch (error) {
      return dataStr;
    }
  };
  
  // Componentes de cada passo
  const renderPasso1 = () => (
    <Card className="shadow-sm">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0"><FaStethoscope className="me-2" /> Passo 1: Escolha a Especialidade</h5>
      </Card.Header>
      <Card.Body>
        <p className="text-muted mb-4">Selecione a especialidade médica desejada:</p>
        
        {erro && <Alert variant="warning">{erro}</Alert>}
        
        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" />
            <p className="mt-2">Carregando especialidades...</p>
          </div>
        ) : (
          <Row>
            {especialidades.map((especialidade, index) => (
              <Col md={4} key={index} className="mb-3">
                <Card 
                  className="h-100 hover-shadow"
                  onClick={() => handleSelecionarEspecialidade(especialidade)}
                  style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <Card.Body className="text-center">
                    <div className="display-4 text-primary mb-3">
                      <FaStethoscope />
                    </div>
                    <h5>{especialidade}</h5>
                    <p className="text-muted small">
                      {especialidade === 'Cardiologia' && 'Doenças do coração e circulação'}
                      {especialidade === 'Dermatologia' && 'Pele, cabelos e unhas'}
                      {especialidade === 'Ortopedia' && 'Ossos, músculos e articulações'}
                      {especialidade === 'Pediatria' && 'Saúde infantil'}
                      {especialidade === 'Ginecologia' && 'Saúde feminina'}
                      {!['Cardiologia', 'Dermatologia', 'Ortopedia', 'Pediatria', 'Ginecologia'].includes(especialidade) && 'Especialidade médica'}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Card.Body>
    </Card>
  );
  
  const renderPasso2 = () => (
    <Card className="shadow-sm">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0"><FaUserMd className="me-2" /> Passo 2: Escolha o Profissional</h5>
      </Card.Header>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <p className="text-muted mb-0">
            Especialidade: <Badge bg="info">{especialidadeSelecionada}</Badge>
          </p>
          <Button 
            variant="outline-secondary" 
            size="sm"
            onClick={() => {
              setEspecialidadeSelecionada('');
              setPassoAtual(1);
            }}
          >
            Trocar Especialidade
          </Button>
        </div>
        
        {erro && <Alert variant="warning">{erro}</Alert>}
        
        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" />
            <p className="mt-2">Carregando profissionais...</p>
          </div>
        ) : profissionais.length === 0 ? (
          <Alert variant="warning">
            Não há profissionais disponíveis para esta especialidade no momento.
          </Alert>
        ) : (
          <Row>
            {profissionais.map((prof) => (
              <Col md={6} key={prof.id_profissional || prof.id} className="mb-3">
                <Card 
                  className={`h-100 cursor-pointer ${profissionalSelecionado?.id_profissional === prof.id_profissional ? 'border-primary border-2' : ''}`}
                  onClick={() => handleSelecionarProfissional(prof)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col md={3} className="text-center">
                        <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white mx-auto"
                             style={{ width: '60px', height: '60px' }}>
                          <FaUserMd size={24} />
                        </div>
                      </Col>
                      <Col md={9}>
                        <h5 className="mb-1">{prof.nome}</h5>
                        <p className="mb-1 text-muted">
                          <small>CRM: {prof.crm || 'N/A'}</small>
                        </p>
                        <p className="mb-1">
                          <Badge bg="info">{prof.especialidade || especialidadeSelecionada}</Badge>
                        </p>
                        <div className="mt-2">
                          <Button 
                            variant={profissionalSelecionado?.id_profissional === prof.id_profissional ? "primary" : "outline-primary"}
                            size="sm"
                            className="w-100"
                          >
                            {profissionalSelecionado?.id_profissional === prof.id_profissional ? 
                              'Selecionado' : 'Selecionar'} <FaArrowRight className="ms-1" />
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Card.Body>
    </Card>
  );
  
  const renderPasso3 = () => (
    <Card className="shadow-sm">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0"><FaCalendarAlt className="me-2" /> Passo 3: Escolha a Data</h5>
      </Card.Header>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <p className="text-muted mb-0">
              Profissional: <Badge bg="info">{profissionalSelecionado?.nome}</Badge>
            </p>
            <p className="text-muted small mb-0">
              Especialidade: {especialidadeSelecionada}
            </p>
          </div>
          <Button 
            variant="outline-secondary" 
            size="sm"
            onClick={() => {
              setProfissionalSelecionado(null);
              setPassoAtual(2);
            }}
          >
            Trocar Profissional
          </Button>
        </div>
        
        {erro && <Alert variant="warning">{erro}</Alert>}
        
        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" />
            <p className="mt-2">Carregando datas disponíveis...</p>
          </div>
        ) : datasDisponiveis.length === 0 ? (
          <Alert variant="warning">
            Não há datas disponíveis para este profissional no momento.
          </Alert>
        ) : (
          <Row>
            {datasDisponiveis.map((dataObj, index) => (
              <Col md={4} key={index} className="mb-3">
                <Card 
                  className={`h-100 cursor-pointer ${dataSelecionada === dataObj.data ? 'border-primary border-2' : ''}`}
                  onClick={() => handleSelecionarData(dataObj.data)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Body className="text-center">
                    <div className="display-4 text-primary mb-2">
                      {dataObj.dia_semana === 5 || dataObj.dia_semana === 6 ? <FaCalendarWeek /> : <FaCalendarDay />}
                    </div>
                    <h5>{formatarDataCurta(dataObj.data)}</h5>
                    <p className="text-muted small mb-2">
                      {diasDaSemana[dataObj.dia_semana] || `Dia ${dataObj.dia_semana}`}
                    </p>
                    {dataObj.disponivel ? (
                      <Badge bg="success">Disponível</Badge>
                    ) : (
                      <Badge bg="secondary">Indisponível</Badge>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Card.Body>
    </Card>
  );
  
  const renderPasso4 = () => (
    <Card className="shadow-sm">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0"><FaClock className="me-2" /> Passo 4: Escolha o Horário</h5>
      </Card.Header>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <p className="text-muted mb-0">
              Data: <Badge bg="info">{formatarData(dataSelecionada)}</Badge>
            </p>
            <p className="text-muted small mb-0">
              Profissional: {profissionalSelecionado?.nome}
            </p>
          </div>
          <Button 
            variant="outline-secondary" 
            size="sm"
            onClick={() => {
              setDataSelecionada('');
              setPassoAtual(3);
            }}
          >
            Trocar Data
          </Button>
        </div>
        
        {erro && <Alert variant="warning">{erro}</Alert>}
        
        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" />
            <p className="mt-2">Carregando horários...</p>
          </div>
        ) : horariosDisponiveis.length === 0 ? (
          <Alert variant="warning">
            Não há horários disponíveis para esta data.
          </Alert>
        ) : (
          <Row>
            {horariosDisponiveis.map((horarioObj, index) => (
              <Col md={3} key={index} className="mb-3">
                <Button
                  variant={horarioSelecionado === horarioObj.hora ? 'primary' : 'outline-primary'}
                  className="w-100 py-3"
                  onClick={() => handleSelecionarHorario(horarioObj.hora || horarioObj)}
                  disabled={!horarioObj.disponivel}
                >
                  <div className="h4 mb-1">{horarioObj.hora || horarioObj}</div>
                  <small>
                    {horarioObj.disponivel !== false ? 'Disponível' : 'Indisponível'}
                  </small>
                </Button>
              </Col>
            ))}
          </Row>
        )}
        
        {horarioSelecionado && (
          <div className="mt-4 p-3 bg-light rounded">
            <h6>Horário selecionado:</h6>
            <p className="h4 text-primary">{horarioSelecionado}</p>
            <Button 
              variant="success" 
              className="mt-2"
              onClick={() => setPassoAtual(5)}
            >
              Continuar para Confirmação <FaArrowRight className="ms-2" />
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
  
  const renderPasso5 = () => (
    <Card className="shadow-sm">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0"><FaCheck className="me-2" /> Passo 5: Confirmar Agendamento</h5>
      </Card.Header>
      <Card.Body>
        <Alert variant="info">
          <h5>Confira os detalhes da sua consulta:</h5>
        </Alert>
        
        <Card className="mb-4">
          <Card.Body>
                <h6>📋 Resumo do Agendamento</h6>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between">
                    <span>Especialidade:</span>
                    <strong>{especialidadeSelecionada}</strong>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between">
                    <span>Profissional:</span>
                    <strong>{profissionalSelecionado?.nome}</strong>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between">
                    <span>Data:</span>
                    <strong>{formatarData(dataSelecionada)}</strong>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between">
                    <span>Horário:</span>
                    <strong>{horarioSelecionado}</strong>
                  </ListGroup.Item>
                </ListGroup>
          </Card.Body>
        </Card>
        
        {erro && <Alert variant="danger">{erro}</Alert>}
        
        <div className="d-flex justify-content-between">
          <Button variant="outline-secondary" onClick={handleVoltar}>
            <FaArrowLeft className="me-2" /> Voltar
          </Button>
          <Button 
            variant="success" 
            size="lg"
            onClick={handleConfirmarAgendamento}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Agendando...
              </>
            ) : (
              <>
                <FaCheck className="me-2" /> Confirmar Agendamento
              </>
            )}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
  
  // Renderizar passo atual
  const renderPasso = () => {
    switch (passoAtual) {
      case 1: return renderPasso1();
      case 2: return renderPasso2();
      case 3: return renderPasso3();
      case 4: return renderPasso4();
      case 5: return renderPasso5();
      default: return renderPasso1();
    }
  };
  
  return (
    <Container className="py-4">
      <h1 className="mb-4">Agendar Nova Consulta</h1>
      <p className="lead mb-4">
        Siga os passos abaixo para agendar sua consulta
      </p>
      
      {/* Barra de progresso */}
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center">
          {[1, 2, 3, 4, 5].map((passo) => (
            <React.Fragment key={passo}>
              <div className="text-center">
                <div 
                  className={`rounded-circle d-inline-flex align-items-center justify-content-center ${passo <= passoAtual ? 'bg-primary text-white' : 'bg-light text-muted'}`}
                  style={{ width: '50px', height: '50px' }}
                >
                  <strong>{passo}</strong>
                </div>
                <div className="mt-2 small">
                  {passo === 1 && 'Especialidade'}
                  {passo === 2 && 'Profissional'}
                  {passo === 3 && 'Data'}
                  {passo === 4 && 'Horário'}
                  {passo === 5 && 'Confirmar'}
                </div>
              </div>
              {passo < 5 && (
                <div className="flex-grow-1 mx-2">
                  <div className="progress" style={{ height: '2px' }}>
                    <div 
                      className="progress-bar" 
                      style={{ 
                        width: passo < passoAtual ? '100%' : '0%',
                        backgroundColor: passo < passoAtual ? '#0d6efd' : '#e9ecef'
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Passo atual */}
      {renderPasso()}
    </Container>
  );
};

export default AgendarFluxo;