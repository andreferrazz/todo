<script lang="ts">
	import { goto } from '$app/navigation';
	import { login } from '$lib/auth.js';
	import { startSync } from '$lib/stores/syncStore.svelte.js';
	import { getTranslations } from '$lib/i18n/index.js';

	let t = $derived(getTranslations());
	let username = $state('');
	let password = $state('');
	let error = $state('');
	let loading = $state(false);

	let errorMap: Record<string, string> = $derived({
		'Invalid credentials': t.login.invalidCredentials,
	});

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		error = '';
		loading = true;

		try {
			await login(username.trim(), password);
			await startSync();
			goto('/');
		} catch (err) {
			error = err instanceof Error ? (errorMap[err.message] ?? err.message) : t.login.failed;
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>{t.login.title}</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
	<div class="max-w-sm w-full px-4">
		<h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center mb-2">Re-zero</h1>
		<p class="text-gray-500 dark:text-gray-400 text-sm text-center mb-6">{t.login.subtitle}</p>

		<form onsubmit={handleSubmit} class="space-y-4">
			<div>
				<input
					id="username"
					bind:value={username}
					type="text"
					placeholder={t.login.usernamePlaceholder}
					class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
					autocomplete="username"
					required
				/>
			</div>
			<div>
				<input
					id="password"
					bind:value={password}
					type="password"
					placeholder={t.login.passwordPlaceholder}
					class="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 text-sm bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
					autocomplete="current-password"
					required
				/>
			</div>
			{#if error}
				<p class="text-red-500 text-sm">{error}</p>
			{/if}
			<button
				type="submit"
				disabled={loading}
				class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
			>{loading ? t.login.submitting : t.login.submit}</button>
		</form>

		<p class="text-center mt-4">
			<a href="/signup" class="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">{t.login.createAccount}</a>
		</p>
		<p class="text-center mt-2">
			<a href="/" class="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">{t.login.useWithoutSync}</a>
		</p>
	</div>
</div>
