// utils/gerar-hash.js - CommonJS version
const bcrypt = require('bcryptjs');

class HashUtils {
    /**
     * Gera hash para uma senha
     * @param {string} senha - Senha em texto plano
     * @returns {Promise<string>} Hash da senha
     */
    static async hashSenha(senha) {
        const saltRounds = 10;
        return await bcrypt.hash(senha, saltRounds);
    }

    /**
     * Compara senha com hash
     * @param {string} senha - Senha em texto plano
     * @param {string} hash - Hash armazenado
     * @returns {Promise<boolean>} true se a senha corresponde
     */
    static async compararSenha(senha, hash) {
        return await bcrypt.compare(senha, hash);
    }

    /**
     * Função de teste (opcional)
     */
    static async test() {
        const senhaTeste = '123456';
        const hash = await this.hashSenha(senhaTeste);
        console.log('Senha:', senhaTeste);
        console.log('Hash:', hash);
        
        const valida = await this.compararSenha(senhaTeste, hash);
        console.log('Senha válida?:', valida);
        
        return hash;
    }
}

// Executa teste se rodado diretamente
if (require.main === module) {
    HashUtils.test();
}

module.exports = HashUtils;