function togglePopup() { 
    const overlay = document.getElementById('popupOverlay'); 
    overlay.classList.toggle('show'); 
    closeMenu()
} 

const scriptURL = 'https://script.google.com/macros/s/AKfycbxeFPLslF-rfT0P1KlrW7bGDM4FTFa6BObf_Po-TdCFCQOoRtqeCTlQmFAkmMt1VqaI/exec'
const form = document.forms['cadastro-litoralemdobro']

/*
form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert('Para finalizar o cadastro entre no nosso grupo do whatsapp.', response ))
  .then(window.open('https://www.w3schools.com', '_blank'))
  .then(togglePopup)
  .catch(error => console.error('Erro no envio dos dados!', error.message))
  form.reset()
})*/

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  if (window.confirm('Entre no nosso grupo do whatsapp para confirmar seu cadastro.'))
  { window.open('http://www.google.com', '_blank');};
  togglePopup()
  .catch(error => console.error('Erro no envio dos dados!', error.message))
  form.reset()
})

const handlePhone = (event) => {
  let input = event.target
  input.value = phoneMask(input.value)
}

const phoneMask = (value) => {
  if (!value) return ""
  value = value.replace(/\D/g,'')
  value = value.replace(/(\d{2})(\d)/,"($1) $2")
  value = value.replace(/(\d)(\d{4})$/,"$1-$2")
  return value
}