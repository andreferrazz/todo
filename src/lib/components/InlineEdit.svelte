<script>
	import { tick } from 'svelte';

	let { value = '', onsave, oncancel } = $props();

	let inputEl = $state(null);
	let text = $state(value);

	$effect(() => {
		if (inputEl) {
			inputEl.focus();
			inputEl.select();
		}
	});

	function handleKeydown(e) {
		if (e.key === 'Enter') {
			inputEl.blur();
		}
		if (e.key === 'Escape') {
			oncancel?.();
		}
	}

	function handleBlur() {
		const trimmed = text.trim();
		if (trimmed && trimmed !== value) {
			onsave?.(trimmed);
		} else {
			oncancel?.();
		}
	}
</script>

<input
	bind:this={inputEl}
	bind:value={text}
	onkeydown={handleKeydown}
	onblur={handleBlur}
	class="flex-1 border border-blue-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
