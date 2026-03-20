<script lang="ts">
	import AddTaskForm from '$lib/components/AddTaskForm.svelte';
	import ActiveTaskList from '$lib/components/ActiveTaskList.svelte';
	import DottedTaskList from '$lib/components/DottedTaskList.svelte';
	import SyncBadge from '$lib/components/SyncBadge.svelte';
	import { getTranslations, getLocale, setLocale } from '$lib/i18n/index.js';
	import { getTheme, toggleTheme } from '$lib/stores/themeStore.svelte.js';

	let t = $derived(getTranslations());
	let locale = $derived(getLocale());
	let theme = $derived(getTheme());
</script>

<svelte:head>
	<title>Re-zero</title>
</svelte:head>

<div class="max-w-xl mx-auto px-4 py-8">
	<div class="flex items-center justify-between mb-6">
		<h1 class="text-2xl font-bold bg-gradient-to-r from-blue-500 to-black dark:to-white bg-clip-text text-transparent">
			Re-zero
		</h1>
		<div class="flex items-center gap-3">
			<SyncBadge />
			<button
				onclick={toggleTheme}
				class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
				title={theme === 'light' ? 'Dark mode' : 'Light mode'}
			>
				{#if theme === 'light'}
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
				{:else}
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
				{/if}
			</button>
			<button
				onclick={() => setLocale(locale === 'en' ? 'pt-BR' : 'en')}
				class="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
			>
				{locale === 'en' ? 'PT' : 'EN'}
			</button>
			<a href="/how-it-works" title={t.header.howItWorks} class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
				<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
			</a>
			<a href="https://github.com/andreferrazz/re-zero" target="_blank" rel="noopener noreferrer" title={t.header.viewOnGitHub} class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
				<svg class="w-5 h-5" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
			</a>
		</div>
	</div>

	<AddTaskForm />
	<ActiveTaskList />
	<DottedTaskList />
</div>
