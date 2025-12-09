const express = require('express');
const router = express.Router();
const db = require('../db/database');
const moment = require('moment');

// Obter datas disponíveis para um profissional
router.get('/profissional/:id/datas', async (req, res) => {
    try {
        const profissionalId = parseInt(req.params.id);
        const { mes, ano } = req.query;
        
        // Validações
        if (!mes || !ano) {
            return res.status(400).json({ 
                error: 'Mês e ano são obrigatórios' 
            });
        }
        
        // Busca dias da semana que o profissional trabalha
        const diasSql = `
            SELECT DISTINCT dia_semana 
            FROM agenda 
            WHERE id_profissional = ? AND ativo = TRUE
            ORDER BY dia_semana
        `;
        const diasTrabalho = await db.query(diasSql, [profissionalId]);
        
        if (diasTrabalho.length === 0) {
            return res.json([]);
        }
        
        // Gera todas as datas do mês
        const startDate = moment(`${ano}-${mes}-01`);
        const endDate = startDate.clone().endOf('month');
        const datasDisponiveis = [];
        
        let currentDate = startDate.clone();
        
        while (currentDate.isSameOrBefore(endDate, 'day')) {
            const diaSemana = currentDate.day(); // 0=Domingo, 1=Segunda...
            
            // Verifica se o profissional trabalha neste dia
            const trabalhaNesseDia = diasTrabalho.some(dia => 
                dia.dia_semana === diaSemana
            );
            
            if (trabalhaNesseDia) {
                // Verifica se há agendamentos já feitos para esta data
                const dataStr = currentDate.format('YYYY-MM-DD');
                const agendamentosSql = `
                    SELECT COUNT(*) as total 
                    FROM agendamento 
                    WHERE id_profissional = ? 
                    AND DATE(data_hora) = ?
                    AND status IN ('solicitado', 'confirmado')
                    AND deleted_at IS NULL
                `;
                const [result] = await db.query(agendamentosSql, [profissionalId, dataStr]);
                
                // Busca agenda para este dia específico
                const agendaSql = `
                    SELECT COUNT(*) as total_slots
                    FROM agenda 
                    WHERE id_profissional = ? 
                    AND dia_semana = ?
                    AND ativo = TRUE
                `;
                const [agendaResult] = await db.query(agendaSql, [profissionalId, diaSemana]);
                
                const slotsDisponiveis = (agendaResult.total_slots * 4) - result.total; // 4 slots por hora
                
                if (slotsDisponiveis > 0) {
                    datasDisponiveis.push({
                        data: dataStr,
                        dia: currentDate.date(),
                        mes: currentDate.format('MMM').toLowerCase(),
                        dia_semana: currentDate.format('ddd').toLowerCase(),
                        disponivel: slotsDisponiveis > 0,
                        slots_disponiveis: slotsDisponiveis
                    });
                }
            }
            
            currentDate.add(1, 'day');
        }
        
        res.json(datasDisponiveis);
    } catch (error) {
        console.error('Erro ao buscar datas:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Obter horários disponíveis para uma data específica
router.get('/profissional/:id/horarios', async (req, res) => {
    try {
        const profissionalId = parseInt(req.params.id);
        const { data } = req.query;
        
        if (!data) {
            return res.status(400).json({ 
                error: 'Data é obrigatória' 
            });
        }
        
        const dataObj = moment(data);
        const diaSemana = dataObj.day();
        
        // Busca horários da agenda para este dia
        const agendaSql = `
            SELECT hora_inicio, hora_fim 
            FROM agenda 
            WHERE id_profissional = ? 
            AND dia_semana = ? 
            AND ativo = TRUE
            ORDER BY hora_inicio
        `;
        const agendas = await db.query(agendaSql, [profissionalId, diaSemana]);
        
        if (agendas.length === 0) {
            return res.json([]);
        }
        
        // Busca horários já agendados para esta data
        const dataInicio = dataObj.format('YYYY-MM-DD 00:00:00');
        const dataFim = dataObj.format('YYYY-MM-DD 23:59:59');
        
        const agendamentosSql = `
            SELECT data_hora, duracao_min 
            FROM agendamento 
            WHERE id_profissional = ? 
            AND data_hora BETWEEN ? AND ?
            AND status IN ('solicitado', 'confirmado')
            AND deleted_at IS NULL
            ORDER BY data_hora
        `;
        const agendamentos = await db.query(agendamentosSql, [profissionalId, dataInicio, dataFim]);
        
        // Gera todos os horários possíveis
        const todosHorarios = [];
        const intervalo = 30; // minutos
        
        for (const agenda of agendas) {
            let horaAtual = moment(agenda.hora_inicio, 'HH:mm:ss');
            const horaFim = moment(agenda.hora_fim, 'HH:mm:ss');
            
            while (horaAtual.isBefore(horaFim)) {
                todosHorarios.push(horaAtual.clone());
                horaAtual.add(intervalo, 'minutes');
            }
        }
        
        // Filtra horários já agendados
        const horariosDisponiveis = todosHorarios.filter(hora => {
            const horaFimSlot = hora.clone().add(intervalo, 'minutes');
            
            // Verifica se há conflito com algum agendamento existente
            const conflito = agendamentos.some(ag => {
                const horaAgendamento = moment(ag.data_hora);
                const horaFimAgendamento = horaAgendamento.clone().add(ag.duracao_min, 'minutes');
                
                // Verifica se há sobreposição
                return !(horaFimSlot.isSameOrBefore(horaAgendamento) || 
                        hora.isSameOrAfter(horaFimAgendamento));
            });
            
            return !conflito;
        });
        
        // Formata resposta
        const resposta = horariosDisponiveis.map(hora => ({
            hora: hora.format('HH:mm'),
            formato_12h: hora.format('hh:mm A'),
            disponivel: true
        }));
        
        res.json(resposta);
    } catch (error) {
        console.error('Erro ao buscar horários:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;