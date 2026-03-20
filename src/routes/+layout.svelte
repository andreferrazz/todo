<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import { refresh, startListening, stopListening } from '$lib/stores/taskStore.svelte.js';
	import { startSync } from '$lib/stores/syncStore.svelte.js';
	import { getTheme } from '$lib/stores/themeStore.svelte.js';

	let { children }: { children: Snippet } = $props();

	$effect(() => {
		document.documentElement.classList.toggle('dark', getTheme() === 'dark');
	});

	$effect(() => {
		refresh();
		startListening();
		startSync();

		return () => stopListening();
	});
</script>

{@render children()}
