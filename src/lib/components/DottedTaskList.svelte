<script lang="ts">
	import DottedTaskRow from './DottedTaskRow.svelte';
	import { getDottedTasksList, undotAll } from '$lib/stores/taskStore.svelte.js';
	import { getTranslations } from '$lib/i18n/index.js';

	let t = $derived(getTranslations());
	let tasks = $derived(getDottedTasksList());
</script>

{#if tasks.length > 0}
	<div class="flex items-center justify-between mb-3 mt-8 pt-6 border-t border-gray-200">
		<h2 class="text-sm font-semibold text-blue-600 uppercase tracking-wide">{t.tasks.dottedHeader}</h2>
		<button
			onclick={undotAll}
			class="text-xs text-gray-400 hover:text-gray-600 transition-colors"
		>{t.tasks.undotAll}</button>
	</div>
	<div class="space-y-1">
		{#each tasks as task (task._id)}
			<DottedTaskRow {task} />
		{/each}
	</div>
{/if}
