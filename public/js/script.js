document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const body = document.body;
    const photo = document.getElementById('photo-container');
    const announcement = document.querySelector('.announcement');
    const countdown = document.querySelector('.countdown');
    const rsvp = document.querySelector('.rsvp');
    const locationSections = document.querySelectorAll('.location-section');
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // =============================================
    // 1. EFECTO DE SCROLL (DIFUMINADO PROGRESIVO)
    // =============================================
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        
        // Activar difuminado después de 100px de scroll
        if (scrollY > 100) {
            body.classList.add('scrolled');
        } else {
            body.classList.remove('scrolled');
        }

        // Mostrar elementos al hacer scroll
        if (scrollY > 50) {
            announcement.classList.add('visible');
        }
        if (scrollY > 150) {
            countdown.classList.add('visible');
        }
        if (scrollY > 250) {
            rsvp.classList.add('visible');
        }

        // Mostrar secciones de ubicación
        locationSections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const triggerPoint = window.innerHeight * 0.7;
            
            if (scrollY > sectionTop - triggerPoint) {
                section.classList.add('visible');
            }
        });
    });

    // =============================================
    // 2. CUENTA REGRESIVA
    // =============================================
    function updateCountdown() {
        const weddingDate = new Date('September 13, 2025 12:00:00').getTime();
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown-timer').innerHTML = 
                '<div style="font-size: 2rem;">¡Hoy es el día!</div>';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    // Iniciar cuenta regresiva
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    // =============================================
    // 3. INICIALIZACIÓN
    // =============================================
    // Forzar mostrar elementos si el scroll ya está avanzado
    setTimeout(() => {
        if (window.scrollY > 50) announcement.classList.add('visible');
        if (window.scrollY > 150) countdown.classList.add('visible');
        if (window.scrollY > 250) rsvp.classList.add('visible');
    }, 500);
});