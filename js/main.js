/**
 * main.js - Funcionalidades JavaScript para o portfólio
 * Autor: Victor Hugo Correia de Melo
 * Versão: 2.0 - Otimizado e Semântico
 */

// ===== CONFIGURAÇÕES =====
const CONFIG = {
    animations: {
        staggerDelay: 80, // ms entre cada elemento
        maxStagger: 600, // ms máximo de delay
        toastDuration: 3000, // ms
        scrollOffset: 20, // pixels
    },
    selectors: {
        mobileMenu: '#mobile-menu',
        mobileMenuBtn: '#mobile-menu-btn',
        copyEmailBtn: '#copy-email-btn',
        contactEmail: '#contact-email',
        contactForm: '#contact-form',
        yearElement: '#current-year',
        skillsFilter: '[data-skill-filter]',
        skillCards: '[data-skill-category]',
        projectsFilter: '[data-project-filter]',
        projectCards: '[data-project-category]',
        scrollTo: '[data-scroll-to]',
        mobileLinks: '[data-mobile-link]',
        sectionReveal: '.section-reveal'
    },
    classes: {
        active: 'active',
        open: 'open',
        hidden: 'hidden',
        toast: 'toast',
        hide: 'hide'
    },
    // Configuração para EmailJS (deixe vazio se não for usar)
    emailjs: {
        userId: 'VETk-VfIJa6ebMEM7', // ex: 'user_xxxxxx' -> Substitua após criar conta no EmailJS
        serviceId: 'service_mxhioiw', // ex: 'service_xxx'
        templateId: 'template_up6tauu' // ex: 'template_xxx'
    }
};

// ===== UTILITÁRIOS =====
class Utils {
    /**
     * Debounce function para otimizar eventos
     */
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Verifica se o usuário prefere movimento reduzido
     */
    static prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /**
     * Verifica se é um dispositivo touch
     */
    static isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    /**
     * Copia texto para a área de transferência
     */
    static async copyToClipboard(text) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
                return true;
            } else {
                // Fallback para navegadores antigos
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                return true;
            }
        } catch (error) {
            console.error('Erro ao copiar para área de transferência:', error);
            return false;
        }
    }

    /**
     * Scroll suave para elemento
     */
    static smoothScrollTo(element, offset = 0) {
        if (!element) return;

        const prefersReduced = Utils.prefersReducedMotion();
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - offset;

        if (prefersReduced) {
            window.scrollTo({ top: offsetPosition });
        } else {
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    }
}

// ===== GERENCIADOR DE ANIMAÇÕES =====
class AnimationManager {
    constructor() {
        this.observer = null;
        this.staggerTimer = null;
        this.init();
    }

    init() {
        if (Utils.prefersReducedMotion()) return;
        this.setupIntersectionObserver();
        this.setupStaggerAnimations();
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    this.observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observar elementos com animação
        document.querySelectorAll(CONFIG.selectors.sectionReveal).forEach(el => {
            this.observer.observe(el);
        });
    }

    setupStaggerAnimations() {
        const applyStagger = () => {
            const elements = Array.from(document.querySelectorAll(CONFIG.selectors.sectionReveal));
            
            // Ordenar por posição vertical
            elements.sort((a, b) => {
                const rectA = a.getBoundingClientRect();
                const rectB = b.getBoundingClientRect();
                return (rectA.top + window.pageYOffset) - (rectB.top + window.pageYOffset);
            });

            // Aplicar delays escalonados
            elements.forEach((el, index) => {
                const delay = Math.min(index * CONFIG.animations.staggerDelay, CONFIG.animations.maxStagger);
                el.style.setProperty('--reveal-delay', `${delay}ms`);
            });
        };

        // Aplicar stagger após carregamento
        if (document.readyState === 'complete') {
            applyStagger();
        } else {
            window.addEventListener('load', applyStagger);
        }

        // Reaplicar no resize (com debounce)
        window.addEventListener('resize', Utils.debounce(applyStagger, 150));
    }
}

// ===== GERENCIADOR DE FILTROS =====
class FilterManager {
    // agora aceita atributo dos botões (buttonAttr) e atributo dos itens (itemAttr)
    constructor(filterButtons, filterItems, buttonAttr, itemAttr = null) {
        this.filterButtons = Array.from(filterButtons);
        this.filterItems = Array.from(filterItems);
        this.buttonAttribute = buttonAttr;
        // se itemAttr não informado, usa o mesmo que o botão (compatibilidade)
        this.itemAttribute = itemAttr || buttonAttr;
        this.activeFilter = 'all';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setActiveFilter('all');
    }

    setupEventListeners() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = button.getAttribute(this.buttonAttribute);
                this.setActiveFilter(filter);
            });
        });
    }

    setActiveFilter(filter) {
        this.activeFilter = filter;
        
        // Atualizar botões
        this.filterButtons.forEach(button => {
            const buttonFilter = button.getAttribute(this.buttonAttribute);
            if (buttonFilter === filter) {
                button.classList.add(CONFIG.classes.active);
                button.setAttribute('aria-pressed', 'true');
            } else {
                button.classList.remove(CONFIG.classes.active);
                button.setAttribute('aria-pressed', 'false');
            }
        });

        // Filtrar itens
        this.filterItems.forEach(item => {
            var itemFilter = item.getAttribute(this.itemAttribute) || '';

            // Permitir múltiplas categorias separadas por vírgula (ex: "dev,fluig")
            var categories = itemFilter.split(',').map(function(s) { return s.trim().toLowerCase(); }).filter(Boolean);
            var target = (filter || '').toLowerCase();

            var matches = false;
            if (target === 'all') {
                matches = true;
            } else if (categories.length === 0) {
                // sem categoria explicitada — tratar como não correspondente
                matches = false;
            } else {
                matches = categories.indexOf(target) !== -1;
            }

            // Adicionar/remover classe hidden ao invés de manipular display diretamente
            if (matches) {
                item.classList.remove('hidden');
                item.style.display = ''; // Reset para display padrão
                item.setAttribute('aria-hidden', 'false');
            } else {
                item.classList.add('hidden');
                item.style.display = 'none';
                item.setAttribute('aria-hidden', 'true');
            }
        });

        // Adicionar animação suave
        this.animateFilterChange();
    }

    animateFilterChange() {
        // Adicionar animação de fade-in para os itens que aparecem
        this.filterItems.forEach(item => {
            if (!item.classList.contains('hidden')) {
                item.classList.add('filter-fade-in');
                setTimeout(() => {
                    item.classList.remove('filter-fade-in');
                }, 300);
            }
        });
    }
}

// ===== GERENCIADOR DE MENU MOBILE =====
class MobileMenuManager {
    constructor() {
        this.menuBtn = document.querySelector(CONFIG.selectors.mobileMenuBtn);
        this.menu = document.querySelector(CONFIG.selectors.mobileMenu);
        this.isOpen = false;
        this._boundKeydown = null;
        
        if (this.menuBtn && this.menu) {
            this.init();
        }
    }

    init() {
        this.setupEventListeners();
        this.updateAccessibility();
    }

    setupEventListeners() {
        // Toggle do menu
        this.menuBtn.addEventListener('click', () => this.toggleMenu());
        
        // Fechar ao clicar em links
        document.querySelectorAll(CONFIG.selectors.mobileLinks).forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Fechar com Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });
        
        // Fechar ao clicar fora
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.menu.contains(e.target) && !this.menuBtn.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Manter foco dentro do menu quando aberto (tab trap)
        this.menu.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;
            if (e.key !== 'Tab') return;

            const focusable = this.menu.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (!focusable || focusable.length === 0) return;

            const firstElement = focusable[0];
            const lastElement = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        });
    }

    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.isOpen = true;
        this.menu.classList.add(CONFIG.classes.open);
        this.updateAccessibility();
        
        // Travar rolagem do body enquanto o menu estiver aberto
        document.body.classList.add('menu-open');

        // Alternar ícone do botão para indicar fechamento
        const icon = this.menuBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'close';
    }

    closeMenu() {
        this.isOpen = false;
        this.menu.classList.remove(CONFIG.classes.open);
        this.updateAccessibility();
        
        // Remover trava de rolagem
        document.body.classList.remove('menu-open');

        // Restaurar ícone do botão
        const icon = this.menuBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'menu';

        // Retornar foco para o botão
        this.menuBtn.focus();
    }

    updateAccessibility() {
        this.menu.setAttribute('aria-hidden', String(!this.isOpen));
        this.menuBtn.setAttribute('aria-expanded', String(this.isOpen));
        this.menuBtn.setAttribute('aria-controls', 'mobile-menu');
    }

    trapFocus() {
        const focusableElements = this.menu.querySelectorAll(
            'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            firstElement.focus();
            
            // Lidar com tab dentro do menu
            this.menu.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey && document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    } else if (!e.shiftKey && document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            });
        }
    }
}

// ===== GERENCIADOR DE CONTATO =====
class ContactManager {
    constructor() {
        this.copyBtn = document.querySelector(CONFIG.selectors.copyEmailBtn);
        this.emailElement = document.querySelector(CONFIG.selectors.contactEmail);
        this.contactForm = document.querySelector(CONFIG.selectors.contactForm);
        this.init();
    }

    init() {
        if (this.copyBtn && this.emailElement) {
            this.setupCopyEmail();
        }
        
        if (this.contactForm) {
            this.setupContactForm();
        }
    }

    setupCopyEmail() {
        this.copyBtn.addEventListener('click', async () => {
            const email = this.emailElement.textContent.trim();
            const success = await Utils.copyToClipboard(email);
            
            if (success) {
                this.showCopyFeedback();
                ToastManager.show('E-mail copiado para a área de transferência!');
            } else {
                ToastManager.show('Não foi possível copiar o e-mail. Tente manualmente.', 'error');
            }
        });
    }

    showCopyFeedback() {
        const label = this.copyBtn.querySelector('.copy-label');
        if (label) {
            const originalText = label.textContent;
            label.textContent = 'Copiado!';
            
            setTimeout(() => {
                label.textContent = originalText;
            }, 2000);
        }
    }

    setupContactForm() {
        const submitButton = this.contactForm.querySelector('button[type="submit"]');

        this.contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validação básica
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim() || 'Contato pelo portfólio';
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                ToastManager.show('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }

            // Validar email
            if (!this.isValidEmail(email)) {
                ToastManager.show('Por favor, insira um e-mail válido.', 'error');
                return;
            }

            // Helper para estado do botão
            const setLoading = (isLoading) => {
                if (!submitButton) return;
                submitButton.disabled = isLoading;
                submitButton.setAttribute('aria-busy', String(isLoading));
                const icon = submitButton.querySelector('.material-symbols-outlined');
                if (isLoading) {
                    if (icon) icon.textContent = 'autorenew';
                    submitButton.classList.add('opacity-80', 'cursor-wait');
                } else {
                    if (icon) icon.textContent = 'send';
                    submitButton.classList.remove('opacity-80', 'cursor-wait');
                }
            };

            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                to_email: this.emailElement ? this.emailElement.textContent.trim() : ''
            };

            const emailjsCfg = CONFIG.emailjs || {};
            if (emailjsCfg.userId && emailjsCfg.serviceId && emailjsCfg.templateId && window.emailjs) {
                try {
                    setLoading(true);
                    window.emailjs.init(emailjsCfg.userId);
                    const resp = await window.emailjs.send(emailjsCfg.serviceId, emailjsCfg.templateId, templateParams);
                    console.log('EmailJS send response:', resp);
                    ToastManager.show('Mensagem enviada com sucesso!');
                    this.contactForm.reset();
                    setLoading(false);
                    return;
                } catch (err) {
                    console.error('EmailJS erro:', err);
                    ToastManager.show('Falha ao enviar a mensagem por EmailJS. Tentando fallback...', 'error');
                    setLoading(false);
                }
            } else {
                if (!emailjsCfg.userId || !emailjsCfg.serviceId || !emailjsCfg.templateId) {
                    ToastManager.show('EmailJS não configurado. Abrindo cliente de e-mail...', 'warning');
                }
            }

            // Fallback: abrir cliente de e-mail (mailto)
            this.sendMailto(name, email, subject, message);
            this.contactForm.reset();
            setLoading(false);
        });
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    sendMailto(name, email, subject, message) {
        const recipient = this.emailElement.textContent.trim();
        const body = `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`;
        
        const mailtoUrl = `mailto:${encodeURIComponent(recipient)}` +
                         `?subject=${encodeURIComponent(subject)}` +
                         `&body=${encodeURIComponent(body)}`;
        
        window.open(mailtoUrl, '_blank');
        ToastManager.show('Abrindo cliente de e-mail...');
        this.contactForm.reset();
    }
}

// ===== GERENCIADOR DE TOAST =====
class ToastManager {
    static show(message, type = 'success') {
        // Remover toast anterior
        const existingToast = document.querySelector(`.${CONFIG.classes.toast}`);
        if (existingToast) {
            existingToast.remove();
        }
        
        // Criar novo toast
        const toast = document.createElement('div');
        toast.className = `${CONFIG.classes.toast} ${type}`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Remover após tempo
        setTimeout(() => {
            toast.classList.add(CONFIG.classes.hide);
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, CONFIG.animations.toastDuration);
    }
}

// ===== INICIALIZAÇÃO =====
class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        // Elementos básicos
        this.setCurrentYear();
        this.setupScrollTo();
        
        // Gerenciadores
        this.animationManager = new AnimationManager();
        this.mobileMenuManager = new MobileMenuManager();
        this.contactManager = new ContactManager();
        
        // Filtros
        this.setupFilters();
        
        // Eventos globais
        this.setupGlobalEvents();
    }

    setCurrentYear() {
        const yearElement = document.querySelector(CONFIG.selectors.yearElement);
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    setupScrollTo() {
        document.querySelectorAll(CONFIG.selectors.scrollTo).forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const target = button.getAttribute('data-scroll-to');
                const element = document.querySelector(target);
                if (element) {
                    Utils.smoothScrollTo(element, CONFIG.animations.scrollOffset);
                }
            });
        });
    }

    setupFilters() {
        // Filtro de habilidades
        const skillFilterButtons = document.querySelectorAll(CONFIG.selectors.skillsFilter);
        const skillCards = document.querySelectorAll(CONFIG.selectors.skillCards);
        
        if (skillFilterButtons.length && skillCards.length) {
            this.skillFilterManager = new FilterManager(
                skillFilterButtons,
                skillCards,
                'data-skill-filter',
                'data-skill-category'
            );
        }
        
        // Filtro de projetos
        const projectFilterButtons = document.querySelectorAll(CONFIG.selectors.projectsFilter);
        const projectCards = document.querySelectorAll(CONFIG.selectors.projectCards);
        
        if (projectFilterButtons.length && projectCards.length) {
            this.projectFilterManager = new FilterManager(
                projectFilterButtons,
                projectCards,
                'data-project-filter',
                'data-project-category'
            );
        }
    }

    setupGlobalEvents() {
        // Header scroll effect
        let lastScroll = 0;
        const header = document.querySelector('header');
        
        window.addEventListener('scroll', Utils.debounce(() => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('scrolled');
            } else if (currentScroll > lastScroll && currentScroll > 100) {
                header.classList.add('scrolled');
            } else if (currentScroll < lastScroll) {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        }, 100));
    }
}

// ===== INICIAR APLICAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    // Verificar suporte a JavaScript
    document.documentElement.classList.add('js-enabled');
    
    // Inicializar aplicação
    new PortfolioApp();
    
    // Feedback de carregamento
    console.log('Portfólio carregado com sucesso! 🚀');
});

// ===== POLYFILLS & FALLBACKS =====
// Suporte para intersection observer
if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver não suportado. Carregando polyfill...');
    const script = document.createElement('script');
    script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
    document.head.appendChild(script);
}

// Suporte para smooth scroll
if (!('scrollBehavior' in document.documentElement.style)) {
    console.warn('scrollBehavior não suportado. Carregando polyfill...');
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
    script.onload = () => {
        window.__forceSmoothScrollPolyfill__ = true;
    };
    document.head.appendChild(script);
}