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
    if (isDark) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
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
        em: () => {
            const contactSection = document.getElementById('contato');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
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
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(bookingForm);
        
        try {
            const response = await fetch(bookingForm.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                bookingForm.style.display = 'none';
                successMsg.style.display = 'block';
                setTimeout(() => modal.classList.remove('active'), 3500);
                bookingForm.reset();
            } else {
                alert('Ocorreu um erro. Por favor, tente novamente.');
            }
        } catch (error) {
            alert('Erro de conexão. Verifique sua internet.');
        }
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

// 9. Lógica do Formulário de Contato
const contactForm = document.getElementById('contact-form');
const contactSuccess = document.getElementById('contact-success');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                contactSuccess.style.display = 'block';
                contactForm.reset();
                setTimeout(() => contactSuccess.style.display = 'none', 5000);
            } else {
                alert('Ocorreu um erro ao enviar. Tente novamente mais tarde.');
            }
        } catch (error) {
            alert('Erro de conexão ao enviar a mensagem.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Mensagem';
        }
    });
}

// 10. Lógica de "Deixe sua Avaliação"
const btnOpenReview = document.getElementById('btn-open-review');
const btnCloseReview = document.getElementById('btn-close-review');
const reviewFormContainer = document.getElementById('review-form-container');
const reviewSubmissionForm = document.getElementById('review-submission-form');
const reviewSuccess = document.getElementById('review-success');

if (btnOpenReview) {
    btnOpenReview.addEventListener('click', () => {
        reviewFormContainer.style.display = 'block';
        btnOpenReview.style.display = 'none';
        reviewFormContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

if (btnCloseReview) {
    btnCloseReview.addEventListener('click', () => {
        reviewFormContainer.style.display = 'none';
        btnOpenReview.style.display = 'inline-block';
    });
}

if (reviewSubmissionForm) {
    reviewSubmissionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(reviewSubmissionForm);
        const submitBtn = reviewSubmissionForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        try {
            const response = await fetch(reviewSubmissionForm.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                reviewSuccess.style.display = 'block';
                reviewSubmissionForm.reset();
                setTimeout(() => {
                    reviewSuccess.style.display = 'none';
                    reviewFormContainer.style.display = 'none';
                    btnOpenReview.style.display = 'inline-block';
                }, 4000);
            } else {
                alert('Erro ao enviar avaliação. Tente novamente.');
            }
        } catch (error) {
            alert('Erro de conexão ao enviar avaliação.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Publicar Avaliação';
        }
    });
}

console.log('Yasmin Clínica — Experiência Premium Finalizada com Sucesso');
