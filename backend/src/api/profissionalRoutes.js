const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/auth');

// Middleware para verificar autenticação
router.use(AuthMiddleware.verificarToken);

// Listar todos os profissionais (público, mas requer token)
router.get('/', async (req, res) => {
    try {
        const db = require('../db/database');
        
        const sql = `
            SELECT 
                p.id_profissional,
                p.nome,
                p.especialidade,
                p.crm,
                p.telefone,
                p.email,
                p.tipo_atendimento,
                u.ativo
            FROM profissional p
            JOIN usuario u ON p.id_profissional = u.id_usuario
            WHERE p.deleted_at IS NULL
            ORDER BY p.nome
        `;
        
        const profissionais = await db.query(sql);
        res.json(profissionais);
    } catch (error) {
        console.error('Erro ao buscar profissionais:', error);
        res.status(500).json({ 
            error: 'Erro interno do servidor' 
        });
    }
});

// Obter detalhes de um profissional específico
router.get('/:id', async (req, res) => {
    try {
        const db = require('../db/database');
        const profissionalId = parseInt(req.params.id);
        
        if (!profissionalId) {
            return res.status(400).json({ 
                error: 'ID do profissional é obrigatório' 
            });
        }
        
        // Buscar dados do profissional
        const sql = `
            SELECT 
                p.id_profissional,
                p.nome,
                p.especialidade,
                p.crm,
                p.telefone,
                p.email,
                p.tipo_atendimento,
                p.created_at,
                p.updated_at
            FROM profissional p
            JOIN usuario u ON p.id_profissional = u.id_usuario
            WHERE p.id_profissional = ? 
                AND p.deleted_at IS NULL
                AND u.ativo = TRUE
        `;
        
        const [profissional] = await db.query(sql, [profissionalId]);
        
        if (!profissional) {
            return res.status(404).json({ 
                error: 'Profissional não encontrado' 
            });
        }
        
        // Buscar agenda do profissional
        const agendaSql = `
            SELECT 
                dia_semana,
                hora_inicio,
                hora_fim,
                ativo
            FROM agenda
            WHERE id_profissional = ?
            ORDER BY dia_semana, hora_inicio
        `;
        
        const agenda = await db.query(agendaSql, [profissionalId]);
        
        // Formatar dias da semana
        const diasDaSemana = {
            0: 'Segunda-feira',
            1: 'Terça-feira',
            2: 'Quarta-feira',
            3: 'Quinta-feira',
            4: 'Sexta-feira',
            5: 'Sábado',
            6: 'Domingo'
        };
        
        const agendaFormatada = agenda.map(item => ({
            ...item,
            dia_semana_nome: diasDaSemana[item.dia_semana] || `Dia ${item.dia_semana}`
        }));
        
        res.json({
            ...profissional,
            agenda: agendaFormatada
        });
        
    } catch (error) {
        console.error('Erro ao buscar profissional:', error);
        res.status(500).json({ 
            error: 'Erro interno do servidor' 
        });
    }
});

// Rotas protegidas para administradores
const adminRoutes = express.Router();
adminRoutes.use(AuthMiddleware.verificarAdmin);

// Criar novo profissional (apenas admin)
adminRoutes.post('/', async (req, res) => {
    try {
        const db = require('../db/database');
        const HashUtils = require('../utils/gerar-hash');
        
        const { 
            nome, 
            especialidade, 
            crm, 
            telefone, 
            email, 
            tipo_atendimento,
            login,
            senha 
        } = req.body;
        
        // Validações básicas
        if (!nome || !especialidade || !login || !senha) {
            return res.status(400).json({ 
                error: 'Nome, especialidade, login e senha são obrigatórios' 
            });
        }
        
        // Verificar se login já existe
        const checkLoginSql = 'SELECT id_usuario FROM usuario WHERE login = ?';
        const [existingUser] = await db.query(checkLoginSql, [login]);
        
        if (existingUser) {
            return res.status(400).json({ 
                error: 'Login já está em uso' 
            });
        }
        
        // Verificar se CRM já existe (se fornecido)
        if (crm) {
            const checkCrmSql = 'SELECT id_profissional FROM profissional WHERE crm = ?';
            const [existingCrm] = await db.query(checkCrmSql, [crm]);
            
            if (existingCrm) {
                return res.status(400).json({ 
                    error: 'CRM já cadastrado' 
                });
            }
        }
        
        // Iniciar transação
        const connection = await db.getConnection();
        await connection.beginTransaction();
        
        try {
            // Hash da senha
            const senhaHash = await HashUtils.hashSenha(senha);
            
            // Criar usuário
            const userSql = `
                INSERT INTO usuario (login, senha_hash, tipo, ativo)
                VALUES (?, ?, 'profissional', TRUE)
            `;
            const [userResult] = await connection.execute(userSql, [login, senhaHash]);
            const userId = userResult.insertId;
            
            // Criar profissional
            const profSql = `
                INSERT INTO profissional 
                (id_profissional, nome, especialidade, crm, telefone, email, tipo_atendimento)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `;
            await connection.execute(profSql, [
                userId,
                nome,
                especialidade,
                crm || null,
                telefone || null,
                email || null,
                tipo_atendimento || 'medicina'
            ]);
            
            // Criar agenda padrão (Segunda a Sexta, 8h-12h e 14h-18h)
            const agendaSql = `
                INSERT INTO agenda (id_profissional, dia_semana, hora_inicio, hora_fim, ativo)
                VALUES (?, ?, ?, ?, TRUE)
            `;
            
            // Segunda a Sexta (0-4)
            for (let dia = 0; dia < 5; dia++) {
                await connection.execute(agendaSql, [userId, dia, '08:00:00', '12:00:00']);
                await connection.execute(agendaSql, [userId, dia, '14:00:00', '18:00:00']);
            }
            
            await connection.commit();
            
            res.status(201).json({
                message: 'Profissional criado com sucesso',
                profissional_id: userId,
                dados: {
                    nome,
                    especialidade,
                    crm,
                    tipo_atendimento
                }
            });
            
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
        
    } catch (error) {
        console.error('Erro ao criar profissional:', error);
        res.status(500).json({ 
            error: 'Erro interno do servidor ao criar profissional' 
        });
    }
});

// Atualizar profissional (apenas admin)
adminRoutes.put('/:id', async (req, res) => {
    try {
        const db = require('../db/database');
        const profissionalId = parseInt(req.params.id);
        const { nome, especialidade, crm, telefone, email, tipo_atendimento, ativo } = req.body;
        
        if (!profissionalId) {
            return res.status(400).json({ 
                error: 'ID do profissional é obrigatório' 
            });
        }
        
        // Verificar se profissional existe
        const checkSql = 'SELECT id_profissional FROM profissional WHERE id_profissional = ?';
        const [existingProf] = await db.query(checkSql, [profissionalId]);
        
        if (!existingProf) {
            return res.status(404).json({ 
                error: 'Profissional não encontrado' 
            });
        }
        
        // Verificar se novo CRM já existe (se fornecido)
        if (crm) {
            const checkCrmSql = 'SELECT id_profissional FROM profissional WHERE crm = ? AND id_profissional != ?';
            const [existingCrm] = await db.query(checkCrmSql, [crm, profissionalId]);
            
            if (existingCrm) {
                return res.status(400).json({ 
                    error: 'CRM já cadastrado para outro profissional' 
                });
            }
        }
        
        // Atualizar profissional
        const updateSql = `
            UPDATE profissional 
            SET nome = ?, especialidade = ?, crm = ?, telefone = ?, 
                email = ?, tipo_atendimento = ?, updated_at = NOW()
            WHERE id_profissional = ?
        `;
        
        await db.query(updateSql, [
            nome || null,
            especialidade || null,
            crm || null,
            telefone || null,
            email || null,
            tipo_atendimento || 'medicina',
            profissionalId
        ]);
        
        // Atualizar status do usuário (se fornecido)
        if (ativo !== undefined) {
            const userSql = 'UPDATE usuario SET ativo = ? WHERE id_usuario = ?';
            await db.query(userSql, [ativo ? 1 : 0, profissionalId]);
        }
        
        res.json({ 
            message: 'Profissional atualizado com sucesso' 
        });
        
    } catch (error) {
        console.error('Erro ao atualizar profissional:', error);
        res.status(500).json({ 
            error: 'Erro interno do servidor' 
        });
    }
});

// Excluir profissional (soft delete, apenas admin)
adminRoutes.delete('/:id', async (req, res) => {
    try {
        const db = require('../db/database');
        const profissionalId = parseInt(req.params.id);
        
        if (!profissionalId) {
            return res.status(400).json({ 
                error: 'ID do profissional é obrigatório' 
            });
        }
        
        // Verificar se profissional existe
        const checkSql = 'SELECT id_profissional FROM profissional WHERE id_profissional = ? AND deleted_at IS NULL';
        const [existingProf] = await db.query(checkSql, [profissionalId]);
        
        if (!existingProf) {
            return res.status(404).json({ 
                error: 'Profissional não encontrado' 
            });
        }
        
        // Soft delete do profissional
        const deleteSql = 'UPDATE profissional SET deleted_at = NOW() WHERE id_profissional = ?';
        await db.query(deleteSql, [profissionalId]);
        
        // Desativar usuário
        const userSql = 'UPDATE usuario SET ativo = FALSE WHERE id_usuario = ?';
        await db.query(userSql, [profissionalId]);
        
        res.json({ 
            message: 'Profissional excluído com sucesso' 
        });
        
    } catch (error) {
        console.error('Erro ao excluir profissional:', error);
        res.status(500).json({ 
            error: 'Erro interno do servidor' 
        });
    }
});

// Monta rotas de admin
router.use(adminRoutes);

module.exports = router;