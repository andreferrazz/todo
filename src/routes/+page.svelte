<script lang="ts">
	import AddTaskForm from '$lib/components/AddTaskForm.svelte';
	import ActiveTaskList from '$lib/components/ActiveTaskList.svelte';
	import DottedTaskList from '$lib/components/DottedTaskList.svelte';
	import SyncBadge from '$lib/components/SyncBadge.svelte';
	import { getTranslations, getLocale, setLocale } from '$lib/i18n/index.js';

	let t = $derived(getTranslations());
	let locale = $derived(getLocale());
</script>

<svelte:head>
	<title>Re-zero</title>
</svelte:head>

<div class="max-w-xl mx-auto px-4 py-8">
	<div class="flex items-center justify-between mb-6">
		<h1 class="text-2xl font-bold bg-gradient-to-r from-blue-500 to-black bg-clip-text text-transparent">
			Re-zero
		</h1>
		<div class="flex items-center gap-3">
			<SyncBadge />
			<button
				onclick={() => setLocale(locale === 'en' ? 'pt-BR' : 'en')}
				class="text-xs text-gray-400 hover:text-gray-600 transition-colors"
			>
				{locale === 'en' ? 'PT' : 'EN'}
			</button>
			<a href="/how-it-works" title={t.header.howItWorks} class="text-gray-400 hover:text-gray-600 transition-colors">
				<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
			</a>
			<a href="https://github.com/andreferrazz/re-zero" target="_blank" rel="noopener noreferrer" title={t.header.viewOnGitHub} class="text-gray-400 hover:text-gray-600 transition-colors">
				<svg class="w-5 h-5" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
			</a>
		</div>
	</div>

	<AddTaskForm />
	<ActiveTaskList />
	<DottedTaskList />
</div>
