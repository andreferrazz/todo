<script lang="ts">
	import { enhance } from '$app/forms';
	import type { MouseEventHandler } from 'svelte/elements';

    type Action = "moveToAnother" | 'moveToToday' | 'moveToEvery' | 'cancel'

	let {
        type = 'button',
        onclick = (() => {}) as MouseEventHandler<HTMLButtonElement>,
        aftersubmit = () => {},
        action = 'moveToAnother' as Action,
        todoid = null,
        color = 'blue',
        icon = 'star'
    } = $props();
</script>

{#if type === 'button'}
	<button
		{onclick}
		type="button"
		aria-label="Arrow down"
		class="
            h-7
            w-7
            cursor-pointer
            text-xs
            text-{color}-200
            hover:text-{color}-500"
	>
		<i class="fa-solid fa-{icon}"></i>
	</button>
{:else}
	<form
		method="POST"
		action={ action == 'cancel' ? '?/cancel' : '?/move'}
		use:enhance={() =>
			async ({ update }) => {
				aftersubmit();
				await update();
			}}
	>
		<input name="id" value={todoid} type="hidden" />
		{#if action === 'moveToToday'}
			<input name="today" type="hidden" />
		{:else if action === 'moveToEvery'}
			<input name="everyDay" type="hidden" />
		{/if}
		<button
			aria-label="Arrow down"
			class="
                h-7
                w-7
                cursor-pointer
                text-xs
                text-{color}-200
                hover:text-{color}-500"
		>
			<i class="fa-solid fa-{icon}"></i>
		</button>
	</form>
{/if}
