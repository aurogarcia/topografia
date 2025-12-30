// TopAuro - JavaScript Principal
document.addEventListener('DOMContentLoaded', function() {
    // Inicialização
    initNavigation();
    initPortfolioFilters();
    initContactForm();
    initScrollAnimations();
    initSmoothScrolling();
});

// Navegação Mobile
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu mobile
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Destacar link ativo na navegação
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Efeito de transparência no header ao rolar
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Filtros do Portfólio
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover classe ativa de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar classe ativa ao botão clicado
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Formulário de Contato
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            if (validateForm()) {
                // Simular envio
                showSuccessMessage();
                form.reset();
            }
        });
    }

    // Máscara para telefone
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function() {
            this.value = phoneMask(this.value);
        });
    }
}

// Validação do formulário
function validateForm() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const servico = document.getElementById('servico').value;
    
    if (!nome) {
        showErrorMessage('Por favor, preencha seu nome.');
        return false;
    }
    
    if (!email || !isValidEmail(email)) {
        showErrorMessage('Por favor, preencha um e-mail válido.');
        return false;
    }
    
    if (!servico) {
        showErrorMessage('Por favor, selecione um serviço.');
        return false;
    }
    
    return true;
}

// Validar e-mail
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Máscara para telefone
function phoneMask(value) {
    // Remove tudo que não é dígito
    value = value.replace(/\D/g, '');
    
    // Aplica a máscara
    if (value.length <= 10) {
        value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    } else {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    
    return value;
}

// Mostrar mensagem de sucesso
function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'alert alert-success';
    message.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Mensagem enviada com sucesso! Entraremos em contato em breve.</span>
        <button type="button" class="alert-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(message, form);
    
    // CSS dinâmico para o alerta
    addAlertStyles();
    
    // Remove automaticamente após 5 segundos
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 5000);
}

// Mostrar mensagem de erro
function showErrorMessage(text) {
    const message = document.createElement('div');
    message.className = 'alert alert-error';
    message.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${text}</span>
        <button type="button" class="alert-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(message, form);
    
    // CSS dinâmico para o alerta
    addAlertStyles();
    
    // Remove automaticamente após 5 segundos
    setTimeout(() => {
        if (message.parentNode) {
            message.remove();
        }
    }, 5000);
}

// Adicionar estilos dos alertas dinamicamente
function addAlertStyles() {
    if (!document.querySelector('#alert-styles')) {
        const styles = document.createElement('style');
        styles.id = 'alert-styles';
        styles.innerHTML = `
            .alert {
                padding: 15px 20px;
                margin-bottom: 20px;
                border-radius: 5px;
                display: flex;
                align-items: center;
                gap: 10px;
                animation: slideDown 0.3s ease;
            }
            .alert-success {
                background: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
            }
            .alert-error {
                background: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
            }
            .alert-close {
                background: none;
                border: none;
                font-size: 20px;
                cursor: pointer;
                margin-left: auto;
                opacity: 0.6;
            }
            .alert-close:hover {
                opacity: 1;
            }
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(styles);
    }
}

// Animações no Scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const elementsToAnimate = document.querySelectorAll('.service-card, .portfolio-item, .stat-item, .contact-item');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });

    // Animação de contadores
    const statNumbers = document.querySelectorAll('.stat-item h4');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Animar contadores
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        const suffix = element.textContent.includes('+') ? '+' : 
                      element.textContent.includes('%') ? '%' : '';
        element.textContent = Math.floor(current) + suffix;
    }, 20);
}

// Scroll Suave
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Compensar altura do header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Lazy Loading de Imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Funções utilitárias
const utils = {
    // Debounce function
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Detectar dispositivo móvel
    isMobile: function() {
        return window.innerWidth <= 768;
    },

    // Scroll até elemento
    scrollToElement: function(element, offset = 80) {
        const elementTop = element.offsetTop - offset;
        window.scrollTo({
            top: elementTop,
            behavior: 'smooth'
        });
    }
};

// WhatsApp Integration
function initWhatsApp() {
    const whatsappBtn = document.createElement('div');
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = `
        <a href="https://wa.me/5522988292860?text=Ol%C3%A1!%20Gostaria%20de%20solicitar%20um%20or%C3%A7amento%20de%20topografia%20ou%20georreferenciamento." 
           target="_blank" title="Fale conosco no WhatsApp">
            <i class="fab fa-whatsapp"></i>
        </a>
    `;
    
    document.body.appendChild(whatsappBtn);
    
    // CSS para o botão flutuante
    const whatsappStyles = document.createElement('style');
    whatsappStyles.innerHTML = `
        .whatsapp-float {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
        }
        .whatsapp-float a {
            width: 60px;
            height: 60px;
            background: #25D366;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 30px;
            text-decoration: none;
            box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
            transition: all 0.3s ease;
            animation: pulse 2s infinite;
        }
        .whatsapp-float a:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        @media (max-width: 768px) {
            .whatsapp-float {
                bottom: 15px;
                right: 15px;
            }
            .whatsapp-float a {
                width: 50px;
                height: 50px;
                font-size: 25px;
            }
        }
    `;
    document.head.appendChild(whatsappStyles);
}

// Inicializar WhatsApp após carregamento
window.addEventListener('load', function() {
    initWhatsApp();
});

// Performance Optimization
function optimizePerformance() {
    // Lazy loading para imagens
    if ('IntersectionObserver' in window) {
        initLazyLoading();
    }

    // Preload de recursos importantes
    const preloadLinks = [
        '/css/styles.css',
        '/js/script.js'
    ];

    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = href.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });
}

// Chamada das otimizações
window.addEventListener('load', optimizePerformance);