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
        'services.title': 'Nossos Serviços',
        'services.subtitle': 'Soluções completas para automação e otimização de processos',
        'services.rpa.title': 'Automação RPA',
        'services.rpa.description': 'Implementamos soluções de Robotic Process Automation para automatizar tarefas repetitivas e aumentar a produtividade da sua empresa.',
        'services.rpa.feature1': 'Automação de processos administrativos',
        'services.rpa.feature2': 'Integração entre sistemas',
        'services.rpa.feature3': 'Redução de erros manuais',
        'services.rpa.feature4': 'Economia de tempo e recursos',
        'services.sla.title': 'Análise de SLA',
        'services.sla.description': 'Desenvolvemos dashboards e relatórios para monitoramento de indicadores de SLA e identificação de oportunidades de melhoria.',
        'services.sla.feature1': 'Monitoramento em tempo real',
        'services.sla.feature2': 'Relatórios personalizados',
        'services.sla.feature3': 'Alertas automáticos',
        'services.sla.feature4': 'Análise preditiva',
        'services.improvement.title': 'Melhoria Contínua',
        'services.improvement.description': 'Implementamos metodologias de melhoria contínua para otimizar processos e alcançar melhores resultados operacionais.',
        'services.improvement.feature1': 'Análise de processos',
        'services.improvement.feature2': 'Implementação de melhorias',
        'services.improvement.feature3': 'Treinamento de equipes',
        'services.improvement.feature4': 'Acompanhamento de resultados',
        'about.title': 'Sobre a ANAISSI DATA STRATEGY',
        'about.description': 'Somos especialistas em transformação digital, focados em automação de processos e análise de dados para impulsionar o crescimento dos nossos clientes.',
        'about.feature1': 'Experiência comprovada em RPA',
        'about.feature2': 'Metodologias ágeis e eficientes',
        'about.feature3': 'Suporte técnico especializado',
        'about.feature4': 'Resultados mensuráveis',
        'testimonials.title': 'O que nossos clientes dizem',
        'testimonials.subtitle': 'Resultados reais de empresas que transformaram seus processos',
        'testimonials.testimonial1': '"A ANAISSI automatizou nossos processos financeiros e economizamos R$ 30.000/mês. ROI em apenas 2 meses!"',
        'testimonials.testimonial2': '"Reduzimos 80% do tempo em processos administrativos. A equipe agora foca no que realmente importa."',
        'testimonials.testimonial3': '"Implementação rápida e suporte excepcional. Nossos SLAs melhoraram 95% em 30 dias."',
        'testimonials.author1': 'CFO - TechCorp',
        'testimonials.author2': 'Diretor - Inovação Ltda',
        'testimonials.author3': 'CEO - PortoEx',
        'stats.timeReduction': '% Redução de Tempo',
        'stats.projectsCompleted': 'Projetos Concluídos',
        'stats.accuracy': '% Precisão',
        'stats.support': 'Suporte 24/7',
        'contact.title': 'Entre em Contato',
        'contact.subtitle': 'Pronto para transformar seus processos? Vamos conversar sobre sua necessidade.',
        'contact.emailLabel': 'Email',
        'contact.phoneLabel': 'Telefone',
        'contact.locationLabel': 'Localização',
        'contact.location': 'Itajaí, SC - Brasil',
        'form.title': '🚀 Solicite sua Consultoria Gratuita',
        'form.subtitle': 'Descubra como economizar até R$ 50.000/mês com automação',
        'form.employeesPlaceholder': 'Quantos funcionários sua empresa tem?',
        'form.employees1': '1-10 funcionários',
        'form.employees2': '11-50 funcionários',
        'form.employees3': '51-200 funcionários',
        'form.employees4': 'Mais de 200 funcionários',
        'form.interestPlaceholder': 'Qual serviço te interessa mais?',
        'form.interestRpa': 'Automação RPA',
        'form.interestSla': 'Análise de SLA',
        'form.interestImprovement': 'Melhoria Contínua',
        'form.interestAll': 'Todos os serviços',
        'form.benefitsTitle': '🎁 O que você recebe na consultoria:',
        'form.benefit1': 'Análise gratuita dos seus processos',
        'form.benefit2': 'Proposta personalizada de economia',
        'form.benefit3': 'ROI estimado em 30 dias',
        'form.benefit4': 'Plano de implementação detalhado',
        'form.submitButton': 'QUERO MINHA CONSULTORIA GRATUITA',
        'form.disclaimer': 'Seus dados estão seguros. Não enviamos spam.',
        'footer.copyright': '© 2024 ANAISSI DATA STRATEGY. Todos os direitos reservados.'
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
        'services.title': 'Our Services',
        'services.subtitle': 'Complete solutions for automation and process optimization',
        'services.rpa.title': 'RPA Automation',
        'services.rpa.description': 'We implement Robotic Process Automation solutions to automate repetitive tasks and increase your company\'s productivity.',
        'services.rpa.feature1': 'Administrative process automation',
        'services.rpa.feature2': 'System integration',
        'services.rpa.feature3': 'Manual error reduction',
        'services.rpa.feature4': 'Time and resource savings',
        'services.sla.title': 'SLA Analysis',
        'services.sla.description': 'We develop dashboards and reports for SLA indicator monitoring and identification of improvement opportunities.',
        'services.sla.feature1': 'Real-time monitoring',
        'services.sla.feature2': 'Customized reports',
        'services.sla.feature3': 'Automatic alerts',
        'services.sla.feature4': 'Predictive analysis',
        'services.improvement.title': 'Continuous Improvement',
        'services.improvement.description': 'We implement continuous improvement methodologies to optimize processes and achieve better operational results.',
        'services.improvement.feature1': 'Process analysis',
        'services.improvement.feature2': 'Improvement implementation',
        'services.improvement.feature3': 'Team training',
        'services.improvement.feature4': 'Results monitoring',
        'about.title': 'About ANAISSI DATA STRATEGY',
        'about.description': 'We are digital transformation specialists, focused on process automation and data analysis to drive our clients\' growth.',
        'about.feature1': 'Proven RPA experience',
        'about.feature2': 'Agile and efficient methodologies',
        'about.feature3': 'Specialized technical support',
        'about.feature4': 'Measurable results',
        'testimonials.title': 'What our clients say',
        'testimonials.subtitle': 'Real results from companies that transformed their processes',
        'testimonials.testimonial1': '"ANAISSI automated our financial processes and we saved $30,000/month. ROI in just 2 months!"',
        'testimonials.testimonial2': '"We reduced 80% of time in administrative processes. The team now focuses on what really matters."',
        'testimonials.testimonial3': '"Quick implementation and exceptional support. Our SLAs improved 95% in 30 days."',
        'testimonials.author1': 'CFO - TechCorp',
        'testimonials.author2': 'Director - Innovation Ltd',
        'testimonials.author3': 'CEO - PortoEx',
        'stats.timeReduction': '% Time Reduction',
        'stats.projectsCompleted': 'Completed Projects',
        'stats.accuracy': '% Accuracy',
        'stats.support': '24/7 Support',
        'contact.title': 'Get in Touch',
        'contact.subtitle': 'Ready to transform your processes? Let\'s talk about your needs.',
        'contact.emailLabel': 'Email',
        'contact.phoneLabel': 'Phone',
        'contact.locationLabel': 'Location',
        'contact.location': 'Itajaí, SC - Brazil',
        'form.title': '🚀 Request Your Free Consultation',
        'form.subtitle': 'Discover how to save up to $50,000/month with automation',
        'form.employeesPlaceholder': 'How many employees does your company have?',
        'form.employees1': '1-10 employees',
        'form.employees2': '11-50 employees',
        'form.employees3': '51-200 employees',
        'form.employees4': 'More than 200 employees',
        'form.interestPlaceholder': 'Which service interests you most?',
        'form.interestRpa': 'RPA Automation',
        'form.interestSla': 'SLA Analysis',
        'form.interestImprovement': 'Continuous Improvement',
        'form.interestAll': 'All services',
        'form.benefitsTitle': '🎁 What you get in the consultation:',
        'form.benefit1': 'Free analysis of your processes',
        'form.benefit2': 'Personalized savings proposal',
        'form.benefit3': 'ROI estimated in 30 days',
        'form.benefit4': 'Detailed implementation plan',
        'form.submitButton': 'I WANT MY FREE CONSULTATION',
        'form.disclaimer': 'Your data is safe. We don\'t send spam.',
        'footer.copyright': '© 2024 ANAISSI DATA STRATEGY. All rights reserved.'
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
        'services.title': 'Nuestros Servicios',
        'services.subtitle': 'Soluciones completas para automatización y optimización de procesos',
        'services.rpa.title': 'Automatización RPA',
        'services.rpa.description': 'Implementamos soluciones de Automatización Robótica de Procesos para automatizar tareas repetitivas y aumentar la productividad de su empresa.',
        'services.rpa.feature1': 'Automatización de procesos administrativos',
        'services.rpa.feature2': 'Integración entre sistemas',
        'services.rpa.feature3': 'Reducción de errores manuales',
        'services.rpa.feature4': 'Ahorro de tiempo y recursos',
        'services.sla.title': 'Análisis de SLA',
        'services.sla.description': 'Desarrollamos dashboards y reportes para monitoreo de indicadores de SLA e identificación de oportunidades de mejora.',
        'services.sla.feature1': 'Monitoreo en tiempo real',
        'services.sla.feature2': 'Reportes personalizados',
        'services.sla.feature3': 'Alertas automáticas',
        'services.sla.feature4': 'Análisis predictivo',
        'services.improvement.title': 'Mejora Continua',
        'services.improvement.description': 'Implementamos metodologías de mejora continua para optimizar procesos y alcanzar mejores resultados operacionales.',
        'services.improvement.feature1': 'Análisis de procesos',
        'services.improvement.feature2': 'Implementación de mejoras',
        'services.improvement.feature3': 'Capacitación de equipos',
        'services.improvement.feature4': 'Seguimiento de resultados',
        'about.title': 'Acerca de ANAISSI DATA STRATEGY',
        'about.description': 'Somos especialistas en transformación digital, enfocados en automatización de procesos y análisis de datos para impulsar el crecimiento de nuestros clientes.',
        'about.feature1': 'Experiencia comprobada en RPA',
        'about.feature2': 'Metodologías ágiles y eficientes',
        'about.feature3': 'Soporte técnico especializado',
        'about.feature4': 'Resultados medibles',
        'testimonials.title': 'Lo que dicen nuestros clientes',
        'testimonials.subtitle': 'Resultados reales de empresas que transformaron sus procesos',
        'testimonials.testimonial1': '"ANAISSI automatizó nuestros procesos financieros y ahorramos $30,000/mes. ROI en solo 2 meses!"',
        'testimonials.testimonial2': '"Redujimos 80% del tiempo en procesos administrativos. El equipo ahora se enfoca en lo que realmente importa."',
        'testimonials.testimonial3': '"Implementación rápida y soporte excepcional. Nuestros SLAs mejoraron 95% en 30 días."',
        'testimonials.author1': 'CFO - TechCorp',
        'testimonials.author2': 'Director - Innovación Ltda',
        'testimonials.author3': 'CEO - PortoEx',
        'stats.timeReduction': '% Reducción de Tiempo',
        'stats.projectsCompleted': 'Proyectos Completados',
        'stats.accuracy': '% Precisión',
        'stats.support': 'Soporte 24/7',
        'contact.title': 'Ponte en Contacto',
        'contact.subtitle': '¿Listo para transformar tus procesos? Hablemos sobre tus necesidades.',
        'contact.emailLabel': 'Email',
        'contact.phoneLabel': 'Teléfono',
        'contact.locationLabel': 'Ubicación',
        'contact.location': 'Itajaí, SC - Brasil',
        'form.title': '🚀 Solicita tu Consulta Gratuita',
        'form.subtitle': 'Descubre cómo ahorrar hasta $50,000/mes con automatización',
        'form.employeesPlaceholder': '¿Cuántos empleados tiene tu empresa?',
        'form.employees1': '1-10 empleados',
        'form.employees2': '11-50 empleados',
        'form.employees3': '51-200 empleados',
        'form.employees4': 'Más de 200 empleados',
        'form.interestPlaceholder': '¿Qué servicio te interesa más?',
        'form.interestRpa': 'Automatización RPA',
        'form.interestSla': 'Análisis de SLA',
        'form.interestImprovement': 'Mejora Continua',
        'form.interestAll': 'Todos los servicios',
        'form.benefitsTitle': '🎁 Lo que recibes en la consulta:',
        'form.benefit1': 'Análisis gratuito de tus procesos',
        'form.benefit2': 'Propuesta personalizada de ahorro',
        'form.benefit3': 'ROI estimado en 30 días',
        'form.benefit4': 'Plan de implementación detallado',
        'form.submitButton': 'QUIERO MI CONSULTA GRATUITA',
        'form.disclaimer': 'Tus datos están seguros. No enviamos spam.',
        'footer.copyright': '© 2024 ANAISSI DATA STRATEGY. Todos los derechos reservados.'
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
        'services.title': 'Unsere Dienstleistungen',
        'services.subtitle': 'Komplette Lösungen für Automatisierung und Prozessoptimierung',
        'services.rpa.title': 'RPA-Automatisierung',
        'services.rpa.description': 'Wir implementieren Robotic Process Automation-Lösungen zur Automatisierung repetitiver Aufgaben und Steigerung der Produktivität Ihres Unternehmens.',
        'services.rpa.feature1': 'Automatisierung administrativer Prozesse',
        'services.rpa.feature2': 'Systemintegration',
        'services.rpa.feature3': 'Reduzierung manueller Fehler',
        'services.rpa.feature4': 'Zeit- und Ressourceneinsparung',
        'services.sla.title': 'SLA-Analyse',
        'services.sla.description': 'Wir entwickeln Dashboards und Berichte für die Überwachung von SLA-Indikatoren und die Identifizierung von Verbesserungsmöglichkeiten.',
        'services.sla.feature1': 'Echtzeitüberwachung',
        'services.sla.feature2': 'Personalisierte Berichte',
        'services.sla.feature3': 'Automatische Warnungen',
        'services.sla.feature4': 'Vorhersageanalyse',
        'services.improvement.title': 'Kontinuierliche Verbesserung',
        'services.improvement.description': 'Wir implementieren Methoden der kontinuierlichen Verbesserung zur Optimierung von Prozessen und Erreichung besserer operativer Ergebnisse.',
        'services.improvement.feature1': 'Prozessanalyse',
        'services.improvement.feature2': 'Verbesserungsimplementierung',
        'services.improvement.feature3': 'Teamschulung',
        'services.improvement.feature4': 'Ergebnisverfolgung',
        'about.title': 'Über ANAISSI DATA STRATEGY',
        'about.description': 'Wir sind Spezialisten für digitale Transformation, fokussiert auf Prozessautomatisierung und Datenanalyse zur Förderung des Wachstums unserer Kunden.',
        'about.feature1': 'Bewährte RPA-Erfahrung',
        'about.feature2': 'Agile und effiziente Methoden',
        'about.feature3': 'Spezialisierter technischer Support',
        'about.feature4': 'Messbare Ergebnisse',
        'testimonials.title': 'Was unsere Kunden sagen',
        'testimonials.subtitle': 'Echte Ergebnisse von Unternehmen, die ihre Prozesse transformiert haben',
        'testimonials.testimonial1': '"ANAISSI hat unsere Finanzprozesse automatisiert und wir sparen 30.000€/Monat. ROI in nur 2 Monaten!"',
        'testimonials.testimonial2': '"Wir reduzierten 80% der Zeit für administrative Prozesse. Das Team konzentriert sich jetzt auf das, was wirklich wichtig ist."',
        'testimonials.testimonial3': '"Schnelle Implementierung und außergewöhnlicher Support. Unsere SLAs verbesserten sich um 95% in 30 Tagen."',
        'testimonials.author1': 'CFO - TechCorp',
        'testimonials.author2': 'Direktor - Innovation GmbH',
        'testimonials.author3': 'CEO - PortoEx',
        'stats.timeReduction': '% Zeitreduzierung',
        'stats.projectsCompleted': 'Abgeschlossene Projekte',
        'stats.accuracy': '% Genauigkeit',
        'stats.support': '24/7 Support',
        'contact.title': 'Kontakt aufnehmen',
        'contact.subtitle': 'Bereit, Ihre Prozesse zu transformieren? Lassen Sie uns über Ihre Bedürfnisse sprechen.',
        'contact.emailLabel': 'E-Mail',
        'contact.phoneLabel': 'Telefon',
        'contact.locationLabel': 'Standort',
        'contact.location': 'Itajaí, SC - Brasilien',
        'form.title': '🚀 Fordern Sie Ihre Kostenlose Beratung an',
        'form.subtitle': 'Entdecken Sie, wie Sie bis zu 50.000€/Monat mit Automatisierung sparen können',
        'form.employeesPlaceholder': 'Wie viele Mitarbeiter hat Ihr Unternehmen?',
        'form.employees1': '1-10 Mitarbeiter',
        'form.employees2': '11-50 Mitarbeiter',
        'form.employees3': '51-200 Mitarbeiter',
        'form.employees4': 'Mehr als 200 Mitarbeiter',
        'form.interestPlaceholder': 'Welcher Service interessiert Sie am meisten?',
        'form.interestRpa': 'RPA-Automatisierung',
        'form.interestSla': 'SLA-Analyse',
        'form.interestImprovement': 'Kontinuierliche Verbesserung',
        'form.interestAll': 'Alle Services',
        'form.benefitsTitle': '🎁 Was Sie in der Beratung erhalten:',
        'form.benefit1': 'Kostenlose Analyse Ihrer Prozesse',
        'form.benefit2': 'Personalisierter Einsparungsvorschlag',
        'form.benefit3': 'ROI-Schätzung in 30 Tagen',
        'form.benefit4': 'Detaillierter Implementierungsplan',
        'form.submitButton': 'ICH WILL MEINE KOSTENLOSE BERATUNG',
        'form.disclaimer': 'Ihre Daten sind sicher. Wir senden keinen Spam.',
        'footer.copyright': '© 2024 ANAISSI DATA STRATEGY. Alle Rechte vorbehalten.'
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
        // Check if element has HTML content (like buttons with icons)
        if (element.innerHTML.includes('<i class=')) {
            const iconMatch = element.innerHTML.match(/<i class="[^"]*"[^>]*><\/i>/);
            if (iconMatch) {
                element.innerHTML = iconMatch[0] + ' ' + translations[lang][key];
            }
        } else {
            element.textContent = translations[lang][key];
        }
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

// Initialize EmailJS
(function() {
    emailjs.init("uVsyH-pcT942zyaDH");
})();

// Form submission handling with EmailJS
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
        // Send email using EmailJS
        const templateParams = {
            from_name: data.name,
            from_email: data.email,
            phone: data.phone,
            company: data.company,
            employees: data.employees,
            interest: data.interest,
            message: data.message,
            to_email: 'anaissiabraao@gmail.com'
        };
        
        const response = await emailjs.send(
            'service_us0gycu',
            'template_fddaqoi',
            templateParams
        );
        
        if (response.status === 200) {
            showNotification('🎉 Consultoria solicitada com sucesso! Entraremos em contato em até 2 horas úteis.', 'success');
            contactForm.reset();
            trackConversion('consultoria_solicitada');
        } else {
            throw new Error('Erro no envio');
        }
    } catch (error) {
        console.error('Erro ao enviar email:', error);
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
