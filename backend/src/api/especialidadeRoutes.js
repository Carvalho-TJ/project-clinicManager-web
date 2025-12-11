const express = require('express');
const router = express.Router();
const db = require('../db/database');

// Obter especialidades (todas)
router.get('/', async (req, res) => {
    try {
        const sql = `
            SELECT DISTINCT especialidade 
            FROM profissional 
            WHERE deleted_at IS NULL
            ORDER BY especialidade
        `;
        
        const rows = await db.query(sql);
        const especialidades = rows.map(row => row.especialidade);
        
        res.json(especialidades);
    } catch (error) {
        console.error('Erro ao buscar especialidades:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Obter profissionais por especialidade
router.get('/:especialidade/profissionais', async (req, res) => {
    try {
        const { especialidade } = req.params;
        
        const sql = `
            SELECT 
                p.id_profissional,
                p.nome,
                p.especialidade,
                p.crm,
                p.telefone,
                p.email
            FROM profissional p
            JOIN usuario u ON p.id_profissional = u.id_usuario
            WHERE p.especialidade = ? 
                AND u.ativo = TRUE 
                AND p.deleted_at IS NULL
            ORDER BY p.nome
        `;
        
        const profissionais = await db.query(sql, [especialidade]);
        
        // Adicionar dias de trabalho
        for (let profissional of profissionais) {
            const diasSql = `
                SELECT DISTINCT dia_semana 
                FROM agenda 
                WHERE id_profissional = ? AND ativo = TRUE
                ORDER BY dia_semana
            `;
            const dias = await db.query(diasSql, [profissional.id_profissional]);
            profissional.dias_trabalho = dias.map(d => d.dia_semana);
        }
        
        res.json(profissionais);
    } catch (error) {
        console.error('Erro ao buscar profissionais:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;