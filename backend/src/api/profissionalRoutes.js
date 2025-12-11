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
      login,
      senha,
      diasSelecionados, // array de inteiros [1,5] (Terça, Sábado)
      hora_inicio,      // string "08:00"
      hora_fim          // string "18:00"
    } = req.body;

    // Validações básicas
    if (!nome || !especialidade || !login || !senha) {
      return res.status(400).json({ 
        error: 'Nome, especialidade, login e senha são obrigatórios' 
      });
    }

    // Verificar se login já existe
    const [existingUser] = await db.query(
      'SELECT id_usuario FROM usuario WHERE login = ?', 
      [login]
    );
    if (existingUser) {
      return res.status(400).json({ error: 'Login já está em uso' });
    }

    // Verificar se CRM já existe (se fornecido)
    if (crm) {
      const [existingCrm] = await db.query(
        'SELECT id_profissional FROM profissional WHERE crm = ?', 
        [crm]
      );
      if (existingCrm) {
        return res.status(400).json({ error: 'CRM já cadastrado' });
      }
    }

    // Iniciar transação
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      // Hash da senha
      const senhaHash = await HashUtils.hashSenha(senha);

      // Criar usuário (corrigido: inclui tipo)
      const userSql = `
        INSERT INTO usuario (login, senha_hash, tipo, ativo)
        VALUES (?, ?, 'profissional', TRUE)
      `;
      const [userResult] = await connection.execute(userSql, [login, senhaHash]);
      const userId = userResult.insertId;

      // Criar profissional
      const profSql = `
        INSERT INTO profissional 
        (id_profissional, nome, especialidade, crm, telefone, email)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      await connection.execute(profSql, [
        userId,
        nome,
        especialidade,
        crm || null,
        telefone || null,
        email || null,
      ]);

      // Criar agenda com base nos dias selecionados
      if (Array.isArray(diasSelecionados) && hora_inicio && hora_fim) {
        const agendaSql = `
          INSERT INTO agenda (id_profissional, dia_semana, hora_inicio, hora_fim, ativo)
          VALUES (?, ?, ?, ?, TRUE)
        `;
        for (const dia of diasSelecionados) {
          await connection.execute(agendaSql, [userId, dia, hora_inicio, hora_fim]);
        }
      }

      await connection.commit();

      res.status(201).json({
        message: 'Profissional criado com sucesso',
        profissional_id: userId,
        dados: {
          nome,
          especialidade,
          crm,
          diasSelecionados,
          hora_inicio,
          hora_fim
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
