const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthMiddleware {
    static gerarToken(usuario) {
        return jwt.sign(
            {
                sub: usuario.id_usuario,
                tipo: usuario.tipo,
                nome: usuario.nome || usuario.login
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
    }

    static verificarToken(req, res, next) {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                error: 'Token não fornecido ou formato inválido' 
            });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.usuario = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ 
                error: 'Token inválido ou expirado' 
            });
        }
    }

    static verificarPaciente(req, res, next) {
        if (req.usuario.tipo !== 'paciente') {
            return res.status(403).json({ 
                error: 'Acesso restrito a pacientes' 
            });
        }
        next();
    }

    static verificarProfissional(req, res, next) {
        if (req.usuario.tipo !== 'profissional') {
            return res.status(403).json({ 
                error: 'Acesso restrito a profissionais' 
            });
        }
        next();
    }

    static verificarAdmin(req, res, next) {
        if (req.usuario.tipo !== 'admin') {
            return res.status(403).json({ 
                error: 'Acesso restrito a administradores' 
            });
        }
        next();
    }
}

module.exports = AuthMiddleware;