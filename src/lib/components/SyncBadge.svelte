<script lang="ts">
	import type { SyncStatus } from '$lib/types.js';
	import { getSyncStatus } from '$lib/stores/syncStore.svelte.js';
	import { getTranslations } from '$lib/i18n/index.js';

	let t = $derived(getTranslations());

	let labels: Record<SyncStatus, string> = $derived({
		synced: t.sync.synced,
		syncing: t.sync.syncing,
		offline: t.sync.offline,
		local: t.sync.local,
	});

	const colors: Record<SyncStatus, string> = {
		synced: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
		syncing: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
		offline: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
		local: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
	};

	let status = $derived(getSyncStatus());
</script>

{#if status === 'local'}
<a href="/login" class="text-xs px-2 py-0.5 rounded-full {colors[status]} hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
	{labels[status]}
</a>
{:else}
<span class="text-xs px-2 py-0.5 rounded-full {colors[status] || ''}">
	{labels[status] || status}
</span>
{/if}
