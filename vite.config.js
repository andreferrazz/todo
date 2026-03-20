import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			manifest: {
				name: 'ReZero',
				short_name: 'ReZero',
				description: 'A task management app based on Mark Forster\'s Resistance Zero system',
				theme_color: '#3b82f6',
				background_color: '#ffffff',
				display: 'standalone',
				icons: [
					{
						src: 'pwa-64x64.png',
						sizes: '64x64',
						type: 'image/png',
					},
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
					{
						src: 'maskable-icon-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable',
					},
				],
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,svg,png,ico,woff,woff2}'],
			},
		}),
	],
	resolve: {
		alias: {
			pouchdb: 'pouchdb-browser',
			events: 'events',
		},
	},
	optimizeDeps: {
		include: ['pouchdb-browser', 'events'],
	},
});
