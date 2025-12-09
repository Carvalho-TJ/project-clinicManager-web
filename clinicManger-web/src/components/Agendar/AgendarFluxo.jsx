import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Card, Button, ProgressBar, 
  Spinner, Alert, ListGroup, Badge, Form 
} from 'react-bootstrap';
import { 
  FaCalendar, FaUserMd, FaClock, FaCheck, 
  FaArrowLeft, FaArrowRight, FaStethoscope,
  FaTooth, FaFlask, FaMoneyBillWave
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import { agendamentoAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const AgendarFluxo = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [passoAtual, setPassoAtual] = useState(1);
  const [dados, setDados] = useState({
    tipoAtendimento: null,
    especialidade: null,
    profissional: null,
    data: null,
    horario: null
  });
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [confirmacaoAceita, setConfirmacaoAceita] = useState(false);

  // Dados carregados da API
  const [tiposAtendimento, setTiposAtendimento] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [profissionais, setProfissionais] = useState([]);
  const [datasDisponiveis, setDatasDisponiveis] = useState([]);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);

  useEffect(() => {
    carregarTiposAtendimento();
  }, []);

  const carregarTiposAtendimento = async () => {
    try {
      const response = await agendamentoAPI.getTiposAtendimento();
      setTiposAtendimento(response.data);
    } catch (error) {
      console.error('Erro ao carregar tipos:', error);
      setErro('Erro ao carregar tipos de atendimento');
    }
  };

  const avancarPasso = () => {
    setErro('');
    if (passoAtual < 6) {
      setPassoAtual(passoAtual + 1);
    }
  };

  const retrocederPasso = () => {
    setErro('');
    if (passoAtual > 1) {
      setPassoAtual(passoAtual - 1);
    }
  };

  const selecionarTipo = async (tipo) => {
    setDados({ ...dados, tipoAtendimento: tipo, especialidade: null, profissional: null, data: null, horario: null });
    setCarregando(true);
    setEspecialidades([]);
    setProfissionais([]);
    setDatasDisponiveis([]);
    setHorariosDisponiveis([]);
    
    try {
      const response = await agendamentoAPI.getEspecialidades(tipo.id);
      setEspecialidades(response.data);
      avancarPasso();
    } catch (error) {
      setErro('Erro ao carregar especialidades');
    } finally {
      setCarregando(false);
    }
  };

  const selecionarEspecialidade = async (especialidade) => {
    setDados({ ...dados, especialidade, profissional: null, data: null, horario: null });
    setCarregando(true);
    setProfissionais([]);
    setDatasDisponiveis([]);
    setHorariosDisponiveis([]);
    
    try {
      const response = await agendamentoAPI.getProfissionaisPorEspecialidade(
        especialidade, 
        dados.tipoAtendimento.id
      );
      setProfissionais(response.data);
      avancarPasso();
    } catch (error) {
      setErro('Erro ao carregar profissionais');
    } finally {
      setCarregando(false);
    }
  };

  const selecionarProfissional = async (profissional) => {
    setDados({ ...dados, profissional, data: null, horario: null });
    setCarregando(true);
    setDatasDisponiveis([]);
    setHorariosDisponiveis([]);
    
    try {
      const hoje = new Date();
      const response = await agendamentoAPI.getDatasDisponiveis(
        profissional.id_profissional,
        hoje.getMonth() + 1,
        hoje.getFullYear()
      );
      setDatasDisponiveis(response.data);
      avancarPasso();
    } catch (error) {
      setErro('Erro ao carregar datas disponíveis');
    } finally {
      setCarregando(false);
    }
  };

  const selecionarData = async (data) => {
    setDados({ ...dados, data, horario: null });
    setCarregando(true);
    setHorariosDisponiveis([]);
    
    try {
      const response = await agendamentoAPI.getHorariosDisponiveis(
        dados.profissional.id_profissional,
        data.data
      );
      setHorariosDisponiveis(response.data);
      avancarPasso();
    } catch (error) {
      setErro('Erro ao carregar horários');
    } finally {
      setCarregando(false);
    }
  };

  const selecionarHorario = (horario) => {
    setDados({ ...dados, horario });
    avancarPasso();
  };

  const confirmarAgendamento = async () => {
    if (!confirmacaoAceita) {
      setErro('Você precisa confirmar que as informações estão corretas');
      return;
    }

    setCarregando(true);
    setErro('');
    
    try {
      const agendamentoData = {
        id_profissional: dados.profissional.id_profissional,
        data_hora: `${dados.data.data}T${dados.horario.hora}:00`,
        tipo_atendimento: dados.tipoAtendimento.id,
        especialidade: dados.especialidade,
        duracao_min: 30
      };

      await agendamentoAPI.criarAgendamento(agendamentoData);
      
      alert('Agendamento realizado com sucesso!');
      navigate('/patient/dashboard');
      
    } catch (error) {
      setErro(error.response?.data?.error || 'Erro ao confirmar agendamento');
    } finally {
      setCarregando(false);
    }
  };

  const renderIconeTipo = (tipoId) => {
    switch(tipoId) {
      case 'medicina':
        return <FaStethoscope />;
      case 'odontologia':
        return <FaTooth />;
      case 'laboratorio':
        return <FaFlask />;
      default:
        return <FaUserMd />;
    }
  };

  const passos = [
    { numero: 1, nome: 'Tipo', icone: <FaCalendar /> },
    { numero: 2, nome: 'Especialidade', icone: <FaUserMd /> },
    { numero: 3, nome: 'Profissional', icone: <FaUserMd /> },
    { numero: 4, nome: 'Data', icone: <FaCalendar /> },
    { numero: 5, nome: 'Horário', icone: <FaClock /> },
    { numero: 6, nome: 'Confirmação', icone: <FaCheck /> }
  ];

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={10}>
          {/* Progresso */}
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <ProgressBar 
                now={(passoAtual / passos.length) * 100} 
                style={{ height: '10px' }}
              />
              <div className="d-flex justify-content-between mt-3">
                {passos.map(passo => (
                  <div key={passo.numero} className="text-center">
                    <div 
                      className={`rounded-circle d-inline-flex justify-content-center align-items-center 
                        ${passo.numero <= passoAtual ? 'bg-primary text-white' : 'bg-light text-secondary'}`}
                      style={{ 
                        width: '40px', 
                        height: '40px',
                        transition: 'all 0.3s'
                      }}
                    >
                      {passo.icone}
                    </div>
                    <div className="small mt-2">{passo.nome}</div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>

          {erro && (
            <Alert variant="danger" dismissible onClose={() => setErro('')}>
              {erro}
            </Alert>
          )}

          {/* Conteúdo do Passo Atual */}
          <Card className="shadow">
            <Card.Body className="p-4">
              {carregando ? (
                <div className="text-center py-5">
                  <Spinner animation="border" />
                  <p className="mt-3">Carregando...</p>
                </div>
              ) : (
                <>
                  {/* Passo 1: Tipo de Atendimento */}
                  {passoAtual === 1 && (
                    <div>
                      <h3 className="mb-4">Escolha o tipo de atendimento</h3>
                      <Row>
                        {tiposAtendimento.map(tipo => (
                          <Col md={4} key={tipo.id} className="mb-3">
                            <Card 
                              className={`text-center h-100 ${dados.tipoAtendimento?.id === tipo.id ? 'border-primary border-2' : ''}`}
                              onClick={() => selecionarTipo(tipo)}
                              style={{ 
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                transform: dados.tipoAtendimento?.id === tipo.id ? 'scale(1.02)' : 'scale(1)'
                              }}
                            >
                              <Card.Body className="d-flex flex-column">
                                <div className="mb-3" style={{ fontSize: '2.5rem', color: '#8c3d7e' }}>
                                  {renderIconeTipo(tipo.id)}
                                </div>
                                <Card.Title className="mt-auto">{tipo.nome}</Card.Title>
                                <Card.Text className="text-muted small mb-3">
                                  {tipo.descricao}
                                </Card.Text>
                                {dados.tipoAtendimento?.id === tipo.id && (
                                  <Badge bg="primary" className="mt-auto">
                                    Selecionado
                                  </Badge>
                                )}
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  )}

                  {/* Passo 2: Especialidade */}
                  {passoAtual === 2 && (
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="mb-0">Escolha a especialidade</h3>
                        <Badge bg="info" className="fs-6">
                          {dados.tipoAtendimento?.nome}
                        </Badge>
                      </div>
                      <Row>
                        {especialidades.map((esp, index) => (
                          <Col md={4} key={index} className="mb-3">
                            <Card 
                              className={`text-center h-100 ${dados.especialidade === esp ? 'border-primary border-2' : ''}`}
                              onClick={() => selecionarEspecialidade(esp)}
                              style={{ 
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                            >
                              <Card.Body className="d-flex flex-column">
                                <div className="mb-2" style={{ fontSize: '1.5rem', color: '#8c3d7e' }}>
                                  <FaUserMd />
                                </div>
                                <Card.Title className="h5">{esp}</Card.Title>
                                <div className="mt-auto">
                                  <Button 
                                    variant={dados.especialidade === esp ? 'primary' : 'outline-primary'}
                                    className="w-100"
                                  >
                                    {dados.especialidade === esp ? 'Selecionado' : 'Selecionar'}
                                  </Button>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </div>
                  )}

                  {/* Passo 3: Profissional */}
                  {passoAtual === 3 && (
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="mb-0">Escolha o profissional</h3>
                        <div>
                          <Badge bg="info" className="me-2 fs-6">
                            {dados.tipoAtendimento?.nome}
                          </Badge>
                          <Badge bg="secondary" className="fs-6">
                            {dados.especialidade}
                          </Badge>
                        </div>
                      </div>
                      <ListGroup>
                        {profissionais.length === 0 ? (
                          <Alert variant="warning">
                            Nenhum profissional disponível para esta especialidade no momento.
                          </Alert>
                        ) : (
                          profissionais.map(prof => (
                            <ListGroup.Item 
                              key={prof.id_profissional}
                              className={`${dados.profissional?.id_profissional === prof.id_profissional ? 'bg-primary text-white' : ''}`}
                              onClick={() => selecionarProfissional(prof)}
                              style={{ 
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                            >
                              <Row className="align-items-center">
                                <Col md={8}>
                                  <h5 className="mb-1">{prof.nome}</h5>
                                  <p className="mb-1">
                                    {prof.especialidade} • {prof.crm}
                                  </p>
                                  {prof.preco_consulta > 0 && (
                                    <Badge bg="success" className="mt-1">
                                      <FaMoneyBillWave className="me-1" />
                                      R$ {prof.preco_consulta.toFixed(2)}
                                    </Badge>
                                  )}
                                </Col>
                                <Col md={4} className="text-end">
                                  <Button 
                                    variant={dados.profissional?.id_profissional === prof.id_profissional ? 'light' : 'outline-primary'}
                                  >
                                    {dados.profissional?.id_profissional === prof.id_profissional ? '✓ Selecionado' : 'Selecionar'}
                                  </Button>
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          ))
                        )}
                      </ListGroup>
                    </div>
                  )}

                  {/* Passo 4: Data */}
                  {passoAtual === 4 && (
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="mb-0">Escolha a data</h3>
                        <div>
                          <Badge bg="info" className="me-2 fs-6">
                            {dados.profissional?.nome}
                          </Badge>
                        </div>
                      </div>
                      {datasDisponiveis.length === 0 ? (
                        <Alert variant="warning">
                          Nenhuma data disponível para este profissional no momento.
                        </Alert>
                      ) : (
                        <Row>
                          {datasDisponiveis.map(data => (
                            <Col md={3} key={data.data} className="mb-3">
                              <Card 
                                className={`text-center h-100 ${dados.data?.data === data.data ? 'border-primary border-2' : ''}`}
                                onClick={() => selecionarData(data)}
                                style={{ 
                                  cursor: 'pointer',
                                  transition: 'all 0.2s'
                                }}
                              >
                                <Card.Body className="d-flex flex-column">
                                  <div className="display-4 fw-bold">{data.dia}</div>
                                  <div className="text-uppercase fw-bold text-primary">{data.mes}</div>
                                  <div className="text-muted small">{data.dia_semana}</div>
                                  <div className="mt-auto pt-3">
                                    <Badge bg={data.disponivel ? 'success' : 'secondary'}>
                                      {data.slots_disponiveis} horário(s)
                                    </Badge>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      )}
                    </div>
                  )}

                  {/* Passo 5: Horário */}
                  {passoAtual === 5 && (
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="mb-0">Escolha o horário</h3>
                        <div>
                          <Badge bg="info" className="fs-6">
                            {new Date(dados.data?.data).toLocaleDateString('pt-BR')}
                          </Badge>
                        </div>
                      </div>
                      {horariosDisponiveis.length === 0 ? (
                        <Alert variant="warning">
                          Nenhum horário disponível para esta data. Por favor, escolha outra data.
                        </Alert>
                      ) : (
                        <Row>
                          {horariosDisponiveis.map(horario => (
                            <Col md={3} key={horario.hora} className="mb-3">
                              <Card 
                                className={`text-center h-100 ${dados.horario?.hora === horario.hora ? 'border-primary border-2' : ''}`}
                                onClick={() => selecionarHorario(horario)}
                                style={{ 
                                  cursor: 'pointer',
                                  transition: 'all 0.2s'
                                }}
                              >
                                <Card.Body className="d-flex flex-column justify-content-center">
                                  <h4 className="mb-0">{horario.formato_12h}</h4>
                                  <div className="mt-2">
                                    <Badge bg="success">Disponível</Badge>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      )}
                    </div>
                  )}

                  {/* Passo 6: Confirmação */}
                  {passoAtual === 6 && (
                    <div>
                      <h3 className="mb-4">Confirmação do Agendamento</h3>
                      
                      <Card className="mb-4">
                        <Card.Body>
                          <h5>Resumo do Agendamento</h5>
                          <hr />
                          <Row>
                            <Col md={6}>
                              <p><strong>Tipo:</strong> {dados.tipoAtendimento?.nome}</p>
                              <p><strong>Especialidade:</strong> {dados.especialidade}</p>
                              <p><strong>Profissional:</strong> {dados.profissional?.nome}</p>
                              <p><strong>Registro:</strong> {dados.profissional?.crm}</p>
                            </Col>
                            <Col md={6}>
                              <p><strong>Data:</strong> {new Date(dados.data?.data).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                              <p><strong>Horário:</strong> {dados.horario?.formato_12h}</p>
                              <p><strong>Duração:</strong> 30 minutos</p>
                              {dados.profissional?.preco_consulta > 0 && (
                                <p className="fw-bold text-success">
                                  <strong>Valor:</strong> R$ {dados.profissional?.preco_consulta.toFixed(2)}
                                </p>
                              )}
                            </Col>
                          </Row>
                          
                          <hr />
                          
                          <h5>Seus Dados</h5>
                          <p><strong>Paciente:</strong> {user?.name}</p>
                          <p><strong>Email:</strong> {user?.email}</p>
                          <p><strong>Telefone:</strong> {user?.telefone || 'Não informado'}</p>
                          
                          <Form.Group className="mt-4">
                            <Form.Check 
                              type="checkbox"
                              id="confirmacao"
                              label="Confirmo que as informações estão corretas e estou ciente do agendamento."
                              checked={confirmacaoAceita}
                              onChange={(e) => setConfirmacaoAceita(e.target.checked)}
                            />
                          </Form.Group>
                        </Card.Body>
                      </Card>
                    </div>
                  )}

                  {/* Navegação */}
                  <div className="d-flex justify-content-between mt-4">
                    <Button 
                      variant="outline-secondary"
                      onClick={retrocederPasso}
                      disabled={passoAtual === 1 || carregando}
                      size="lg"
                    >
                      <FaArrowLeft className="me-1" />
                      Voltar
                    </Button>
                    
                    {passoAtual < 6 ? (
                      <Button 
                        variant="primary"
                        onClick={avancarPasso}
                        disabled={carregando || (
                          (passoAtual === 1 && !dados.tipoAtendimento) ||
                          (passoAtual === 2 && !dados.especialidade) ||
                          (passoAtual === 3 && !dados.profissional) ||
                          (passoAtual === 4 && !dados.data) ||
                          (passoAtual === 5 && !dados.horario)
                        )}
                        size="lg"
                      >
                        Continuar
                        <FaArrowRight className="ms-1" />
                      </Button>
                    ) : (
                      <Button 
                        variant="success"
                        size="lg"
                        onClick={confirmarAgendamento}
                        disabled={carregando || !confirmacaoAceita}
                        className="px-5"
                      >
                        {carregando ? (
                          <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Confirmando...
                          </>
                        ) : (
                          <>
                            <FaCheck className="me-2" />
                            Confirmar Agendamento
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </>
              )}
            </Card.Body>
          </Card>

          {/* Informações e ações extras */}
          {passoAtual > 1 && (
            <div className="mt-4">
              <Alert variant="info">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Paciente:</strong> {user?.name} • {user?.email}
                  </div>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => {
                      if (window.confirm('Deseja cancelar o agendamento e voltar ao início?')) {
                        setPassoAtual(1);
                        setDados({
                          tipoAtendimento: null,
                          especialidade: null,
                          profissional: null,
                          data: null,
                          horario: null
                        });
                        setConfirmacaoAceita(false);
                      }
                    }}
                  >
                    Cancelar Agendamento
                  </Button>
                </div>
              </Alert>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AgendarFluxo;