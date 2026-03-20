export type Theme = 'light' | 'dark';

let theme: Theme = $state(resolveInitialTheme());

function resolveInitialTheme(): Theme {
	const stored = localStorage.getItem('theme');
	if (stored === 'light' || stored === 'dark') return stored;
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getTheme(): Theme {
	return theme;
}

export function setTheme(t: Theme) {
	theme = t;
	localStorage.setItem('theme', t);
	document.documentElement.classList.toggle('dark', t === 'dark');
}

export function toggleTheme() {
	setTheme(theme === 'light' ? 'dark' : 'light');
}
