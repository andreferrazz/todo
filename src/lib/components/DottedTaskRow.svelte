<script lang="ts">
	import type { Task } from '$lib/types.js';
	import InlineEdit from './InlineEdit.svelte';
	import { undot, complete, reenter } from '$lib/stores/taskStore.svelte.js';
	import { linkify } from '$lib/utils/linkify.js';
	import { getTranslations } from '$lib/i18n/index.js';

	let t = $derived(getTranslations());
	let { task }: { task: Task } = $props();
	let reentering = $state(false);

	async function handleUndot() {
		await undot(task._id);
	}

	async function handleComplete() {
		await complete(task._id);
	}

	async function handleReenter(newText: string) {
		await reenter(task._id, newText);
		reentering = false;
	}
</script>

<div class="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950 group">
	<button
		onclick={handleUndot}
		class="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500 border-2 border-blue-500 transition-colors"
		title={t.tasks.undotTitle}
	></button>

	{#if reentering}
		<InlineEdit
			initialValue={task.text}
			onsave={handleReenter}
			oncancel={() => (reentering = false)}
		/>
	{:else}
		<span class="flex-1 text-gray-700 dark:text-gray-200">{@html linkify(task.text)}</span>
		<div class="flex gap-1 max-sm:opacity-100 opacity-0 group-hover:opacity-100 transition-opacity">
			<button
				onclick={handleComplete}
				class="px-2 py-1 text-xs bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800 rounded transition-colors"
				title={t.tasks.markDone}
			>{t.tasks.done}</button>
			<button
				onclick={() => (reentering = true)}
				class="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800 rounded transition-colors"
				title={t.tasks.reenterTitle}
			>{t.tasks.reenter}</button>
		</div>
	{/if}
</div>
