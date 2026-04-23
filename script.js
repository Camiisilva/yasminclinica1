// Seleção de Elementos
const body = document.body;
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
const menuToggle = document.getElementById('menu-toggle');
const themeToggle = document.getElementById('theme-toggle');
const header = document.getElementById('main-header');
const sections = document.querySelectorAll('section[id]');
const navItemsSidebar = document.querySelectorAll('.sidebar .nav-item');
const scrollReveals = document.querySelectorAll('.scroll-reveal');

// Modal
const bookingModal = document.getElementById('booking-modal');
const modalTriggers = document.querySelectorAll('.btn-trigger-modal');
const closeModalBtn = document.querySelector('.close-modal');
const bookingForm = document.getElementById('booking-form');
const successMsg = document.getElementById('success-message');

// --- 1. Inicialização ---
window.addEventListener('DOMContentLoaded', () => {
    // Restaurar Tema
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeToggle.querySelector('span').textContent = 'Modo Claro';
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
    
    initScrollReveal();
});

// --- 2. Controle de Tema ---
themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    if (isDark) {
        body.removeAttribute('data-theme');
        themeToggle.querySelector('span').textContent = 'Modo Escuro';
        themeToggle.querySelector('i').classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.querySelector('span').textContent = 'Modo Claro';
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// --- 3. Header dinâmico no Scroll ---
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    updateScrollSpy();
});

// --- 4. Menu Mobile ---
function toggleMobileMenu() {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
}

if (overlay) {
    overlay.addEventListener('click', toggleMobileMenu);
}

// Fechar menu mobile ao clicar em item
navItemsSidebar.forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
            toggleMobileMenu();
        }
    });
});

// --- 5. Scroll Reveal ---
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    scrollReveals.forEach(el => observer.observe(el));
}

// --- 6. ScrollSpy ---
function updateScrollSpy() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= (sectionTop - 150)) {
            currentSection = section.getAttribute('id');
        }
    });

    navItemsSidebar.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === currentSection) {
            item.classList.add('active');
        }
    });
}

// --- 7. Modal de Agendamento ---
modalTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
        bookingModal.classList.add('active');
        bookingForm.classList.remove('hidden');
        successMsg.classList.add('hidden');
    });
});

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        bookingModal.classList.remove('active');
    });
}

window.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
        bookingModal.classList.remove('active');
    }
});

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        bookingForm.classList.add('hidden');
        successMsg.classList.remove('hidden');
        
        setTimeout(() => {
            bookingModal.classList.remove('active');
        }, 2500);
    });
}

// --- 8. Redes Sociais ---
window.openLink = function(type) {
    const links = {
        wa: 'https://wa.me/5500000000000',
        ig: 'https://instagram.com/yasminclinica',
        em: 'mailto:contato@yasminclinica.com.br'
    };
    
    if (type === 'em') {
        window.location.href = links[type];
    } else {
        window.open(links[type], '_blank');
    }
}

console.log('Yasmin Clínica — Experiência Premium Ativada');
