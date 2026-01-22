document.addEventListener('DOMContentLoaded', () => {

    // --- Menú Móvil ---
    const hamburger = document.querySelector('.hamburger');
    const navContainer = document.querySelector('.nav-links-container');
    const links = document.querySelectorAll('.nav-links li a');

    // Toggle del menú
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navContainer.classList.toggle('active');

            // Animación simple de las líneas del hamburger (opcional si quisieras CSS extra)
            // Por simplicidad, solo cambiamos la opacidad de la línea del medio
            const lines = hamburger.querySelectorAll('.line');
            if (navContainer.classList.contains('active')) {
                lines[1].style.opacity = '0';
                lines[0].style.transform = 'translateY(8px) rotate(45deg)';
                lines[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                lines[1].style.opacity = '1';
                lines[0].style.transform = 'none';
                lines[2].style.transform = 'none';
            }
        });
    }

    // Cerrar menú al tocar un link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navContainer.classList.remove('active');
            // Reset hamburger
            const lines = hamburger.querySelectorAll('.line');
            lines[1].style.opacity = '1';
            lines[0].style.transform = 'none';
            lines[2].style.transform = 'none';
        });
    });

    // --- Animaciones al Scroll (Intersection Observer) ---
    // Esta API permite detectar cuando un elemento entra en la pantalla
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si el elemento es visible
            if (entry.isIntersecting) {
                // Le agregamos una clase para que CSS haga la animación
                entry.target.classList.add('visible');
                // Dejamos de observarlo para que no se anime cada vez
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Se activa cuando el 10% del elemento se ve
    });

    // Elementos a animar
    const animatedElements = document.querySelectorAll('.menu-item, .feature-card, .hero-text, .hero-image');

    // Agregamos estilos base para la animación en JS (o podría ser en CSS)
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Definimos qué pasa cuando se agrega la clase .visible
    // (Esto se hace insertando una regla CSS dinámica o simplemente confiando en el style inline del observer, 
    // pero para tener control total, modificamos el style directamente aquí al intersectar)
    // Corrección: El observer de arriba solo agrega la clase. 
    // Vamos a modificar el observer para que aplique los estilos directamente.

    // Sobreescribimos el comportamiento del observer anterior para simplificar
    const simpleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                simpleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => simpleObserver.observe(el));
});
