document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scroll (Mejora UX) ---
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

    // --- Menú Móvil Simple ---
    // Nota: En CSS ocultamos .nav-links en móviles.
    // Aquí podríamos agregar la lógica para togglear una clase 'active' si quisiéramos expandirlo.
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links'); // Selección de la lista

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Estilos inline para simplicidad en este ejemplo minimalista
            // En un proyecto real, usaríamos clases CSS
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'white';
                navLinks.style.flexDirection = 'column';
                navLinks.style.padding = '20px';
                navLinks.style.textAlign = 'center';
                navLinks.style.boxShadow = '0 5px 10px rgba(0,0,0,0.05)';
            }
        });
    }

    // --- Animación al Scroll (Minimalista) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Seleccionamos elementos clave
    const elementsToAnimate = document.querySelectorAll('.service-card, .about-content, .contact-box');

    elementsToAnimate.forEach(el => {
        // Estado inicial
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

        // Observar
        observer.observe(el);
    });
});
