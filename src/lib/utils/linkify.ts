const escapeHtml = (str: string): string =>
	str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#x27;');

const LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;

export function linkify(text: string): string {
	let result = '';
	let lastIndex = 0;

	for (const match of text.matchAll(LINK_RE)) {
		result += escapeHtml(text.slice(lastIndex, match.index));
		const linkText = escapeHtml(match[1]);
		const url = encodeURI(match[2]);
		result += `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">${linkText}</a>`;
		lastIndex = match.index + match[0].length;
	}

	result += escapeHtml(text.slice(lastIndex));
	return result;
}
