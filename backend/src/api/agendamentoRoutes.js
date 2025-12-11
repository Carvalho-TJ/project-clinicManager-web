const express = require('express');
const router = express.Router();
const db = require('../db/database');
const AuthMiddleware = require('../middleware/auth');

// Criar agendamento completo (todas as etapas)
router.post('/completo', AuthMiddleware.verificarToken, async (req, res) => {
    try {
        const pacienteId = req.usuario.id;
        const {
            id_profissional,
            data_hora,
            especialidade,
            duracao_min = 30
        } = req.body;
        
        // Validações
        if (!id_profissional || !data_hora || !especialidade) {
            return res.status(400).json({ 
                error: 'Todos os campos são obrigatórios' 
            });
        }
        
        // Verifica se o profissional existe e atende a especialidade
        const profissionalSql = `
            SELECT * FROM profissional 
            WHERE id_profissional = ? 
            AND especialidade = ?
            AND deleted_at IS NULL
        `;
        const [profissional] = await db.query(profissionalSql, [
            id_profissional, 
            especialidade
        ]);
        
        if (!profissional) {
            return res.status(404).json({ 
                error: 'Profissional não encontrado para esta especialidade' 
            });
        }
        
        // Verifica disponibilidade
        const dataHora = new Date(data_hora);
        const dataFim = new Date(dataHora.getTime() + duracao_min * 60000);
        
        const disponibilidadeSql = `
            SELECT 1 FROM agendamento 
            WHERE id_profissional = ? 
            AND data_hora < ? 
            AND DATE_ADD(data_hora, INTERVAL duracao_min MINUTE) > ?
            AND status IN ('solicitado', 'confirmado')
            AND deleted_at IS NULL
            LIMIT 1
        `;
        const [ocupado] = await db.query(disponibilidadeSql, [
            id_profissional, 
            dataFim, 
            dataHora
        ]);
        
        if (ocupado) {
            return res.status(400).json({ 
                error: 'Horário indisponível. Por favor, escolha outro horário.' 
            });
        }
        
        // Cria o agendamento
        const insertSql = `
            INSERT INTO agendamento 
            (id_paciente, id_profissional, data_hora, duracao_min, status, criado_por)
            VALUES (?, ?, ?, ?, 'solicitado', ?)
        `;
        const result = await db.query(insertSql, [
            pacienteId,
            id_profissional,
            data_hora,
            duracao_min,
            pacienteId
        ]);
        
        // Busca dados completos para resposta
        const agendamentoSql = `
            SELECT 
                a.*,
                p.nome as paciente_nome,
                p.email as paciente_email,
                p.telefone as paciente_telefone,
                prof.nome as profissional_nome,
                prof.especialidade
            FROM agendamento a
            JOIN paciente p ON a.id_paciente = p.id_paciente
            JOIN profissional prof ON a.id_profissional = prof.id_profissional
            WHERE a.id_agendamento = ?
        `;
        const [agendamento] = await db.query(agendamentoSql, [result.insertId]);
        
        // Formata resposta
        const resposta = {
            message: 'Agendamento realizado com sucesso!',
            agendamento: {
                id: agendamento.id_agendamento,
                data_hora: agendamento.data_hora,
                duracao_min: agendamento.duracao_min,
                status: agendamento.status,
                especialidade: agendamento.especialidade,
                profissional: {
                    nome: agendamento.profissional_nome,
                    especialidade: agendamento.especialidade
                },
                paciente: {
                    nome: agendamento.paciente_nome,
                    email: agendamento.paciente_email,
                    telefone: agendamento.paciente_telefone
                }
            }
        };
        
        res.status(201).json(resposta);
        
    } catch (error) {
        console.error('Erro ao criar agendamento completo:', error);
        res.status(500).json({ 
            error: 'Erro interno do servidor ao criar agendamento' 
        });
    }
});

// Obter agendamento por ID com todos os dados
router.get('/:id/detalhes', AuthMiddleware.verificarToken, async (req, res) => {
    try {
        const agendamentoId = parseInt(req.params.id);
        const pacienteId = req.usuario.id;
        
        const sql = `
            SELECT 
                a.*,
                p.nome as paciente_nome,
                p.cpf,
                p.data_nasc,
                p.estado_civil,
                p.email as paciente_email,
                p.telefone as paciente_telefone,
                e.rua,
                e.numero,
                e.bairro,
                e.cidade,
                e.estado,
                e.cep,
                e.complemento,
                prof.nome as profissional_nome,
                prof.especialidade,
                prof.crm,
                COALESCE(prof.preco_consulta, 0) as preco_consulta
            FROM agendamento a
            JOIN paciente p ON a.id_paciente = p.id_paciente
            LEFT JOIN endereco e ON p.id_paciente = e.id_paciente AND e.tipo_endereco = 'residencial'
            JOIN profissional prof ON a.id_profissional = prof.id_profissional
            WHERE a.id_agendamento = ? 
            AND a.id_paciente = ?
            AND a.deleted_at IS NULL
        `;
        
        const [agendamento] = await db.query(sql, [agendamentoId, pacienteId]);
        
        if (!agendamento) {
            return res.status(404).json({ 
                error: 'Agendamento não encontrado' 
            });
        }
        
        // Formata a data para exibição
        const dataHora = new Date(agendamento.data_hora);
        const dataFormatada = {
            dia: dataHora.getDate(),
            mes: dataHora.toLocaleDateString('pt-BR', { month: 'long' }),
            ano: dataHora.getFullYear(),
            dia_semana: dataHora.toLocaleDateString('pt-BR', { weekday: 'long' }),
            hora: dataHora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        };
        
        // Formata o endereço
        const enderecoFormatado = agendamento.rua ? 
            `${agendamento.rua}, ${agendamento.numero} - ${agendamento.bairro}\n${agendamento.cidade} - ${agendamento.estado}\nCEP: ${agendamento.cep}` :
            'Endereço não cadastrado';
        
        const resposta = {
            agendamento: {
                id: agendamento.id_agendamento,
                data_hora: agendamento.data_hora,
                data_formatada: dataFormatada,
                duracao_min: agendamento.duracao_min,
                status: agendamento.status,
                especialidade: agendamento.especialidade,
                preco_consulta: agendamento.preco_consulta
            },
            paciente: {
                nome: agendamento.paciente_nome,
                cpf: agendamento.cpf,
                email: agendamento.paciente_email,
                telefone: agendamento.paciente_telefone,
                data_nasc: agendamento.data_nasc,
                estado_civil: agendamento.estado_civil,
                endereco: enderecoFormatado
            },
            profissional: {
                nome: agendamento.profissional_nome,
                especialidade: agendamento.especialidade,
                registro: agendamento.crm
            }
        };
        
        res.json(resposta);
        
    } catch (error) {
        console.error('Erro ao buscar detalhes do agendamento:', error);
        res.status(500).json({ 
            error: 'Erro interno do servidor' 
        });
    }
});

// Obter agendamentos do paciente
router.get('/meus-agendamentos', AuthMiddleware.verificarToken, async (req, res) => {
    try {
        const pacienteId = req.usuario.id;

        console.log('📅 Buscando agendamentos para paciente ID:', pacienteId);
        
        const sql = `
            SELECT 
                a.id_agendamento,
                a.data_hora,
                a.duracao_min,
                a.status,
                a.created_at,
                
                p.nome as profissional_nome,
                p.especialidade,
                p.crm,
                p.telefone as profissional_telefone,
                p.email as profissional_email
                
            FROM agendamento a
            JOIN profissional p ON a.id_profissional = p.id_profissional
            WHERE a.id_paciente = ?
                AND a.deleted_at IS NULL
                AND a.data_hora > DATE_SUB(NOW(), INTERVAL 6 MONTH)
            ORDER BY a.data_hora DESC
            LIMIT 50
        `;
        
        const agendamentos = await db.query(sql, [pacienteId]);

        console.log(`✅ Encontrados ${agendamentos.length} agendamentos`);
        
        // Formata as datas
        const agendamentosFormatados = agendamentos.map(ag => ({
            ...ag,
            data_formatada: new Date(ag.data_hora).toLocaleDateString('pt-BR'),
            hora_formatada: new Date(ag.data_hora).toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            }),
            data_hora_obj: new Date(ag.data_hora),
            pode_cancelar: ag.status === 'solicitado' || ag.status === 'confirmado'
        }));
        
        res.json(agendamentosFormatados);
        
    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Cancelar agendamento
router.put('/:id/cancelar', AuthMiddleware.verificarToken, async (req, res) => {
    try {
        const agendamentoId = parseInt(req.params.id);
        const pacienteId = req.usuario.id;
        
        // Verifica se o agendamento pertence ao paciente
        const checkSql = `
            SELECT status, data_hora 
            FROM agendamento 
            WHERE id_agendamento = ? 
                AND id_paciente = ?
                AND deleted_at IS NULL
        `;
        const [agendamento] = await db.query(checkSql, [agendamentoId, pacienteId]);
        
        if (!agendamento) {
            return res.status(404).json({ error: 'Agendamento não encontrado' });
        }
        
        // Verifica se pode cancelar (apenas solicitado ou confirmado)
        if (!['solicitado', 'confirmado'].includes(agendamento.status)) {
            return res.status(400).json({ 
                error: 'Agendamento não pode ser cancelado neste status' 
            });
        }
        
        // Verifica se está a pelo menos 24h de antecedência
        const dataHora = new Date(agendamento.data_hora);
        const agora = new Date();
        const horasAntecedencia = 24;
        
        if ((dataHora - agora) < (horasAntecedencia * 60 * 60 * 1000)) {
            return res.status(400).json({ 
                error: `Cancelamento deve ser feito com pelo menos ${horasAntecedencia}h de antecedência` 
            });
        }

        // Atualiza status para cancelado
        const updateSql = `
            UPDATE agendamento 
            SET status = 'cancelado', 
                atualizado_por = ?,
                updated_at = NOW()
            WHERE id_agendamento = ?
        `;
        
        await db.query(updateSql, [pacienteId, agendamentoId]);

        res.json({ 
            success: true, 
            message: 'Agendamento cancelado com sucesso' 
        });
        
    } catch (error) {
        console.error('Erro ao cancelar agendamento:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;