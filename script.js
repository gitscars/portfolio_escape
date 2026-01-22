document.addEventListener('DOMContentLoaded', () => {

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Cerrar menú móvil si está abierto
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Toggle clase active
            if (navLinks.style.display === 'flex' && navLinks.classList.contains('mobile-active')) {
                navLinks.style.display = 'none';
                navLinks.classList.remove('mobile-active');
            } else {
                navLinks.style.display = 'flex';
                // Estilos para menú móvil overlay
                navLinks.style.position = 'fixed';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.height = 'calc(100vh - 70px)';
                navLinks.style.background = 'var(--bg-main)';
                navLinks.style.flexDirection = 'column';
                navLinks.style.justifyContent = 'center';
                navLinks.style.alignItems = 'center';
                navLinks.style.padding = '0 20px';
                navLinks.style.borderTop = '1px solid rgba(255,255,255,0.05)';
                navLinks.classList.add('mobile-active');
            }
        });
    }

    // Intersection Observer for Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.project-card, .step, .about-container');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
