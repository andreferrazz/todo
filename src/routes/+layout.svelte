<script>
	import '../app.css';
	import { onDestroy } from 'svelte';
	import { refresh, startListening, stopListening } from '$lib/taskStore.svelte.js';
	import { initSync } from '$lib/syncStore.svelte.js';

	let { children } = $props();

	$effect(() => {
		refresh();
		startListening();
		initSync();

		return () => stopListening();
	});
</script>

{@render children()}
