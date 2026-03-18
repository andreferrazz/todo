<script lang="ts">
	import { goto } from '$app/navigation';
	import { signup } from '$lib/auth.js';
	import { startSync } from '$lib/stores/syncStore.svelte.js';

	let username = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let error = $state('');

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		error = '';

		if (password !== confirmPassword) {
			error = 'Passwords do not match';
			return;
		}

		try {
			await signup(username.trim(), password);
			await startSync();
			goto('/');
		} catch (err) {
			error = err instanceof Error ? err.message : 'Sign-up failed';
		}
	}
</script>

<div class="min-h-screen flex items-center justify-center">
	<div class="max-w-sm w-full px-4">
		<h1 class="text-2xl font-bold text-gray-800 text-center mb-2">Re-zero</h1>
		<p class="text-gray-500 text-sm text-center mb-6">Create an account to sync across devices</p>

		<form onsubmit={handleSubmit} class="space-y-4">
			<div>
				<input
					id="username"
					bind:value={username}
					type="text"
					placeholder="Username"
					class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					autocomplete="username"
					required
				/>
			</div>
			<div>
				<input
					id="password"
					bind:value={password}
					type="password"
					placeholder="Password"
					class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					autocomplete="new-password"
					required
				/>
			</div>
			<div>
				<input
					id="confirm-password"
					bind:value={confirmPassword}
					type="password"
					placeholder="Confirm password"
					class="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					autocomplete="new-password"
					required
				/>
			</div>
			{#if error}
				<p class="text-red-500 text-sm">{error}</p>
			{/if}
			<button
				type="submit"
				class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
			>Create account</button>
		</form>

		<p class="text-center mt-4">
			<a href="/login" class="text-sm text-gray-400 hover:text-gray-600 transition-colors">Already have an account? Sign in</a>
		</p>
	</div>
</div>
