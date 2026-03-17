<script>
	import { getSyncStatus } from '$lib/syncStore.svelte.js';

	const labels = {
		synced: 'Synced',
		syncing: 'Syncing',
		offline: 'Offline',
		local: 'Local only',
	};

	const colors = {
		synced: 'bg-green-100 text-green-700',
		syncing: 'bg-blue-100 text-blue-700',
		offline: 'bg-yellow-100 text-yellow-700',
		local: 'bg-gray-100 text-gray-500',
	};

	let status = $derived(getSyncStatus());
</script>

<span class="text-xs px-2 py-0.5 rounded-full {colors[status] || ''}">
	{labels[status] || status}
</span>
