import { LocaleCode, defaultLocale } from './locales';
import { en } from './translations/en';
import { tr } from './translations/tr';

const translations = {
  en,
  tr,
  // Diğer diller için fallback olarak İngilizce kullanılacak
  es: en,
  fr: en,
  de: en,
  pt: en,
  it: en,
  nl: en,
  pl: en,
  ja: en
};

export function getTranslation(locale: LocaleCode = defaultLocale) {
  return translations[locale] || translations[defaultLocale];
}

export function useTranslation() {
  if (typeof window === 'undefined') {
    return getTranslation(defaultLocale);
  }
  
  const savedLocale = localStorage.getItem('locale') as LocaleCode;
  return getTranslation(savedLocale || defaultLocale);
}

export function setLocale(locale: LocaleCode) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('locale', locale);
    window.location.reload(); // Sayfayı yenile
  }
}

export * from './locales';
