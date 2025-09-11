// Translation system
const translations = {
    pt: {
        'nav.home': 'Início',
        'nav.services': 'Serviços',
        'nav.about': 'Sobre',
        'nav.contact': 'Contato',
        'hero.title': 'Aumente sua produtividade em',
        'hero.highlight': '95% com RPA',
        'hero.description': 'Economize até R$ 50.000/mês automatizando processos repetitivos. Nossos clientes reduzem custos operacionais e aumentam lucros em apenas 30 dias.',
        'hero.savings': 'Economize até R$ 50.000/mês',
        'hero.benefit1': 'ROI garantido em 90 dias',
        'hero.benefit2': 'Implementação em 15 dias',
        'hero.benefit3': 'Suporte 24/7 incluído',
        'hero.cta1': 'QUERO ECONOMIZAR AGORA',
        'hero.cta2': 'Ver Demonstração',
        'hero.urgency': 'Oferta limitada:',
        'hero.urgencyText': 'Consultoria gratuita para os primeiros 10 clientes',
        'form.title': '🚀 Solicite sua Consultoria Gratuita',
        'form.subtitle': 'Descubra como economizar até R$ 50.000/mês com automação'
    },
    en: {
        'nav.home': 'Home',
        'nav.services': 'Services',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'hero.title': 'Increase your productivity by',
        'hero.highlight': '95% with RPA',
        'hero.description': 'Save up to $50,000/month by automating repetitive processes. Our clients reduce operational costs and increase profits in just 30 days.',
        'hero.savings': 'Save up to $50,000/month',
        'hero.benefit1': 'ROI guaranteed in 90 days',
        'hero.benefit2': 'Implementation in 15 days',
        'hero.benefit3': '24/7 support included',
        'hero.cta1': 'I WANT TO SAVE NOW',
        'hero.cta2': 'Watch Demo',
        'hero.urgency': 'Limited offer:',
        'hero.urgencyText': 'Free consultation for the first 10 clients',
        'form.title': '🚀 Request Your Free Consultation',
        'form.subtitle': 'Discover how to save up to $50,000/month with automation'
    },
    es: {
        'nav.home': 'Inicio',
        'nav.services': 'Servicios',
        'nav.about': 'Acerca',
        'nav.contact': 'Contacto',
        'hero.title': 'Aumenta tu productividad en',
        'hero.highlight': '95% con RPA',
        'hero.description': 'Ahorra hasta $50,000/mes automatizando procesos repetitivos. Nuestros clientes reducen costos operacionales y aumentan ganancias en solo 30 días.',
        'hero.savings': 'Ahorra hasta $50,000/mes',
        'hero.benefit1': 'ROI garantizado en 90 días',
        'hero.benefit2': 'Implementación en 15 días',
        'hero.benefit3': 'Soporte 24/7 incluido',
        'hero.cta1': 'QUIERO AHORRAR AHORA',
        'hero.cta2': 'Ver Demostración',
        'hero.urgency': 'Oferta limitada:',
        'hero.urgencyText': 'Consulta gratuita para los primeros 10 clientes',
        'form.title': '🚀 Solicita tu Consulta Gratuita',
        'form.subtitle': 'Descubre cómo ahorrar hasta $50,000/mes con automatización'
    },
    de: {
        'nav.home': 'Startseite',
        'nav.services': 'Dienstleistungen',
        'nav.about': 'Über uns',
        'nav.contact': 'Kontakt',
        'hero.title': 'Steigern Sie Ihre Produktivität um',
        'hero.highlight': '95% mit RPA',
        'hero.description': 'Sparen Sie bis zu 50.000€/Monat durch Automatisierung repetitiver Prozesse. Unsere Kunden reduzieren Betriebskosten und steigern Gewinne in nur 30 Tagen.',
        'hero.savings': 'Sparen Sie bis zu 50.000€/Monat',
        'hero.benefit1': 'ROI garantiert in 90 Tagen',
        'hero.benefit2': 'Implementierung in 15 Tagen',
        'hero.benefit3': '24/7 Support inklusive',
        'hero.cta1': 'ICH WILL JETZT SPAREN',
        'hero.cta2': 'Demo ansehen',
        'hero.urgency': 'Begrenztes Angebot:',
        'hero.urgencyText': 'Kostenlose Beratung für die ersten 10 Kunden',
        'form.title': '🚀 Fordern Sie Ihre Kostenlose Beratung an',
        'form.subtitle': 'Entdecken Sie, wie Sie bis zu 50.000€/Monat mit Automatisierung sparen können'
    }
};

// Current language
let currentLang = localStorage.getItem('language') || 'pt';

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');
const statNumbers = document.querySelectorAll('.stat-number');
const contactForm = document.querySelector('.contact-form');
const loadingScreen = document.getElementById('loading-screen');
const themeToggle = document.getElementById('theme-toggle');
const langButtons = document.querySelectorAll('.lang-btn');

// Translation functions
const translateElement = (element, lang) => {
    const key = element.getAttribute('data-translate');
    if (key && translations[lang] && translations[lang][key]) {
        element.textContent = translations[lang][key];
    }
};

const translatePage = (lang) => {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => translateElement(element, lang));
    currentLang = lang;
    localStorage.setItem('language', lang);
};

// Language switching
langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        langButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        translatePage(lang);
    });
});

// Theme toggle functionality
const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const icon = themeToggle.querySelector('i');
    icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
};

themeToggle.addEventListener('click', toggleTheme);

// Initialize theme
const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const icon = themeToggle.querySelector('i');
    icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
};

// Initialize language
const initializeLanguage = () => {
    const savedLang = localStorage.getItem('language') || 'pt';
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === savedLang) {
            btn.classList.add('active');
        }
    });
    translatePage(savedLang);
};

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
};

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target);
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Form submission handling with Formspree integration
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        employees: formData.get('employees'),
        interest: formData.get('interest'),
        message: formData.get('message')
    };
    
    // Validate form
    if (!validateForm(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    try {
        // Submit to Formspree
        const response = await fetch('https://formspree.io/f/xpwnqkqz', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showNotification('🎉 Consultoria solicitada com sucesso! Entraremos em contato em até 2 horas úteis.', 'success');
            contactForm.reset();
            trackConversion('consultoria_solicitada');
        } else {
            throw new Error('Erro no envio');
        }
    } catch (error) {
        showNotification('❌ Erro ao enviar formulário. Tente novamente ou entre em contato diretamente.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Form validation
const validateForm = (data) => {
    const errors = [];
    
    if (!data.name || data.name.length < 2) {
        errors.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Email inválido');
    }
    
    if (!data.phone || data.phone.length < 10) {
        errors.push('Telefone inválido');
    }
    
    if (!data.company || data.company.length < 2) {
        errors.push('Nome da empresa é obrigatório');
    }
    
    if (!data.employees) {
        errors.push('Selecione o número de funcionários');
    }
    
    if (!data.interest) {
        errors.push('Selecione o serviço de interesse');
    }
    
    if (errors.length > 0) {
        showNotification('❌ ' + errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
};

// Email validation
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Track conversions (integrate with your analytics)
const trackConversion = (eventName) => {
    // Google Analytics 4 example
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            'event_category': 'conversion',
            'event_label': 'form_submission'
        });
    }
    
    // Facebook Pixel example
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead');
    }
    
    console.log('Conversion tracked:', eventName);
};

// Notification system
const showNotification = (message, type = 'info') => {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles based on type
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
};

// Intersection Observer for fade-in animations
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Add fade-in animation to service cards
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(card);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-img');
    
    if (heroImage) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects to service cards
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add typing effect to hero title
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Add scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
};

// Initialize scroll progress
createScrollProgress();

// Loading screen functionality
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.classList.add('loaded');
    }, 2000); // Show loading for 2 seconds
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadingScreen.style.display = 'flex';
    initializeTheme();
    initializeLanguage();
});

// Add CSS for loading animation
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: auto;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(loadingStyles);
