// Eventos implementados
document.addEventListener('DOMContentLoaded', () => {
    // 1. Evento load
    logEvent('Página completamente carregada');
    
    // Animação de morcegos voando
    createBats();
    
    // Inicializa efeitos parallax
    initParallax();
});

// Log de eventos
function logEvent(event) {
    console.log(`[Evento] ${event}`);
}

// 2. Evento click
document.getElementById('shopBtn').addEventListener('click', (e) => {
    e.preventDefault();
    logEvent('Botão SHOP NOW clicado');
    
    // Efeito especial
    const btn = e.target;
    btn.textContent = 'ENTRE NA ESCURIDÃO...';
    btn.style.backgroundColor = 'var(--purple)';
    
    setTimeout(() => {
        window.location.href = '#collections';
        btn.textContent = 'EXPLORE O ABISMO';
        btn.style.backgroundColor = 'var(--blood)';
    }, 1000);
});

// 3. Evento mouseover para itens da coleção
const items = document.querySelectorAll('.item');
items.forEach(item => {
    item.addEventListener('mouseover', () => {
        logEvent(`Mouse sobre ${item.querySelector('.item-title').textContent}`);
    });
    
    // 4. Evento mouseout
    item.addEventListener('mouseout', () => {
        logEvent(`Mouse saiu de ${item.querySelector('.item-title').textContent}`);
    });
    
    // 5. Evento click para abrir modal
    item.addEventListener('click', (e) => {
        if (!e.target.classList.contains('item-btn')) {
            const title = item.querySelector('.item-title').textContent;
            const imgSrc = item.querySelector('img').src;
            
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalImage').src = imgSrc;
            
            const modal = document.getElementById('productModal');
            modal.style.display = 'block';
            
            logEvent(`Item ${title} clicado`);
        }
    });
});

// 6. Evento para fechar modal
document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('productModal').style.display = 'none';
    logEvent('Modal fechado');
});

// 7. Evento para adicionar ao carrinho
document.getElementById('addToCart').addEventListener('click', () => {
    const title = document.getElementById('modalTitle').textContent;
    const cartCount = document.querySelector('.cart-count');
    
    cartCount.textContent = parseInt(cartCount.textContent) + 1;
    cartCount.style.animation = 'none';
    void cartCount.offsetWidth; // Trigger reflow
    cartCount.style.animation = 'pulse 0.5s';
    
    logEvent(`${title} adicionado ao carrinho`);
    
    setTimeout(() => {
        document.getElementById('productModal').style.display = 'none';
    }, 500);
});

// 8. Evento input para campos de formulário
document.getElementById('name').addEventListener('input', (e) => {
    logEvent(`Digitando nome: ${e.target.value}`);
});

document.getElementById('email').addEventListener('input', (e) => {
    logEvent(`Digitando email: ${e.target.value}`);
});

// 9. Evento change para textarea
document.getElementById('message').addEventListener('change', (e) => {
    logEvent(`Mensagem alterada: ${e.target.value.substring(0, 20)}...`);
});

// 10. Evento focus/blur para campos de formulário
const formInputs = document.querySelectorAll('input, textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.querySelector('.input-icon').style.color = 'var(--gold)';
        logEvent(`Campo ${input.id} em foco`);
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.querySelector('.input-icon').style.color = 'var(--blood)';
        logEvent(`Campo ${input.id} perdeu o foco`);
    });
});

// 11. Evento submit para formulário
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    logEvent(`Formulário enviado por ${name} (${email})`);
    
    alert(`Obrigado, ${name}. Sua mensagem foi enviada aos deuses das trevas.`);
    e.target.reset();
});

// 12. Evento keydown para document
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('productModal').style.display = 'none';
        logEvent('Tecla Escape pressionada - modal fechado');
    }
});

// 13. Evento resize
window.addEventListener('resize', () => {
    logEvent(`Janela redimensionada para ${window.innerWidth}x${window.innerHeight}`);
});

// Efeito de morcegos voando
function createBats() {
    const bats = ['🦇', '🦇', '🦇', '🦇'];
    const body = document.body;
    
    bats.forEach((bat, index) => {
        const batElement = document.createElement('div');
        batElement.textContent = bat;
        batElement.style.position = 'fixed';
        batElement.style.fontSize = '20px';
        batElement.style.zIndex = '50';
        batElement.style.opacity = '0.7';
        batElement.style.animation = `fly${index + 1} 15s linear infinite`;
        
        body.appendChild(batElement);
        
        // Adicionar keyframes dinamicamente
        const style = document.createElement('style');
        const startLeft = Math.random() * 100;
        const startTop = Math.random() * 100;
        
        style.textContent = `
            @keyframes fly${index + 1} {
                0% { left: ${startLeft}vw; top: ${startTop}vh; transform: scaleX(1); }
                25% { left: ${(startLeft + 20) % 100}vw; top: ${(startTop + 30) % 100}vh; transform: scaleX(-1); }
                50% { left: ${(startLeft + 60) % 100}vw; top: ${(startTop + 10) % 100}vh; transform: scaleX(1); }
                75% { left: ${(startLeft + 30) % 100}vw; top: ${(startTop + 50) % 100}vh; transform: scaleX(-1); }
                100% { left: ${startLeft}vw; top: ${startTop}vh; transform: scaleX(1); }
            }
        `;
        
        document.head.appendChild(style);
    });
}

// Efeito parallax
function initParallax() {
    const layers = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        layers.forEach(layer => {
            const speed = parseFloat(layer.getAttribute('data-speed'));
            const xPos = x * speed * 100;
            const yPos = y * speed * 100;
            
            layer.style.transform = `translate(${xPos}px, ${yPos}px)`;
        });
    });
}

// Adicionar animação de pulse
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.5); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);