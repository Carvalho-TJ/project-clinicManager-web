import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Container, Row, Col, Card, ListGroup, Alert, Button, Badge, 
  Spinner, Tab, Tabs, Table
} from 'react-bootstrap';
import { 
  FaCalendarAlt, FaHistory, FaUserEdit, FaFileMedical, 
  FaPlus, FaTrash, FaEye, FaClock
} from 'react-icons/fa';
import { agendamentoAPI, pacienteAPI } from '../../services/api';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [dadosPaciente, setDadosPaciente] = useState(null);
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('agendamentos');

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    setLoading(true);
    try {
      console.log('🔍 Carregando dados do paciente...');
      // Carregar dados do paciente
      const pacienteResponse = await pacienteAPI.getMe();
      console.log('✅ Dados do paciente:', pacienteResponse.data);
      setDadosPaciente(pacienteResponse.data);

      // Carregar agendamentos
      console.log('🔍 Carregando agendamentos...');
      const agendamentosResponse = await agendamentoAPI.getMeusAgendamentos();
      console.log('✅ Agendamentos:', agendamentosResponse.data);
      setAgendamentos(agendamentosResponse.data || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      console.error('❌ Resposta do erro:', error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelarAgendamento = async (id) => {
    if (!window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
      return;
    }

    try {
      await agendamentoAPI.cancelarAgendamento(id);
      alert('Agendamento cancelado com sucesso!');
      carregarDados();
    } catch (error) {
      alert(error.response?.data?.error || 'Erro ao cancelar agendamento');
    }
  };

  const formatarData = (dataString) => {
    if (!dataString) return 'Não informada';
    try {
        const data = new Date(dataString);
        if (isNaN(data.getTime())) {
          return 'Data inválida';
        }
        return data.toLocaleDateString('pt-BR');
      } catch (error) {
        console.error('Erro ao formatar data:', error);
        return 'Data inválida';
      }
  };

  const formatarHora = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'solicitado': { label: 'Solicitado', variant: 'warning' },
      'confirmado': { label: 'Confirmado', variant: 'success' },
      'cancelado': { label: 'Cancelado', variant: 'danger' },
      'realizado': { label: 'Realizado', variant: 'info' }
    };
    
    const config = statusConfig[status] || { label: status, variant: 'secondary' };
    return <Badge bg={config.variant}>{config.label}</Badge>;
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Carregando seus dados...</p>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={3} className="mb-4">
          {/* Perfil do Paciente */}
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <div className="rounded-circle bg-primary d-inline-flex justify-content-center align-items-center mb-3"
                   style={{ width: '80px', height: '80px' }}>
                <span className="text-white h4">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <h5>{dadosPaciente?.nome || user?.name}</h5>
              <p className="text-muted mb-0">Paciente</p>
              <small className="text-muted">{dadosPaciente?.email}</small>
              
              <hr />
              
              <div className="text-start">
                <p><strong>CPF:</strong> {dadosPaciente?.cpf || 'Não informado'}</p>
                <p><strong>Telefone:</strong> {dadosPaciente?.telefone || 'Não informado'}</p>
                <p><strong>Data Nasc.:</strong> {formatarData(dadosPaciente?.data_nasc) || 'Não informada'}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={9}>
          <Alert variant="success">
            <h5>Bem-vindo(a), {user?.name}!</h5>
            Gerencie seus agendamentos e acompanhe sua saúde.
          </Alert>

          <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
            <Tab eventKey="agendamentos" title="Meus Agendamentos">
              <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Próximas Consultas</h5>
                  <Button 
                    variant="primary" 
                    size="sm"
                    href="/agendar-consulta"
                  >
                    <FaPlus className="me-1" /> Nova Consulta
                  </Button>
                </Card.Header>
                <Card.Body>
                  {agendamentos.length === 0 ? (
                    <Alert variant="info">
                      Você ainda não tem agendamentos. Clique em "Nova Consulta" para agendar.
                    </Alert>
                  ) : (
                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th>Data/Hora</th>
                          <th>Profissional</th>
                          <th>Especialidade</th>
                          <th>Status</th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {agendamentos.slice(0, 10).map((ag) => (
                          <tr key={ag.id_agendamento}>
                            <td>
                              <div>{formatarData(ag.data_hora)}</div>
                              <small className="text-muted">{formatarHora(ag.data_hora)}</small>
                            </td>
                            <td>{ag.profissional_nome}</td>
                            <td>{ag.especialidade}</td>
                            <td>{getStatusBadge(ag.status)}</td>
                            <td>
                              <Button 
                                variant="outline-info" 
                                size="sm" 
                                className="me-2"
                                href={`/agendamentos/${ag.id_agendamento}`}
                              >
                                <FaEye />
                              </Button>
                              {(ag.status === 'solicitado' || ag.status === 'confirmado') && (
                                <Button 
                                  variant="outline-danger" 
                                  size="sm"
                                  onClick={() => handleCancelarAgendamento(ag.id_agendamento)}
                                >
                                  <FaTrash />
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="historico" title="Histórico">
              <Card>
                <Card.Header>
                  <h5 className="mb-0">Histórico de Consultas</h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup>
                    {agendamentos
                      .filter(a => a.status === 'realizado')
                      .map((ag, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={3}>
                              <strong>{formatarData(ag.data_hora)}</strong>
                              <div className="text-muted">{formatarHora(ag.data_hora)}</div>
                            </Col>
                            <Col md={4}>
                              <strong>{ag.profissional_nome}</strong>
                              <div className="text-muted">{ag.especialidade}</div>
                            </Col>
                            <Col md={3}>
                              <Badge bg="info">Realizada</Badge>
                            </Col>
                            <Col md={2} className="text-end">
                              <Button variant="outline-primary" size="sm">
                                Ver Prontuário
                              </Button>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Tab>

            <Tab eventKey="dados" title="Meus Dados">
              <Card>
                <Card.Header>
                  <h5 className="mb-0">Informações Pessoais</h5>
                </Card.Header>
                <Card.Body>
                  {/* Formulário de edição de dados */}
                  {dadosPaciente && (
                    <div>
                      <Row>
                        <Col md={6}>
                          <div className="mb-3">
                            <label className="form-label">Nome Completo</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              defaultValue={dadosPaciente.nome}
                            />
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="mb-3">
                            <label className="form-label">CPF</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              defaultValue={dadosPaciente.cpf}
                              disabled
                            />
                          </div>
                        </Col>
                      </Row>
                      {/* Adicionar mais campos */}
                      <Button variant="primary">Atualizar Dados</Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default PatientDashboard;