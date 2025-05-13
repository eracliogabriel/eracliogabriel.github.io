// Elementos do DOM
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

// Menu mobile
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efeito de digitação no texto do hero
const typingSuffix = document.querySelector('.typing-suffix');
const suffixes = ['Java', 'Back End', 'Full Stack'];
let currentSuffixIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentSuffix = suffixes[currentSuffixIndex];
    
    if (isDeleting) {
        typingSuffix.textContent = currentSuffix.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        setTimeout(typeWriter, 50);
    } else {
        typingSuffix.textContent = currentSuffix.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        setTimeout(typeWriter, 100);
    }

    if (!isDeleting && currentCharIndex === currentSuffix.length) {
        setTimeout(() => {
            isDeleting = true;
        }, 2000);
    }

    if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentSuffixIndex = (currentSuffixIndex + 1) % suffixes.length;
    }
}

// Iniciar o efeito de digitação quando a página carregar
window.addEventListener('load', typeWriter);

// Adicionar classe active ao link da navegação atual
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
}); 