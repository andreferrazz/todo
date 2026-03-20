<script lang="ts">
	import type { Task } from '$lib/types.js';
	import InlineEdit from './InlineEdit.svelte';
	import SwipeableRow from './SwipeableRow.svelte';
	import { dot, rephrase, remove } from '$lib/stores/taskStore.svelte.js';
	import { linkify } from '$lib/utils/linkify.js';
	import { getTranslations } from '$lib/i18n/index.js';

	let t = $derived(getTranslations());
	let { task }: { task: Task } = $props();
	let editing = $state(false);

	async function handleDot() {
		await dot(task._id);
	}

	async function handleRephrase(newText: string) {
		await rephrase(task._id, newText);
		editing = false;
	}

	async function handleDelete() {
		await remove(task._id);
	}
</script>

<SwipeableRow
	onswiperight={handleDelete}
	onswipeleft={() => (editing = true)}
	rightColor="bg-red-500"
	leftColor="bg-blue-500"
	disabled={editing}
>
	{#snippet rightIcon()}
		<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
		</svg>
	{/snippet}
	{#snippet leftIcon()}
		<svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
		</svg>
	{/snippet}
	<div class="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 group">
		<button
			onclick={handleDot}
			class="flex-shrink-0 w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 transition-colors"
			title={t.tasks.dotTitle}
		></button>

		{#if editing}
			<InlineEdit
				initialValue={task.text}
				onsave={handleRephrase}
				oncancel={() => (editing = false)}
			/>
		{:else}
			<span class="flex-1 text-gray-700 dark:text-gray-200">{@html linkify(task.text)}</span>
			<div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
				<button
					onclick={() => (editing = true)}
					class="p-1.5 text-gray-400 dark:text-gray-500 hover:text-blue-500 rounded transition-colors"
					title={t.tasks.rephrase}
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
					</svg>
				</button>
				<button
					onclick={handleDelete}
					class="p-1.5 text-gray-400 dark:text-gray-500 hover:text-red-500 rounded transition-colors"
					title={t.tasks.delete}
				>
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
					</svg>
				</button>
			</div>
		{/if}
	</div>
</SwipeableRow>
