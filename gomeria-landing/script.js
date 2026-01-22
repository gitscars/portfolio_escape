// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    
    // Menejo del Menú Hambuguesa para Móviles
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            // Alternar clase 'active' para mostrar/ocultar menú
            navLinks.classList.toggle('active');
            
            // Animación del botón hamburguesa (opcional)
            hamburger.classList.toggle('toggle');
        });
    }

    // Cerrar el menú al hacer click en un enlace (UX para móviles)
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (hamburger) hamburger.classList.remove('toggle');
        });
    });

    // Smooth Scroll personalizado para enlaces internos
    // Aunque CSS scroll-behavior: smooth funciona, este script asegura compatibilidad y control
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animación simple de aparición al hacer scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Dejar de observar una vez animado
            }
        });
    }, observerOptions);

    // Aplicar observador a las tarjetas
    const cards = document.querySelectorAll('.card, .benefit-item');
    cards.forEach(card => {
        // Estilos iniciales para la animación
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        observer.observe(card);
    });
});
