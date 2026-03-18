<script lang="ts">
	import AddTaskForm from '$lib/components/AddTaskForm.svelte';
	import ActiveTaskList from '$lib/components/ActiveTaskList.svelte';
	import DottedTaskList from '$lib/components/DottedTaskList.svelte';
	import SyncBadge from '$lib/components/SyncBadge.svelte';
</script>

<div class="max-w-xl mx-auto px-4 py-8">
	<div class="flex items-center justify-between mb-6">
		<h1 class="text-2xl font-bold text-gray-800">Re-zero</h1>
		<div class="flex items-center gap-3">
			<SyncBadge />
			<a href="/how-it-works" class="text-sm text-blue-500 hover:text-blue-700 transition-colors">How it works</a>
		</div>
	</div>

	<AddTaskForm />
	<ActiveTaskList />
	<DottedTaskList />
</div>
