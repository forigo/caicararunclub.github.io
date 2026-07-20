
// CPF
document.getElementById('cpf').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
});

// Validação matemática
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
    // Lógica de cálculo dos dígitos (vermelho)
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
}

//WhatsApp
const inputCelular = document.getElementById('celular');

inputCelular.addEventListener('input', (event) => {
    let input = event.target;
    input.value = aplicarMascaraTelefone(input.value);
});

function aplicarMascaraTelefone(valor) {
    // 1. Remove qualquer caractere que não seja número
    valor = valor.replace(/\D/g, "");

    // 2. Limita o máximo de caracteres para 11 (2 do DDD + 9 do celular)
    if (valor.length > 11) {
        valor = valor.slice(0, 11);
    }

    // 3. Aplica a formatação dinamicamente conforme o usuário digita
    if (valor.length > 10) {
        // Formato de Celular: (XX) XXXXX-XXXX
        valor = valor.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    } else if (valor.length > 5) {
        // Formato intermediário enquanto digita: (XX) XXXXX
        valor = valor.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3");
    } else if (valor.length > 2) {
        // Formato inicial: (XX) X
        valor = valor.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
    } else if (valor.length > 0) {
        // Formato inicial do DDD: (XX
        valor = valor.replace(/^(\d{0,2})$/, "($1");
    }

    return valor;
}

// Success

const meuFormulario = document.querySelector('form');

meuFormulario.addEventListener('submit', async function(evento) {
    evento.preventDefault(); // Impede o recarregamento da página e o envio HTML padrão

    const inputData = document.getElementById('nascimento').value;
    if (!inputData) {
        alert('Por favor, preencha sua data de nascimento.');
        return;
    }

    const cpf = document.getElementById('cpf').value;
    if (!validarCPF(cpf)) {
        alert("CPF Inválido");
    }

    const dataNascimento = new Date(inputData + 'T00:00:00'); // Força a data no fuso local
    const hoje = new Date();
    
    // Validação básica: data não pode ser no futuro
    if (dataNascimento > hoje) {
        alert('A data de nascimento não pode ser no futuro.');
        return;
    }

    if (validarCPF(cpf) && dataNascimento < hoje){
        
        const formData = new FormData(meuFormulario);
            try {
            // 2. Envie os dados para a sua API via AJAX/Fetch
                const resposta = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        // 'Content-Type': 'application/json' (se estiver enviando JSON ao invés de FormData)
                    }
                });

                // 3. Verifique se a API retornou sucesso
                if (resposta.ok) {
                    // 4. Redirecione para a sua página de sucesso
                    window.location.href = '/form/success.html'; 
                } else {
                    alert('Erro ao enviar o formulário. Tente novamente.');
                }
            } catch (erro) {
                console.error('Erro na requisição:', erro);
        }
    }
    
    
});
