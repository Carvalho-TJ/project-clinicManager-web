const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Obter tipos de atendimento disponíveis
router.get('/', async (req, res) => {
    try {
        // Tipos fixos baseados nas imagens
        const tiposAtendimento = [
            { 
                id: 'medicina', 
                nome: 'Medicina', 
                descricao: 'Consultas e atendimentos médicos especializados',
                icone: 'FaStethoscope'
            },
            { 
                id: 'odontologia', 
                nome: 'Odontologia', 
                descricao: 'Tratamentos dentários e saúde bucal',
                icone: 'FaTooth'
            },
            { 
                id: 'laboratorio', 
                nome: 'Laboratório', 
                descricao: 'Exames laboratoriais e diagnósticos',
                icone: 'FaFlask'
            }
        ];
        
        // Verifica quais tipos realmente têm profissionais cadastrados
        const sql = `
            SELECT DISTINCT tipo_atendimento 
            FROM profissional 
            WHERE deleted_at IS NULL
        `;
        const rows = await db.query(sql);
        const tiposComProfissionais = rows.map(r => r.tipo_atendimento);
        
        // Filtra apenas tipos que têm profissionais
        const tiposDisponiveis = tiposAtendimento.filter(tipo => 
            tiposComProfissionais.includes(tipo.id)
        );
        
        res.json(tiposDisponiveis);
    } catch (error) {
        console.error('Erro ao buscar tipos de atendimento:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;