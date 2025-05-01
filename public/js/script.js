document.addEventListener('DOMContentLoaded', function() {
    // Configuración inicial
    const WEDDING_DATE = new Date('September 13, 2025 12:00:00');
    const DOM = {
        photoContainer: document.getElementById('photo-container'),
        announcement: document.querySelector('.announcement'),
        countdown: document.querySelector('.countdown'),
        rsvp: document.querySelector('.rsvp'),
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds'),
        rsvpLink: document.getElementById('rsvp-link'),
        locationSections: document.querySelectorAll('.location-section')
    };

    // Precarga de imágenes
    function preloadImages() {
        const images = [
            '/img/fotoboda.JPEG',
            '/img/fotoiglesia.JPEG',
            '/img/fotorestaurante.JPEG'
        ];
        
        images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
        
        DOM.photoContainer.style.backgroundImage = 'url(/img/fotoboda.JPEG)';
    }

    // Efectos de scroll
    function setupScrollEffects() {
        let lastScroll = 0;
        const scrollHandler = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            
            // Efecto en la foto principal
            const newOpacity = 0.8 - Math.min(scrollY / (windowHeight * 2), 0.6);
            DOM.photoContainer.style.opacity = newOpacity;
            
            // Mostrar secciones principales
            if (scrollY > windowHeight * 0.2) {
                DOM.announcement.classList.add('visible');
            }
            if (scrollY > windowHeight * 0.4) {
                DOM.countdown.classList.add('visible');
            }
            if (scrollY > windowHeight * 0.6) {
                DOM.rsvp.classList.add('visible');
            }
            
            // Mostrar secciones de ubicación
            DOM.locationSections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const triggerPoint = windowHeight * 0.7;
                
                if (scrollY > sectionTop - triggerPoint) {
                    section.classList.add('visible');
                }
            });
            
            lastScroll = scrollY;
        };
        
        // Optimización del scroll
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    scrollHandler();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Cuenta regresiva
    function initCountdown() {
        function update() {
            const now = new Date();
            const diff = WEDDING_DATE - now;
            
            if (diff <= 0) {
                DOM.countdown.innerHTML = '<div class="wedding-day">¡Hoy es nuestro gran día!</div>';
                clearInterval(interval);
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            DOM.days.textContent = days.toString().padStart(2, '0');
            DOM.hours.textContent = hours.toString().padStart(2, '0');
            DOM.minutes.textContent = minutes.toString().padStart(2, '0');
            DOM.seconds.textContent = seconds.toString().padStart(2, '0');
        }
        
        update();
        const interval = setInterval(update, 1000);
    }

    // RSVP
    function setupRSVP() {
        DOM.rsvpLink.addEventListener('click', (e) => {
            e.preventDefault();
            DOM.rsvpLink.classList.add('clicked');
            setTimeout(() => {
                window.open('https://forms.gle/TU_FORMULARIO_GOOGLE', '_blank');
                DOM.rsvpLink.classList.remove('clicked');
            }, 300);
        });
    }

    // Inicialización
    function init() {
        preloadImages();
        setupScrollEffects();
        initCountdown();
        setupRSVP();
        
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    }

    init();
});