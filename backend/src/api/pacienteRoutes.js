const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/auth');

// Middleware para proteger todas as rotas
router.use(AuthMiddleware.verificarToken, AuthMiddleware.verificarPaciente);

// Obter dados do paciente logado
router.get('/me', async (req, res) => {
    try {
        const db = require('../db/database');
        const pacienteId = req.usuario.id;
        
        console.log('🆔 ID do usuário do token:', pacienteId);
        console.log('👤 Dados do req.usuario:', req.usuario);

        const sql = `
            SELECT id_paciente, nome, cpf, data_nasc, estado_civil, 
                   telefone, email, created_at
            FROM paciente 
            WHERE id_paciente = ? AND deleted_at IS NULL
        `;
        console.log('📋 Executando query:', sql, 'com ID:', pacienteId);
        const rows = await db.query(sql, [pacienteId]);
        
        console.log('📊 Resultado da busca:', rows);

        if (rows.length === 0) {
            console.log('❌ Nenhum paciente encontrado com ID:', pacienteId);
            
            const allPacientes = await db.query('SELECT id_paciente, nome FROM paciente LIMIT 10');
            console.log('📋 Primeiros 10 pacientes:', allPacientes);
            
            return res.status(404).json({ 
                error: 'Paciente não encontrado' 
            });
        }

        console.log('✅ Paciente encontrado:', rows[0]);

        res.json(rows[0]);

    } catch (error) {
        console.error('Erro ao buscar paciente:', error);
        res.status(500).json({ 
            error: 'Erro interno do servidor' 
        });
    }
});

// Atualizar dados do paciente
router.put('/me', async (req, res) => {
    try {
        const db = require('../db/database');
        const pacienteId = req.usuario.id;
        const { nome, cpf, data_nasc, estado_civil, telefone, email } = req.body;
        
        if (!nome) {
            return res.status(400).json({ 
                error: 'Nome é obrigatório' 
            });
        }

        // Verifica se CPF já existe (se fornecido)
        if (cpf) {
            const checkSql = `
                SELECT id_paciente FROM paciente 
                WHERE cpf = ? AND id_paciente != ?
            `;
            const existing = await db.query(checkSql, [cpf, pacienteId]);
            
            if (existing.length > 0) {
                return res.status(400).json({ 
                    error: 'CPF já cadastrado para outro paciente' 
                });
            }
        }

        const updateSql = `
            UPDATE paciente 
            SET nome = ?, cpf = ?, data_nasc = ?, estado_civil = ?,
                telefone = ?, email = ?, updated_at = NOW()
            WHERE id_paciente = ?
        `;
        
        await db.query(updateSql, [
            nome,
            cpf || null,
            data_nasc || null,
            estado_civil || null,
            telefone || null,
            email || null,
            pacienteId
        ]);

        res.json({ 
            message: 'Dados atualizados com sucesso' 
        });

    } catch (error) {
        console.error('Erro ao atualizar paciente:', error);
        res.status(500).json({ 
            error: 'Erro interno do servidor' 
        });
    }
});

// Endereços do paciente
router.get('/enderecos', async (req, res) => {
    try {
        const db = require('../db/database');
        const pacienteId = req.usuario.id;
        
        const sql = `
            SELECT id_endereco, id_paciente, rua, bairro, numero, cep,
                   cidade, estado, complemento, tipo_endereco,
                   created_at, updated_at
            FROM endereco 
            WHERE id_paciente = ?
            ORDER BY tipo_endereco, created_at
        `;
        
        const enderecos = await db.query(sql, [pacienteId]);
        res.json(enderecos);

    } catch (error) {
        console.error('Erro ao buscar endereços:', error);
        res.status(500).json({ 
            error: 'Erro interno do servidor' 
        });
    }
});

router.post('/enderecos', async (req, res) => {
    try {
        const db = require('../db/database');
        const pacienteId = req.usuario.id;
        const { rua, bairro, numero, cep, cidade, estado, complemento, tipo_endereco } = req.body;
        
        if (!rua) {
            return res.status(400).json({ 
                error: 'Rua é obrigatória' 
            });
        }

        const sql = `
            INSERT INTO endereco 
            (id_paciente, rua, bairro, numero, cep, cidade, estado, complemento, tipo_endereco)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        const result = await db.query(sql, [
            pacienteId,
            rua,
            bairro || null,
            numero || null,
            cep || null,
            cidade || null,
            estado || null,
            complemento || null,
            tipo_endereco || 'residencial'
        ]);

        res.status(201).json({
            message: 'Endereço adicionado com sucesso',
            endereco_id: result.insertId
        });

    } catch (error) {
        console.error('Erro ao criar endereço:', error);
        res.status(500).json({ 
            error: 'Erro interno do servidor' 
        });
    }
});

router.delete('/enderecos/:id', async (req, res) => {
    try {
        const db = require('../db/database');
        const pacienteId = req.usuario.id;
        const enderecoId = parseInt(req.params.id);
        
        const sql = `
            DELETE FROM endereco 
            WHERE id_endereco = ? AND id_paciente = ?
        `;
        
        const result = await db.query(sql, [enderecoId, pacienteId]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ 
                error: 'Endereço não encontrado' 
            });
        }

        res.json({ 
            message: 'Endereço removido com sucesso' 
        });

    } catch (error) {
        console.error('Erro ao deletar endereço:', error);
        res.status(500).json({ 
            error: 'Erro interno do servidor' 
        });
    }
});

module.exports = router;