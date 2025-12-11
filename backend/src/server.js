const express = require('express');
require('dotenv').config();

// Importar middleware e rotas
const ApiMiddleware = require('./middleware/api'); // Agora importa o objeto completo
const authRoutes = require('./api/authRoutes');
const pacienteRoutes = require('./api/pacienteRoutes');
const agendamentoRoutes = require('./api/agendamentoRoutes');
const especialidadeRoutes = require('./api/especialidadeRoutes');
const tipoAtendimentoRoutes = require('./api/tipoAtendimentoRoutes');
const agendaRoutes = require('./api/agendaRoutes');
const profissionalRoutes = require('./api/profissionalRoutes');


// Criar aplicação Express
const app = express();
const PORT = process.env.PORT || 3001;

// Configurar middleware
app.use(ApiMiddleware.configurarCORS()); // Agora funciona!
app.use(ApiMiddleware.configurarJSON(express));
app.use(ApiMiddleware.configurarURLEncoded(express));

// Middleware de logging (útil para debug)
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Rotas
app.get('/', (req, res) => {
    res.json({ 
        message: 'ClinicManager API está funcionando!',
        version: '1.0.0',
        rotas_disponiveis: {
            autenticacao: '/api/auth',
            paciente: '/api/paciente',
            agendamentos: '/api/agendamentos',
            especialidades: '/api/especialidades',
            tipos_atendimento: '/api/tipos-atendimento',
            agenda: '/api/agenda'
        }
    });
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        service: 'ClinicManager API',
        timestamp: new Date().toISOString()
    });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/paciente', pacienteRoutes);
app.use('/api/agendamentos', agendamentoRoutes);
app.use('/api/especialidades', especialidadeRoutes);
app.use('/api/tipos-atendimento', tipoAtendimentoRoutes);
app.use('/api/agenda', agendaRoutes);
app.use('/api/profissionais', profissionalRoutes);


// Middleware de tratamento de erros
app.use(ApiMiddleware.tratarErros);

// Rota não encontrada
app.use('*', ApiMiddleware.rotaNaoEncontrada);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor rodando na porta ${PORT}`);
    console.log(`📚 Documentação disponível em http://localhost:${PORT}`);
    console.log(`🌐 Frontend configurado para: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});

// Tratamento de sinais de término
process.on('SIGTERM', () => {
    console.log('🛑 Servidor recebeu SIGTERM, encerrando...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 Servidor recebeu SIGINT, encerrando...');
    process.exit(0);
});

module.exports = app;