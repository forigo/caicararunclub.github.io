window.addEventListener('scroll', onScroll)

onScroll()
function onScroll() {
    showNavOnScroll()
    showBackToTopButtonOnScroll()

    activeMenuAtCurrentSection(home)
    activeMenuAtCurrentSection(about)
    activeMenuAtCurrentSection(events)
    activeMenuAtCurrentSection(garra)
}

function activeMenuAtCurrentSection(section) {
    //cria a linha imaginaria - dividindo a viewport (innerHeight) por 2
    const targetLine = scrollY + innerHeight / 2

    //verifica se a seçao top passou da linha
    const sectionTop = section.offsetTop 
    const sectionHeight = section.offsetHeight 

    const sectionTopReachOrPassedTargetline = targetLine >= sectionTop

    //verifica se a parte de baixo da secao passou da linha
    const sectionEndsAt = sectionTop + sectionHeight
    const sectionEndPassedTargetline = sectionEndsAt <= targetLine

    const sectionBoundaries = sectionTopReachOrPassedTargetline && !sectionEndPassedTargetline

    const sectionId = section.getAttribute('id')
    const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`)

    menuElement.classList.remove('active')
    if (sectionBoundaries) {
        menuElement.classList.add('active')
    }
}

function showNavOnScroll() {
    if (scrollY > 0) {
        document.getElementById("navigation").classList.add('scroll')
    } else {
        document.getElementById("navigation").classList.remove('scroll')
    }
}

function showBackToTopButtonOnScroll() {
    if (scrollY > 500) {
        backToTopButton.classList.add('show')
        } else {
        backToTopButton.classList.remove('show')
        }
}

function openMenu() {
    document.body.classList.add('menu-expanded')
}

function closeMenu() {
    document.body.classList.remove('menu-expanded')
}

// Seleciona o botão e a imagem (ajuste o seletor da imagem se necessário)
const whatsappButton = document.querySelector('#whatsapp .button');
const whatsappImg = document.querySelector('#whatsapp .banner-desktop img');
const whatsappImgMobile = document.querySelector('#whatsapp .banner-mobile img');

// Verifica se ambos os elementos existem na página
if (whatsappButton && whatsappImg) {
    
    // Quando o mouse entra no botão
    whatsappButton.addEventListener('mouseenter', () => {
        whatsappImg.style.filter = 'none';
    });

    // Quando o mouse sai do botão
    whatsappButton.addEventListener('mouseleave', () => {
        whatsappImg.style.filter = 'blur(5px)';
    });
}

if (whatsappButton && whatsappImgMobile) {
    
    // Quando o mouse entra no botão
    whatsappButton.addEventListener('mouseenter', () => {
        whatsappImgMobile.style.filter = 'none';
    });

    // Quando o mouse sai do botão
    whatsappButton.addEventListener('mouseleave', () => {
        whatsappImgMobile.style.filter = 'blur(5px)';
    });
}


