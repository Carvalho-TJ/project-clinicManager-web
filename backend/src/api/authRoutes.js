const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt'); // IMPORTE DIRETO DO BCRYPT
const { Usuario, Paciente } = require('../db/models');
const AuthMiddleware = require('../middleware/auth');

// Login
router.post('/login', async (req, res) => {
    try {
        const { login, senha } = req.body;
        
        if (!login || !senha) {
            return res.status(400).json({ 
                error: 'Login e senha são obrigatórios' 
            });
        }

        // Busca usuário
        const usuario = await Usuario.findByLogin(login);
        
        if (!usuario) {
            return res.status(401).json({ 
                error: 'Credenciais inválidas' 
            });
        }

        // Verifica senha - USANDO BCRYPT DIRETAMENTE
        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
        
        if (!senhaValida) {
            return res.status(401).json({ 
                error: 'Credenciais inválidas' 
            });
        }

        // Verifica se está ativo
        if (!usuario.ativo) {
            return res.status(403).json({ 
                error: 'Usuário desativado' 
            });
        }

        // Gera token
        const token = AuthMiddleware.gerarToken(usuario);

        res.json({
            access_token: token,
            token_type: 'bearer',
            user_id: usuario.id_usuario,
            user_type: usuario.tipo,
            nome: usuario.nome
        });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ 
            error: 'Erro interno do servidor' 
        });
    }
});

// Registrar paciente
router.post('/registrar-paciente', async (req, res) => {
    try {
        const { nome, cpf, data_nasc, estado_civil, telefone, email, login, senha } = req.body;
        
        // Validações básicas
        if (!nome || !login || !senha) {
            return res.status(400).json({ 
                error: 'Nome, login e senha são obrigatórios' 
            });
        }

        // Verifica se login já existe
        const usuarioExistente = await Usuario.findByLogin(login);
        if (usuarioExistente) {
            return res.status(400).json({ 
                error: 'Login já está em uso' 
            });
        }

        // Verifica se CPF já existe
        if (cpf) {
            const cpfExistente = await Paciente.checkCpfExists(cpf);
            if (cpfExistente) {
                return res.status(400).json({ 
                    error: 'CPF já cadastrado' 
                });
            }
        }

        // Hash da senha - USANDO BCRYPT DIRETAMENTE
        const saltRounds = 10;
        const senhaHash = await bcrypt.hash(senha, saltRounds);

        // Cria usuário
        const usuarioId = await Usuario.create(login, senhaHash, 'paciente');

        // Cria paciente
        await Paciente.create(usuarioId, {
            nome,
            cpf,
            data_nasc,
            estado_civil,
            telefone,
            email
        });

        // Busca usuário para gerar token
        const novoUsuario = await Usuario.findByLogin(login);
        const token = AuthMiddleware.gerarToken(novoUsuario);

        res.status(201).json({
            message: 'Paciente registrado com sucesso',
            user_id: usuarioId,
            access_token: token,
            token_type: 'bearer'
        });

    } catch (error) {
        console.error('Erro no registro:', error);
        res.status(500).json({ 
            error: 'Erro interno do servidor' 
        });
    }
});

// Verificar token (endpoint protegido para teste)
router.get('/verificar', AuthMiddleware.verificarToken, (req, res) => {
    res.json({
        message: 'Token válido',
        usuario: req.usuario
    });
});

module.exports = router;