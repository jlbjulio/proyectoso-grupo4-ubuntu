// JavaScript para funcionalidades interactivas del blog
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos del DOM
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.querySelector('.back-to-top');
    const header = document.querySelector('.header');
    
    // Toggle del menú móvil
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Cerrar menú móvil al hacer clic en un enlace (DESACTIVADO TEMPORALMENTE)
    /*
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
    */
    console.log('Cierre de menú móvil desactivado temporalmente');
    
    // Smooth scrolling para enlaces internos (COMPLETAMENTE DESACTIVADO)
    // Comentado todo el bloque para usar navegación nativa como los botones del hero
    /*
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // e.preventDefault(); // Comentado para permitir navegación nativa
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            console.log('Click interceptado en:', targetId);
            console.log('Sección encontrada:', targetSection);
            
            // Permitir que el navegador haga la navegación nativa por ahora
            return true;
        });
    });
    */
    
    // Sin JavaScript - navegación 100% nativa como los botones del hero
    console.log('Navegación de menú desactivada - usando navegación nativa');
    
    // Mostrar/ocultar botón "Volver arriba" y cambiar header en scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Botón volver arriba
        if (scrollTop > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
        
        // Cambiar apariencia del header
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
    
    // Funcionalidad del botón volver arriba
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animación de aparición para elementos en scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.timeline-item, .requirement-card, .conclusion-item, .reference-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // Contador animado para estadísticas
    const statsNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    function animateCounter(element) {
        const target = element.textContent.trim();
        let current = 0;
        let increment;
        
        // Extraer número del texto
        const match = target.match(/(\d+)/);
        if (!match) return;
        
        const targetNum = parseInt(match[1]);
        const suffix = target.replace(/\d+/, '');
        
        if (targetNum <= 100) {
            increment = 1;
        } else if (targetNum <= 1000) {
            increment = 10;
        } else {
            increment = Math.ceil(targetNum / 100);
        }
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetNum) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = current + suffix;
            }
        }, 50);
    }
    
    // Efecto parallax suave para hero (deshabilitado para mantener estabilidad de imágenes)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.ubuntu-logo');
        
        // Removido el efecto parallax para mantener la imagen estable
        if (heroImage && scrolled < window.innerHeight) {
            // heroImage.style.transform = `translateY(${scrolled * 0.5}px) scale(${1 + scrolled * 0.0002})`;
        }
    });
    
    // Crear partículas animadas en el fondo
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 4 + 1 + 'px';
            particle.style.height = particle.style.width;
            particle.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out infinite alternate`;
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();
    
    // Efecto typewriter para el título principal (opcional)
    function typewriterEffect(element, text, speed = 100) {
        if (!element) return;
        
        element.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Aplicar efecto typewriter al título principal después de un pequeño delay
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typewriterEffect(heroTitle, originalText, 100);
        }
    }, 1000);
    
    // Tooltip para enlaces externos
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.textContent = 'Abre en nueva pestaña';
            tooltip.style.position = 'absolute';
            tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '12px';
            tooltip.style.zIndex = '1000';
            tooltip.style.pointerEvents = 'none';
            tooltip.className = 'custom-tooltip';
            
            document.body.appendChild(tooltip);
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.top - 30) + 'px';
        });
        
        link.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.custom-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
    
    // Lazy loading para imágenes (sin efecto fade)
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Remover efecto de opacity - las imágenes se mantienen siempre visibles
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // Manejar errores de carga de imágenes (simplificado)
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Solo para imágenes que no son fotos de integrantes
            if (!this.classList.contains('member-photo')) {
                this.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.style.width = this.width + 'px' || '250px';
                fallback.style.height = this.height + 'px' || '250px';
                fallback.style.backgroundColor = '#f0f0f0';
                fallback.style.display = 'flex';
                fallback.style.alignItems = 'center';
                fallback.style.justifyContent = 'center';
                fallback.style.color = '#666';
                fallback.style.fontSize = '14px';
                fallback.style.borderRadius = '10px';
                fallback.textContent = 'Imagen no disponible';
                fallback.className = 'image-fallback';
                
                this.parentNode.insertBefore(fallback, this);
            }
        });
    });
    
    // Efecto hover para cards
    const cards = document.querySelectorAll('.requirement-card, .link-card, .pros-cons-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Funcionalidad de búsqueda simple (opcional)
    function addSearchFunctionality() {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Buscar en el blog...';
        searchInput.style.display = 'none'; // Oculto por defecto
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const sections = document.querySelectorAll('.section');
            
            sections.forEach(section => {
                const text = section.textContent.toLowerCase();
                if (searchTerm === '' || text.includes(searchTerm)) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
        
        // Agregar a la navegación si se desea activar la búsqueda
        // document.querySelector('.nav-container').appendChild(searchInput);
    }
    
    // Modo oscuro toggle (funcionalidad adicional)
    function addDarkModeToggle() {
        const darkModeToggle = document.createElement('button');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.style.position = 'fixed';
        darkModeToggle.style.top = '20px';
        darkModeToggle.style.right = '20px';
        darkModeToggle.style.background = 'var(--ubuntu-orange)';
        darkModeToggle.style.color = 'white';
        darkModeToggle.style.border = 'none';
        darkModeToggle.style.borderRadius = '50%';
        darkModeToggle.style.width = '50px';
        darkModeToggle.style.height = '50px';
        darkModeToggle.style.cursor = 'pointer';
        darkModeToggle.style.zIndex = '1001';
        darkModeToggle.style.display = 'none'; // Oculto por defecto
        
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
        
        // document.body.appendChild(darkModeToggle);
    }
    
    // Inicializar funcionalidades adicionales
    // addSearchFunctionality();
    // addDarkModeToggle();
    
    // Mensaje de carga completada
    console.log('Blog Ubuntu - Todas las funcionalidades cargadas correctamente');
    
    // Manejar el redimensionado de ventana
    window.addEventListener('resize', function() {
        // Recalcular posiciones si es necesario
        const particles = document.querySelectorAll('#particles div');
        particles.forEach(particle => {
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
        });
    });
    
});

// Funciones globales auxiliares

// Función para scroll suave a cualquier elemento (versión original restaurada)
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const headerHeight = 80;
        const targetPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });
    }
}
function scrollToElement(elementId) {
    const targetId = elementId.startsWith('#') ? elementId : '#' + elementId;
    let targetElement = null;
    
    console.log('scrollToElement - Navegando a:', targetId);
    
    if (targetId === '#inicio') {
        targetElement = document.querySelector('#inicio');
    } else {
        targetElement = document.querySelector(targetId);
    }
    
    console.log('scrollToElement - Elemento encontrado:', targetElement);
    
    if (targetElement) {
        const headerHeight = 80;
        const extraSpace = 10;
        const targetPosition = targetElement.offsetTop - headerHeight - extraSpace;
        
        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });
        
        console.log('scrollToElement - Posición:', targetPosition);
        return true;
    } else {
        console.error('scrollToElement - No encontrado:', targetId);
        return false;
    }
}

// Método alternativo de navegación como fallback (DESACTIVADO COMPLETAMENTE)
/*
document.addEventListener('click', function(e) {
    if (e.target.matches('.nav-link') || e.target.closest('.nav-link')) {
        const link = e.target.matches('.nav-link') ? e.target : e.target.closest('.nav-link');
        const href = link.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            e.preventDefault();
            e.stopPropagation();
            
            if (!scrollToElement(href)) {
                console.error('No se pudo navegar a:', href);
            }
        }
    }
});
*/
console.log('Event listener global de nav-links DESACTIVADO');

// Función para copiar texto al portapapeles
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() {
            console.log('Texto copiado al portapapeles');
        });
    } else {
        // Fallback para navegadores más antiguos
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        console.log('Texto copiado al portapapeles (fallback)');
    }
}

// Función para formatear números con separadores de miles
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Función para detectar si el dispositivo es móvil
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Función para obtener información del navegador
function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browserName = "Unknown";
    
    if (ua.indexOf("Chrome") > -1) {
        browserName = "Chrome";
    } else if (ua.indexOf("Firefox") > -1) {
        browserName = "Firefox";
    } else if (ua.indexOf("Safari") > -1) {
        browserName = "Safari";
    } else if (ua.indexOf("Edge") > -1) {
        browserName = "Edge";
    }
    
    return {
        name: browserName,
        isMobile: isMobileDevice(),
        userAgent: ua
    };
}

// Log de información del sistema para debugging
console.log('Información del sistema:', {
    browser: getBrowserInfo(),
    viewport: {
        width: window.innerWidth,
        height: window.innerHeight
    },
    timestamp: new Date().toLocaleString()
});