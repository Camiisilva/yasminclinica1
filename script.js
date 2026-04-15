// Controle de Modo Escuro
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');
const themeText = themeToggle.querySelector('span');

themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        themeText.textContent = 'Modo Escuro';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        themeText.textContent = 'Modo Claro';
        localStorage.setItem('theme', 'dark');
    }
});

// Persistência de Tema
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        themeText.textContent = 'Modo Claro';
    }
});

// Navegação Ativa (Feedback Visual)
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
    if (item.id === 'theme-toggle') return;
    
    item.addEventListener('click', () => {
        navItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});

// Simulação de preenchimento suave de botões e transições extras podem ser adicionadas aqui
console.log('Yasmin Clínica Interface Loaded');
