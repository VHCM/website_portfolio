/**
 * i18n.js - Sistema de internacionalização (i18n) para o portfólio
 * Suporta português (pt) e inglês (en)
 * Armazena preferência no localStorage
 */

class I18nManager {
    constructor(defaultLanguage = 'pt') {
        this.currentLanguage = this.getStoredLanguage() || defaultLanguage;
        this.translations = null;
        this.supportedLanguages = ['pt', 'en'];
        this.init();
    }

    async init() {
        await this.loadTranslations();
        this.updateDOM();
        this.setupLanguageToggle();
        this.updateHtmlLang();
    }

    async loadTranslations() {
        try {
            const response = await fetch('./data/i18n.json');
            if (!response.ok) throw new Error('Falha ao carregar traduções');
            this.translations = await response.json();
            console.log('✓ Traduções carregadas com sucesso');
        } catch (error) {
            console.error('Erro ao carregar i18n.json:', error);
            // Fallback: usar traduções inline se não conseguir carregar o arquivo
            this.translations = this.getDefaultTranslations();
        }
    }

    getDefaultTranslations() {
        return {
            "pt": { "nav": { "home": "Home" } },
            "en": { "nav": { "home": "Home" } }
        };
    }

    getStoredLanguage() {
        return localStorage.getItem('portfolio-language');
    }

    setLanguage(lang) {
        if (!this.supportedLanguages.includes(lang)) {
            console.warn(`Idioma '${lang}' não suportado. Usando 'pt' como padrão.`);
            lang = 'pt';
        }

        this.currentLanguage = lang;
        localStorage.setItem('portfolio-language', lang);
        this.updateDOM();
        this.updateHtmlLang();
        this.updateLanguageToggle();
    }

    updateHtmlLang() {
        const htmlElement = document.documentElement;
        const langCode = this.currentLanguage === 'pt' ? 'pt-BR' : 'en';
        htmlElement.setAttribute('lang', langCode);
    }

    t(key, defaultValue = key) {
        const keys = key.split('.');
        let value = this.translations?.[this.currentLanguage];

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return defaultValue;
            }
        }

        return value || defaultValue;
    }

    updateDOM() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.t(key);

            // Segurança: se a tradução não for string, converter para string
            if (typeof translation === 'string') {
                if (translation.includes('<')) {
                    el.innerHTML = translation;
                } else {
                    el.textContent = translation;
                }
            } else if (translation !== undefined && translation !== null) {
                // converte objetos/arrays para string de forma legível
                el.textContent = String(translation);
            } else {
                el.textContent = key;
            }
        });

        // Atualizar atributos de title/alt/placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = this.t(key);
        });

        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            el.title = this.t(key);
        });

        document.querySelectorAll('[data-i18n-alt]').forEach(el => {
            const key = el.getAttribute('data-i18n-alt');
            el.alt = this.t(key);
        });

        document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
            const key = el.getAttribute('data-i18n-aria-label');
            el.setAttribute('aria-label', this.t(key));
        });
    }

    setupLanguageToggle() {
        const toggleBtn = document.getElementById('language-toggle');
        const toggleBtnMobile = document.getElementById('language-toggle-mobile');
        
        const handleToggle = () => {
            const nextLang = this.currentLanguage === 'pt' ? 'en' : 'pt';
            this.setLanguage(nextLang);
            this.showLanguageChangeToast();
        };

        if (toggleBtn) {
            toggleBtn.addEventListener('click', handleToggle);
        }
        
        if (toggleBtnMobile) {
            toggleBtnMobile.addEventListener('click', handleToggle);
        }

        this.updateLanguageToggle();
    }

    updateLanguageToggle() {
        const toggleBtn = document.getElementById('language-toggle');
        const toggleBtnMobile = document.getElementById('language-toggle-mobile');
        
        const updateLabel = (btn) => {
            if (!btn) return;
            const label = btn.querySelector('.language-label');
            if (label) {
                label.textContent = this.currentLanguage === 'pt' ? 'EN' : 'PT';
            }
        };

        updateLabel(toggleBtn);
        updateLabel(toggleBtnMobile);

        // Atualizar aria-label para acessibilidade
        const ariaLabel = this.currentLanguage === 'pt' 
            ? 'Mudar para inglês' 
            : 'Change to Portuguese';
        
        if (toggleBtn) {
            toggleBtn.setAttribute('aria-label', ariaLabel);
        }
        
        if (toggleBtnMobile) {
            toggleBtnMobile.setAttribute('aria-label', ariaLabel);
        }
    }

    showLanguageChangeToast() {
        const message = this.currentLanguage === 'pt' 
            ? 'Idioma alterado para Português' 
            : 'Language changed to English';
        
        // Usar ToastManager se disponível
        if (window.ToastManager) {
            window.ToastManager.show(message, 'success');
        }
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    getLanguageName() {
        return this.t('language');
    }
}

// Inicializar i18n quando o DOM estiver carregado
let i18nManager;
document.addEventListener('DOMContentLoaded', () => {
    if (!i18nManager) {
        i18nManager = new I18nManager('pt');
    }
    // expor a instância globalmente somente após inicialização
    window.i18nManager = i18nManager;
});

// Expor globalmente
window.i18nManager = i18nManager;
