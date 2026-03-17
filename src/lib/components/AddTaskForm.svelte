<script>
	import { add } from '$lib/taskStore.svelte.js';

	let text = $state('');

	async function handleSubmit(e) {
		e.preventDefault();
		const trimmed = text.trim();
		if (!trimmed) return;
		text = '';
		await add(trimmed);
	}
</script>

<form onsubmit={handleSubmit} class="flex gap-2 mb-8">
	<input
		id="add-input"
		bind:value={text}
		type="text"
		placeholder="Add a new task..."
		class="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
		autocomplete="off"
	/>
	<button
		type="submit"
		class="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
	>Add</button>
</form>
