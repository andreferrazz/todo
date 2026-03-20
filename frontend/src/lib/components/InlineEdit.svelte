<script lang="ts">
	interface Props {
		initialValue?: string
		onsave?: (text: string) => void
		oncancel?: () => void
	}

	let { initialValue = '', onsave, oncancel }: Props = $props();

	let inputEl: HTMLInputElement | null = null;

	$effect(() => {
		if (inputEl) {
			inputEl.value = initialValue;
			inputEl.focus();
			inputEl.select();
		}
	});

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			inputEl?.blur();
		}
		if (e.key === 'Escape') {
			oncancel?.();
		}
	}

	function handleBlur() {
		const trimmed = inputEl?.value.trim() ?? '';
		if (trimmed && trimmed !== initialValue) {
			onsave?.(trimmed);
		} else {
			oncancel?.();
		}
	}
</script>

<input
	bind:this={inputEl}
	onkeydown={handleKeydown}
	onblur={handleBlur}
	class="flex-1 border border-blue-300 dark:border-blue-600 rounded px-2 py-1 text-sm bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
