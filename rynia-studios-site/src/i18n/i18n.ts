// src/i18n/i18n.ts
import en from './en.json';
import tr from './tr.json';

export type Language = 'en' | 'tr';
type Translations = Record<string, Record<string, string>>;

const translations: Record<Language, Translations> = { en, tr };
let currentLang: Language = 'en';

// Dil değiştir ve localStorage'a kaydet
export function setLanguage(lang: Language): void {
  if (translations[lang]) {
    currentLang = lang;
    try {
      localStorage.setItem('rynia-lang', lang);
    } catch (e) {
      // Ignore localStorage errors
    }
    document.documentElement.lang = lang;
    applyTranslations();
    updateLanguageToggleUI(lang);
  }
}

// Sayfa yüklendiğinde kaydedilmiş dili uygula
export function initLanguage(): void {
  let lang: Language = 'en';
  try {
    const saved = localStorage.getItem('rynia-lang') as Language | null;
    if (saved === 'en' || saved === 'tr') {
      lang = saved;
    }
  } catch (e) {}
  setLanguage(lang);
}

// Çeviri anahtarını getir
export function t(key: string): string {
  const [section, field] = key.split('.');
  return translations[currentLang]?.[section]?.[field] || key;
}

// DOM'daki tüm [data-i18n] etiketlerini güncelle
export function applyTranslations(): void {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    const value = t(key);
    if (value && value !== key) {
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = value;
      } else if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
        el.placeholder = value;
      } else {
        el.textContent = value;
      }
    }
  });
}

// Dil butonunu (TR / EN) güncelle
export function updateLanguageToggleUI(lang: Language): void {
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.textContent = lang === 'tr' ? 'TR' : 'EN';
    langToggle.setAttribute('aria-label', lang === 'tr' ? 'Switch to English' : 'Türkçe\'ye geç');
    langToggle.setAttribute('title', lang === 'tr' ? 'Switch to English' : 'Türkçe\'ye geç');
  }
}

// Mevcut dili döndür
export function getCurrentLang(): Language {
  return currentLang;
}

// Dil toggle butonuna listener bağla
export function bindLanguageButtons(): void {
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.removeEventListener('click', toggleLanguage);
    langToggle.addEventListener('click', toggleLanguage);
  }
}

function toggleLanguage(): void {
  const nextLang: Language = currentLang === 'en' ? 'tr' : 'en';
  setLanguage(nextLang);
}