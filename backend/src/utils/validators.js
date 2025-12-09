class Validators {
    static validarCPF(cpf) {
        if (!cpf) return false;
        
        cpf = cpf.replace(/[^\d]/g, '');
        
        if (cpf.length !== 11) return false;
        
        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1+$/.test(cpf)) return false;
        
        // Validação do CPF
        let soma = 0;
        let resto;
        
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;
        
        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;
        
        return true;
    }

    static validarTelefone(telefone) {
        if (!telefone) return false;
        
        // Remove caracteres não numéricos
        const numeros = telefone.replace(/\D/g, '');
        
        // Celular: 11 dígitos (DDD + 9 + número)
        // Fixo: 10 dígitos (DDD + número)
        return numeros.length === 10 || numeros.length === 11;
    }

    static validarEmail(email) {
        if (!email) return false;
        
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    static validarDataNascimento(data) {
        if (!data) return false;
        
        const dataObj = new Date(data);
        const hoje = new Date();
        
        // Data não pode ser no futuro
        if (dataObj > hoje) return false;
        
        // Calcular idade
        const idade = hoje.getFullYear() - dataObj.getFullYear();
        const mes = hoje.getMonth() - dataObj.getMonth();
        
        if (mes < 0 || (mes === 0 && hoje.getDate() < dataObj.getDate())) {
            idade--;
        }
        
        // Mínimo 0 anos, máximo 150 anos
        return idade >= 0 && idade <= 150;
    }
}

module.exports = Validators;