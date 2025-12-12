const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 

const { Usuario, Paciente } = require('../db/models');
const AuthMiddleware = require('../middleware/auth');

// Login
router.post('/login', async (req, res) => {
    try {
        console.log('📥 ========== LOGIN REQUEST ==========');
        console.log('📥 Body:', JSON.stringify(req.body, null, 2));
        console.log('📥 Headers:', req.headers['content-type']);
        
        const { login, email, senha } = req.body;

        // Usa email se login não foi fornecido
        const loginField = login || email;
        
        console.log('🔍 Processando:', {
            loginField: loginField,
            temSenha: !!senha
        });
 
        if (!loginField || !senha) {
            console.log('❌ FALHA: loginField ou senha vazios');
            return res.status(400).json({ 
                error: 'Login/Email e senha são obrigatórios' 
            });
        }

        console.log('🔍 Buscando usuário no banco...');
        const usuario = await Usuario.findByLogin(loginField);
        
        console.log('👤 Resultado da busca:', usuario ? 'ENCONTRADO' : 'NÃO ENCONTRADO');
        
        if (!usuario) {
            console.log('❌ Usuário não existe no banco');
            return res.status(401).json({ 
                error: 'Credenciais inválidas' 
            });
        }

        console.log('✅ Usuário encontrado:', {
            id: usuario.id_usuario,
            login: usuario.login,
            email: usuario.email,
            ativo: usuario.ativo
        });

        // Verifica senha
        console.log('🔐 Verificando senha...');
        const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
        
        console.log('🔐 Senha válida?', senhaValida);
        
        if (!senhaValida) {
            console.log('❌ Senha não confere');
            return res.status(401).json({ 
                error: 'Credenciais inválidas' 
            });
        }

        // Verifica se está ativo
        if (!usuario.ativo) {
            console.log('❌ Usuário inativo');
            return res.status(403).json({ 
                error: 'Usuário desativado' 
            });
        }

        // Gera token
        console.log('🎫 Gerando token JWT...');
        const token = AuthMiddleware.gerarToken(usuario);

        console.log('✅ LOGIN BEM-SUCEDIDO para:', usuario.nome);
        
        res.json({
            access_token: token,
            token_type: 'bearer',
            user_id: usuario.id_usuario,
            user_type: usuario.tipo,
            nome: usuario.nome
        });

    } catch (error) {
        console.error(' ERRO NO LOGIN:', error);
        console.error(' Stack:', error.stack);
        res.status(500).json({ 
            error: 'Erro interno do servidor',
            detalhes: error.message 
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

        // Hash da senha 
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