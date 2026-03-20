<script lang="ts">
	import ActiveTaskRow from './ActiveTaskRow.svelte';
	import { getActiveTasksList } from '$lib/stores/taskStore.svelte.js';
	import { getTranslations } from '$lib/i18n/index.js';

	let t = $derived(getTranslations());
	let tasks = $derived(getActiveTasksList());
</script>

<div class="mb-8 space-y-1">
	{#if tasks.length === 0}
		<p class="text-gray-400 italic text-sm">{t.tasks.empty}</p>
	{:else}
		{#each tasks as task (task._id)}
			<ActiveTaskRow {task} />
		{/each}
	{/if}
</div>
