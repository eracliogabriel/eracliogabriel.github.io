// Controle da Galeria
document.addEventListener('DOMContentLoaded', function() {
    const galleryOverlay = document.querySelector('.gallery-overlay');
    const galleryImages = document.querySelectorAll('.gallery-image');
    const galleryDots = document.querySelectorAll('.gallery-dot');
    const prevButton = document.querySelector('.gallery-prev');
    const nextButton = document.querySelector('.gallery-next');
    const closeButton = document.querySelector('.gallery-close');
    let currentImageIndex = 0;

    // Abrir galeria ao clicar na imagem do parafuso
    const parafusoThumb = document.querySelector('.product-image[data-gallery="parafusos"]');
    if (parafusoThumb && galleryOverlay) {
        parafusoThumb.addEventListener('click', function() {
            galleryOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Fechar galeria
    if (closeButton && galleryOverlay) {
        closeButton.addEventListener('click', function() {
            galleryOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Navegação entre imagens
    function showImage(index) {
        galleryImages.forEach(img => img.classList.remove('active'));
        galleryDots.forEach(dot => dot.classList.remove('active'));
        galleryImages[index].classList.add('active');
        galleryDots[index].classList.add('active');
        currentImageIndex = index;
    }

    if (prevButton) {
        prevButton.addEventListener('click', function() {
            let newIndex = currentImageIndex - 1;
            if (newIndex < 0) newIndex = galleryImages.length - 1;
            showImage(newIndex);
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function() {
            let newIndex = currentImageIndex + 1;
            if (newIndex >= galleryImages.length) newIndex = 0;
            showImage(newIndex);
        });
    }

    // Navegação pelos dots
    galleryDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showImage(index));
    });

    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (!galleryOverlay || !galleryOverlay.classList.contains('active')) return;
        if (e.key === 'ArrowLeft' && prevButton) {
            prevButton.click();
        } else if (e.key === 'ArrowRight' && nextButton) {
            nextButton.click();
        } else if (e.key === 'Escape' && closeButton) {
            closeButton.click();
        }
    });
});

// Função utilitária para posicionar o menu para cima se não houver espaço
function posicionarMenu(menu, trigger) {
    // Remove classe top antes de calcular
    menu.classList.remove('top');
    // Torna o menu visível mas transparente para medir
    menu.style.visibility = 'hidden';
    menu.style.display = 'flex';
    menu.style.opacity = '0';
    const rect = menu.getBoundingClientRect();
    const triggerRect = trigger.getBoundingClientRect();
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    if (spaceBelow < rect.height + 20 && spaceAbove > rect.height + 20) {
        menu.classList.add('top');
    }
    // Esconde novamente antes de ativar
    menu.style.visibility = '';
    menu.style.display = '';
    menu.style.opacity = '';
}

// Função para abrir o modal de opções
function abrirModalOpcoes(tipo, valor) {
    const modal = document.getElementById('modal-opcoes');
    const btnCopiar = document.getElementById('modal-copiar');
    const btnAbrir = document.getElementById('modal-abrir');
    const btnFechar = document.getElementById('modal-fechar');
    // Limpa listeners antigos
    btnCopiar.replaceWith(btnCopiar.cloneNode(true));
    btnAbrir.replaceWith(btnAbrir.cloneNode(true));
    btnFechar.replaceWith(btnFechar.cloneNode(true));
    const btnCopiarNovo = document.getElementById('modal-copiar');
    const btnAbrirNovo = document.getElementById('modal-abrir');
    const btnFecharNovo = document.getElementById('modal-fechar');
    // Define textos e ações
    if (tipo === 'whatsapp') {
        btnCopiarNovo.textContent = 'Copiar número';
        btnAbrirNovo.textContent = 'Abrir no WhatsApp';
        btnCopiarNovo.onclick = function() {
            navigator.clipboard.writeText('+' + '55' + valor);
            fecharModalOpcoes();
            mostrarModalCopiado('Número copiado para a área de transferência');
        };
        btnAbrirNovo.onclick = function() {
            const mensagem = encodeURIComponent('Tenho interesse em saber mais sobre a DC.');
            const linkWa = `https://wa.me/55${valor}?text=${mensagem}`;
            window.open(linkWa, '_blank');
            fecharModalOpcoes();
        };
    } else if (tipo === 'email') {
        btnCopiarNovo.textContent = 'Copiar e-mail';
        btnAbrirNovo.textContent = 'Abrir no aplicativo';
        btnCopiarNovo.onclick = function() {
            navigator.clipboard.writeText(valor);
            fecharModalOpcoes();
            mostrarModalCopiado('E-mail copiado para a área de transferência');
        };
        btnAbrirNovo.onclick = function() {
            window.open('mailto:' + valor, '_blank');
            fecharModalOpcoes();
        };
    }
    btnFecharNovo.textContent = 'Fechar';
    btnFecharNovo.onclick = fecharModalOpcoes;
    modal.style.display = 'flex';
    setTimeout(() => { modal.classList.add('active'); }, 10);
    // Fecha ao clicar fora
    modal.onclick = function(e) {
        if (e.target === modal) fecharModalOpcoes();
    };
}
function fecharModalOpcoes() {
    const modal = document.getElementById('modal-opcoes');
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; }, 200);
}
function mostrarModalCopiado(msg) {
    const modal = document.getElementById('modal-copiado');
    if (modal) {
        modal.textContent = msg;
        modal.classList.add('active');
        setTimeout(() => {
            modal.classList.remove('active');
            modal.textContent = 'Número copiado para a área de transferência';
        }, 1500);
    }
}
// Substitui submenus por modal para WhatsApp e e-mail
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.whatsapp-link .whatsapp-number').forEach(spanNumero => {
        const numero = spanNumero.textContent.replace(/\D/g, '');
        spanNumero.style.cursor = 'pointer';
        spanNumero.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            abrirModalOpcoes('whatsapp', numero);
        };
    });
    document.querySelectorAll('.contact-email .email-address').forEach(spanEmail => {
        const email = spanEmail.textContent.trim();
        spanEmail.style.cursor = 'pointer';
        spanEmail.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            abrirModalOpcoes('email', email);
        };
    });
}); 