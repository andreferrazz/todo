<script lang="ts">
	import DottedTaskRow from './DottedTaskRow.svelte';
	import { getDottedTasksList, undotAll } from '$lib/taskStore.svelte.js';

	let tasks = $derived(getDottedTasksList());
</script>

{#if tasks.length > 0}
	<div class="flex items-center justify-between mb-3 mt-8 pt-6 border-t border-gray-200">
		<h2 class="text-sm font-semibold text-blue-600 uppercase tracking-wide">Dotted tasks</h2>
		<button
			onclick={undotAll}
			class="text-xs text-gray-400 hover:text-gray-600 transition-colors"
		>Undot all</button>
	</div>
	<div class="space-y-1">
		{#each tasks as task (task._id)}
			<DottedTaskRow {task} />
		{/each}
	</div>
{/if}
