document.addEventListener('DOMContentLoaded', () => {
    logEvent('Página completamente carregada');
    
    createBats();
    
    initParallax();
});

function logEvent(event) {
    console.log(`[Evento] ${event}`);
}

document.getElementById('shopBtn').addEventListener('click', (e) => {
    e.preventDefault();
    logEvent('Botão SHOP NOW clicado');
    
    const btn = e.target;
    btn.textContent = 'ENTRE NA ESCURIDÃO...';
    btn.style.backgroundColor = 'var(--purple)';
    
    setTimeout(() => {
        window.location.href = '#collections';
        btn.textContent = 'EXPLORE O ABISMO';
        btn.style.backgroundColor = 'var(--blood)';
    }, 1000);
});

const items = document.querySelectorAll('.item');
items.forEach(item => {
    item.addEventListener('mouseover', () => {
        logEvent(`Mouse sobre ${item.querySelector('.item-title').textContent}`);
    });
    
    item.addEventListener('mouseout', () => {
        logEvent(`Mouse saiu de ${item.querySelector('.item-title').textContent}`);
    });
    
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

document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('productModal').style.display = 'none';
    logEvent('Modal fechado');
});

document.getElementById('addToCart').addEventListener('click', () => {
    const title = document.getElementById('modalTitle').textContent;
    const cartCount = document.querySelector('.cart-count');
    
    cartCount.textContent = parseInt(cartCount.textContent) + 1;
    cartCount.style.animation = 'none';
    void cartCount.offsetWidth; 
    cartCount.style.animation = 'pulse 0.5s';
    
    logEvent(`${title} adicionado ao carrinho`);
    
    setTimeout(() => {
        document.getElementById('productModal').style.display = 'none';
    }, 500);
});

document.getElementById('name').addEventListener('input', (e) => {
    logEvent(`Digitando nome: ${e.target.value}`);
});

document.getElementById('email').addEventListener('input', (e) => {
    logEvent(`Digitando email: ${e.target.value}`);
});

document.getElementById('message').addEventListener('change', (e) => {
    logEvent(`Mensagem alterada: ${e.target.value.substring(0, 20)}...`);
});

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

document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    logEvent(`Formulário enviado por ${name} (${email})`);
    
    alert(`Obrigado, ${name}. Sua mensagem foi enviada aos deuses das trevas.`);
    e.target.reset();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('productModal').style.display = 'none';
        logEvent('Tecla Escape pressionada - modal fechado');
    }
});

window.addEventListener('resize', () => {
    logEvent(`Janela redimensionada para ${window.innerWidth}x${window.innerHeight}`);
});

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

const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.5); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
