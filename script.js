// Elementos Globais
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
const header = document.getElementById('main-header');
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section[id]');

// Modal
const modal = document.getElementById('modal');
const modalTriggers = document.querySelectorAll('.btn-trigger-modal');
const closeModal = document.getElementById('close-modal');
const bookingForm = document.getElementById('booking-form');
const successMsg = document.getElementById('success');

// 1. Inicialização (Tema e Animações)
window.addEventListener('DOMContentLoaded', () => {
    // Restaurar Tema Salvo
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        updateThemeUI(true);
    }
    
    // Iniciar Scroll Observer
    initScrollAnimations();
});

// 2. Controle de Tema (Dark/Light)
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = body.getAttribute('data-theme') === 'dark';
        if (isDark) {
            body.removeAttribute('data-theme');
            updateThemeUI(false);
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            updateThemeUI(true);
            localStorage.setItem('theme', 'dark');
        }
    });
}

function updateThemeUI(isDark) {
    const icon = themeToggle.querySelector('i');
    const span = themeToggle.querySelector('span');
    if (isDark) {
        icon.classList.replace('fa-moon', 'fa-sun');
        span.textContent = 'Modo Claro';
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        span.textContent = 'Modo Escuro';
    }
}

// 3. Efeito Dinâmico do Header
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Atualizar ScrollSpy
    updateScrollSpy();
});

// 4. Menu Mobile (Hamburguer)
if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    });
}

if (overlay) {
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    });
}

// Auto-fechar ao clicar em item do menu
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        }
    });
});

// 5. Redes Sociais Funcionais
window.socialLink = function(platform) {
    const actions = {
        ig: () => window.open('https://instagram.com/yasminclinica', '_blank'),
        wa: () => window.open('https://wa.me/5500000000000', '_blank'),
        em: () => window.location.href = 'mailto:contato@yasminclinica.com.br'
    };
    
    if (actions[platform]) actions[platform]();
};

// 6. Modal de Agendamento Premium
modalTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.add('active');
        bookingForm.style.display = 'block';
        successMsg.style.display = 'none';
    });
});

if (closeModal) {
    closeModal.addEventListener('click', () => modal.classList.remove('active'));
}

window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
});

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        bookingForm.style.display = 'none';
        successMsg.style.display = 'block';
        
        // Timer para fechar modal
        setTimeout(() => {
            modal.classList.remove('active');
        }, 3500);
    });
}

// 7. ScrollSpy (Highlight do Menu Lateral)
function updateScrollSpy() {
    let scrollPos = window.scrollY + 150;
    sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < (section.offsetTop + section.offsetHeight)) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.querySelector('a').getAttribute('href') === `#${section.id}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// 8. Intersection Observer para Ativar Animações
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-up').forEach(el => {
        observer.observe(el);
    });
}

console.log('Yasmin Clínica — Experiência Premium Finalizada com Sucesso');
