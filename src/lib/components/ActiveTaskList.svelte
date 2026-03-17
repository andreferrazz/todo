<script>
	import ActiveTaskRow from './ActiveTaskRow.svelte';
	import { getActiveTasksList } from '$lib/taskStore.svelte.js';

	let tasks = $derived(getActiveTasksList());
</script>

<div class="mb-8 space-y-1">
	{#if tasks.length === 0}
		<p class="text-gray-400 italic text-sm">No tasks yet. Add one above.</p>
	{:else}
		{#each tasks as task (task._id)}
			<ActiveTaskRow {task} />
		{/each}
	{/if}
</div>
