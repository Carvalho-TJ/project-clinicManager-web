class Usuario {
    static table = 'usuario';
    
    static async create(login, senhaHash, tipo) {
        const db = require('./database');
        const sql = `
            INSERT INTO usuario (login, senha_hash, tipo, ativo)
            VALUES (?, ?, ?, TRUE)
        `;
        const result = await db.query(sql, [login, senhaHash, tipo]);
        return result.insertId;
    }

    static async findByLogin(login) {
        const db = require('./database');
        const sql = `
            SELECT u.id_usuario, u.login, u.senha_hash, u.tipo, u.ativo,
                   COALESCE(p.nome, prof.nome) as nome
            FROM usuario u
            LEFT JOIN paciente p ON u.id_usuario = p.id_paciente
            LEFT JOIN profissional prof ON u.id_usuario = prof.id_profissional
            WHERE u.login = ?
        `;
        const rows = await db.query(sql, [login]);
        return rows[0];
    }

    static async findById(id) {
        const db = require('./database');
        const sql = 'SELECT * FROM usuario WHERE id_usuario = ?';
        const rows = await db.query(sql, [id]);
        return rows[0];
    }
}

class Paciente {
    static table = 'paciente';
    
    static async create(usuarioId, data) {
        const db = require('./database');
        const sql = `
            INSERT INTO paciente 
            (id_paciente, nome, cpf, data_nasc, estado_civil, telefone, email)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        await db.query(sql, [
            usuarioId,
            data.nome,
            data.cpf || null,
            data.data_nasc || null,
            data.estado_civil || null,
            data.telefone || null,
            data.email || null
        ]);
    }

    static async findById(id) {
        const db = require('./database');
        const sql = `
            SELECT * FROM paciente 
            WHERE id_paciente = ? AND deleted_at IS NULL
        `;
        const rows = await db.query(sql, [id]);
        return rows[0];
    }

    static async update(id, data) {
        const db = require('./database');
        const sql = `
            UPDATE paciente 
            SET nome = ?, cpf = ?, data_nasc = ?, estado_civil = ?,
                telefone = ?, email = ?, updated_at = NOW()
            WHERE id_paciente = ?
        `;
        await db.query(sql, [
            data.nome,
            data.cpf || null,
            data.data_nasc || null,
            data.estado_civil || null,
            data.telefone || null,
            data.email || null,
            id
        ]);
    }

    static async checkCpfExists(cpf, excludeId = null) {
        const db = require('./database');
        let sql = 'SELECT id_paciente FROM paciente WHERE cpf = ?';
        const params = [cpf];
        
        if (excludeId) {
            sql += ' AND id_paciente != ?';
            params.push(excludeId);
        }
        
        const rows = await db.query(sql, params);
        return rows.length > 0;
    }
}

class Endereco {
    static table = 'endereco';
    
    static async create(pacienteId, data) {
        const db = require('./database');
        const sql = `
            INSERT INTO endereco 
            (id_paciente, rua, bairro, numero, cep, cidade, estado, complemento, tipo_endereco)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const result = await db.query(sql, [
            pacienteId,
            data.rua,
            data.bairro || null,
            data.numero || null,
            data.cep || null,
            data.cidade || null,
            data.estado || null,
            data.complemento || null,
            data.tipo_endereco || 'residencial'
        ]);
        return result.insertId;
    }

    static async findByPacienteId(pacienteId) {
        const db = require('./database');
        const sql = `
            SELECT * FROM endereco 
            WHERE id_paciente = ? 
            ORDER BY tipo_endereco, created_at
        `;
        return await db.query(sql, [pacienteId]);
    }

    static async delete(id, pacienteId) {
        const db = require('./database');
        const sql = `
            DELETE FROM endereco 
            WHERE id_endereco = ? AND id_paciente = ?
        `;
        const result = await db.query(sql, [id, pacienteId]);
        return result.affectedRows > 0;
    }
}

class Profissional {
    static table = 'profissional';
    
    static async findAllActive() {
        const db = require('./database');
        const sql = `
            SELECT p.id_profissional, p.nome, p.especialidade, p.crm
            FROM profissional p
            JOIN usuario u ON p.id_profissional = u.id_usuario
            WHERE u.ativo = TRUE AND p.deleted_at IS NULL
            ORDER BY p.nome
        `;
        return await db.query(sql);
    }

    static async findById(id) {
        const db = require('./database');
        const sql = `
            SELECT p.* FROM profissional p
            JOIN usuario u ON p.id_profissional = u.id_usuario
            WHERE p.id_profissional = ? AND u.ativo = TRUE
        `;
        const rows = await db.query(sql, [id]);
        return rows[0];
    }
}

class Agendamento {
    static table = 'agendamento';
    
    static async create(data) {
        const db = require('./database');
        const sql = `
            INSERT INTO agendamento 
            (id_paciente, id_profissional, data_hora, duracao_min, status, criado_por)
            VALUES (?, ?, ?, ?, 'solicitado', ?)
        `;
        const result = await db.query(sql, [
            data.id_paciente,
            data.id_profissional,
            data.data_hora,
            data.duracao_min || 30,
            data.id_paciente
        ]);
        return result.insertId;
    }

    static async findByPacienteId(pacienteId, status = null) {
        const db = require('./database');
        let sql = `
            SELECT a.*, p.nome as profissional_nome
            FROM agendamento a
            JOIN profissional p ON a.id_profissional = p.id_profissional
            WHERE a.id_paciente = ? AND a.deleted_at IS NULL
        `;
        const params = [pacienteId];
        
        if (status) {
            sql += ' AND a.status = ?';
            params.push(status);
        }
        
        sql += ' ORDER BY a.data_hora DESC';
        return await db.query(sql, params);
    }

    static async findByIdAndPaciente(id, pacienteId) {
        const db = require('./database');
        const sql = `
            SELECT * FROM agendamento 
            WHERE id_agendamento = ? AND id_paciente = ?
        `;
        const rows = await db.query(sql, [id, pacienteId]);
        return rows[0];
    }

    static async updateStatus(id, status, atualizadoPor) {
        const db = require('./database');
        const sql = `
            UPDATE agendamento 
            SET status = ?, atualizado_por = ?, updated_at = NOW()
            WHERE id_agendamento = ?
        `;
        await db.query(sql, [status, atualizadoPor, id]);
    }

    static async checkDisponibilidade(profissionalId, dataInicio, dataFim, excludeId = null) {
        const db = require('./database');
        let sql = `
            SELECT 1 FROM agendamento 
            WHERE id_profissional = ? 
            AND data_hora < ? 
            AND DATE_ADD(data_hora, INTERVAL duracao_min MINUTE) > ?
            AND status IN ('solicitado', 'confirmado')
            AND deleted_at IS NULL
        `;
        const params = [profissionalId, dataFim, dataInicio];
        
        if (excludeId) {
            sql += ' AND id_agendamento != ?';
            params.push(excludeId);
        }
        
        const rows = await db.query(sql, params);
        return rows.length > 0;

        
    }

    static async findByEspecialidade(especialidade, tipoAtendimento = null) {
        const db = require('./database');
        let sql = `
            SELECT p.id_profissional, p.nome, p.especialidade, p.crm,
                   p.telefone, p.email, p.tipo_atendimento,
                   COALESCE(p.preco_consulta, 0) as preco_consulta
            FROM profissional p
            JOIN usuario u ON p.id_profissional = u.id_usuario
            WHERE p.especialidade = ? 
                AND u.ativo = TRUE 
                AND p.deleted_at IS NULL
        `;
        const params = [especialidade];
        
        if (tipoAtendimento) {
            sql += ' AND p.tipo_atendimento = ?';
            params.push(tipoAtendimento);
        }
        
        sql += ' ORDER BY p.nome';
        
        return await db.query(sql, params);
    }  

    static async getTiposAtendimento() {
        const db = require('./database');
        const sql = `
            SELECT DISTINCT tipo_atendimento 
            FROM profissional 
            WHERE deleted_at IS NULL
            ORDER BY tipo_atendimento
        `;
        const rows = await db.query(sql);
        return rows.map(row => row.tipo_atendimento);
    }
}

class FluxoAgendamento {
    static async getDadosParaConfirmacao(agendamentoId, pacienteId) {
        const db = require('./database');
        const sql = `
            SELECT 
                a.id_agendamento,
                a.data_hora,
                a.duracao_min,
                a.tipo_atendimento,
                a.especialidade,
                a.status,
                
                p.nome as paciente_nome,
                p.cpf,
                p.email as paciente_email,
                p.telefone as paciente_telefone,
                p.data_nasc,
                p.estado_civil,
                
                e.rua,
                e.numero,
                e.bairro,
                e.cidade,
                e.estado,
                e.cep,
                e.complemento,
                
                prof.nome as profissional_nome,
                prof.especialidade,
                prof.tipo_atendimento,
                prof.crm,
                COALESCE(prof.preco_consulta, 0) as preco_consulta
                
            FROM agendamento a
            JOIN paciente p ON a.id_paciente = p.id_paciente
            LEFT JOIN endereco e ON p.id_paciente = e.id_paciente 
                AND e.tipo_endereco = 'residencial'
            JOIN profissional prof ON a.id_profissional = prof.id_profissional
            WHERE a.id_agendamento = ? 
            AND a.id_paciente = ?
            AND a.deleted_at IS NULL
        `;
        
        const [dados] = await db.query(sql, [agendamentoId, pacienteId]);
        return dados;
    }
}

class Agenda {
    static table = 'agenda';
    
    static async findByProfissionalAndDia(profissionalId, diaSemana) {
        const db = require('./database');
        const sql = `
            SELECT hora_inicio, hora_fim 
            FROM agenda 
            WHERE id_profissional = ? AND dia_semana = ? AND ativo = TRUE
            ORDER BY hora_inicio
        `;
        return await db.query(sql, [profissionalId, diaSemana]);
    }
}

module.exports = {
    Usuario,
    Paciente,
    Endereco,
    Profissional,
    Agendamento,
    Agenda
};