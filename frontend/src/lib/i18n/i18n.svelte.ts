import { ptBR, type Translations } from './pt-BR.js';
import { en } from './en.js';

export type Locale = 'en' | 'pt-BR';

const translations: Record<Locale, Translations> = { en, 'pt-BR': ptBR };

let locale: Locale = $state(resolveInitialLocale());

function resolveInitialLocale(): Locale {
	const stored = localStorage.getItem('locale');
	if (stored === 'en' || stored === 'pt-BR') return stored;
	const browserLang = navigator.language;
	return browserLang.startsWith('pt') ? 'pt-BR' : 'en';
}

export function getTranslations(): Translations {
	return translations[locale];
}

export function getLocale(): Locale {
	return locale;
}

export function setLocale(l: Locale) {
	locale = l;
	localStorage.setItem('locale', l);
	document.documentElement.lang = l;
}
