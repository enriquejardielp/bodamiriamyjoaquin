document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const body = document.body;
    const photo = document.getElementById('photo-container');
    const overlay = document.querySelector('.overlay');
    const announcement = document.querySelector('.announcement');
    const countdown = document.querySelector('.countdown');
    const rsvp = document.querySelector('.rsvp');
    const locationSections = document.querySelectorAll('.location-section');
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // =============================================
    // 1. EFECTO DE SCROLL OPTIMIZADO PARA MÓVIL
    // =============================================
    let lastScrollY = 0;
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        lastScrollY = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateScrollEffects(lastScrollY);
                ticking = false;
            });
            ticking = true;
        }
    });

    function updateScrollEffects(scrollY) {
        const windowHeight = window.innerHeight;
        
        // Efecto de difuminado progresivo (más intenso en móvil)
        const blurIntensity = Math.min(scrollY / 50, 6);
        const brightnessLevel = Math.max(1 - scrollY / 200, 0.3);
        
        photo.style.filter = `blur(${blurIntensity}px) brightness(${brightnessLevel})`;
        photo.style.transform = `scale(${1 + scrollY / 5000})`;
        
        // Control preciso del overlay
        overlay.style.opacity = Math.min(scrollY / 200, 0.7);
        
        // Mostrar elementos con umbrales adaptativos
        const thresholds = {
            announcement: 50,
            countdown: windowHeight * 0.3,
            rsvp: windowHeight * 0.5
        };
        
        announcement.classList.toggle('visible', scrollY > thresholds.announcement);
        countdown.classList.toggle('visible', scrollY > thresholds.countdown);
        rsvp.classList.toggle('visible', scrollY > thresholds.rsvp);
        
        // Secciones de ubicación
        locationSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            section.classList.toggle('visible', sectionTop < windowHeight * 0.75);
        });
    }

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
        updateScrollEffects(window.scrollY);
    }, 100);
});