const cors = require('cors');
require('dotenv').config();

const ApiMiddleware = {
    configurarCORS: () => {
        return cors({
            origin: process.env.FRONTEND_URL || 'http://localhost:3000',
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization']
        });
    },

    configurarJSON: (express) => {
        return express.json({ limit: '10mb' });
    },

    configurarURLEncoded: (express) => {
        return express.urlencoded({ extended: true, limit: '10mb' });
    },

    tratarErros: (err, req, res, next) => {
        console.error('Erro na API:', err);
        
        if (err.name === 'ValidationError') {
            return res.status(400).json({ 
                error: 'Erro de validação', 
                detalhes: err.message 
            });
        }
        
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ 
                error: 'Registro duplicado', 
                detalhes: 'O registro já existe no sistema' 
            });
        }
        
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                error: 'Token inválido' 
            });
        }
        
        return res.status(500).json({ 
            error: 'Erro interno do servidor',
            message: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    },

    rotaNaoEncontrada: (req, res) => {
        res.status(404).json({ 
            error: 'Rota não encontrada',
            path: req.path,
            method: req.method
        });
    }
};

// Exporta o objeto completo
module.exports = ApiMiddleware;