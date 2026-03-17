<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import { refresh, startListening, stopListening } from '$lib/taskStore.svelte.js';
	import { initSync } from '$lib/syncStore.svelte.js';

	let { children }: { children: Snippet } = $props();

	$effect(() => {
		refresh();
		startListening();
		initSync();

		return () => stopListening();
	});
</script>

{@render children()}
