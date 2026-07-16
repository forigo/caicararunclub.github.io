
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

document.getElementById('meuFormulario').addEventListener('submit', (e) => {
    e.preventDefault();
    const cpf = document.getElementById('cpf').value;
    if (!validarCPF(cpf)) {
        alert("CPF Inválido");
        }
});

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

//Form

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby_gp5k742SKianMB6emXvccc6uq-svKlnZQVU2tXkox6zQ6hCDPt3ZssLc8U_Fglut/exec"; // Paste your URL here

document.getElementById('meuFormulario').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent standard page reload

  const submitBtn = document.getElementById('submitBtn');
  const messageDiv = document.getElementById('message');
  
  // Disable button to prevent double-submissions
  submitBtn.disabled = true;
  messageDiv.style.display = 'block';
  messageDiv.textContent = 'Sending...';

  // 1. Create data object from form
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  // 2. Send request (Set as text/plain to bypass CORS)
  fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    if (result.result === 'success') {
      messageDiv.textContent = 'Success! Data added to sheet.';
      document.getElementById('meuFormulario').reset(); // Clear form
    } else {
      throw new Error('Server returned an error');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    messageDiv.textContent = 'An error occurred. Please try again.';
  })
  .finally(() => {
    submitBtn.disabled = false; // Re-enable button
  });
});
/*
const scriptURL =                       
      "https://script.google.com/macros/s/AKfycbwhLgoWFPFxGKbrfwOLxZrjmn7fcRrCmr0wKF2QNpEM2PD8vIOwROm_7NAehuSHEDEb/exec";
      const form = document.forms["formulario"];
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        var formData = new FormData(form);

        fetch(scriptURL, { method: "POST", body: formData })
          .then((response) => {
            swal("Done", "Submitted Successfully.", "success");
          })
          .catch((error) => {
            swal("Error", "Something went wrong. please try again!", "error");
          });
      });*/
