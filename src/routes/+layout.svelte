<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	import { refresh, startListening, stopListening } from '$lib/taskStore.svelte.js';
	import { startSync } from '$lib/syncStore.svelte.js';

	let { children }: { children: Snippet } = $props();

	$effect(() => {
		refresh();
		startListening();
		startSync();

		return () => stopListening();
	});
</script>

{@render children()}
