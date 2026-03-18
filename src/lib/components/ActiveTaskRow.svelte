<script lang="ts">
	import type { Task } from '$lib/types.js';
	import InlineEdit from './InlineEdit.svelte';
	import { dot, rephrase, remove } from '$lib/stores/taskStore.svelte.js';
	import { linkify } from '$lib/utils/linkify.js';

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

<div class="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 group">
	<button
		onclick={handleDot}
		class="flex-shrink-0 w-5 h-5 rounded-full border-2 border-gray-300 hover:border-blue-500 transition-colors"
		title="Dot this task"
	></button>

	{#if editing}
		<InlineEdit
			initialValue={task.text}
			onsave={handleRephrase}
			oncancel={() => (editing = false)}
		/>
	{:else}
		<span class="flex-1 text-gray-700">{@html linkify(task.text)}</span>
		<div class="flex gap-1 max-sm:opacity-100 opacity-0 group-hover:opacity-100 transition-opacity">
			<button
				onclick={() => (editing = true)}
				class="p-1.5 text-gray-400 hover:text-blue-500 rounded transition-colors"
				title="Rephrase"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
				</svg>
			</button>
			<button
				onclick={handleDelete}
				class="p-1.5 text-gray-400 hover:text-red-500 rounded transition-colors"
				title="Delete"
			>
				<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
				</svg>
			</button>
		</div>
	{/if}
</div>
