<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Todo } from '$lib/todo';
	import { onMount } from 'svelte';

	let { todo = {} as Todo, aftersubmit = () => {} } = $props();

	let isSubmitting = $state(false);
	let editForm = $state() as HTMLFormElement;
	let editInput = $state() as HTMLInputElement;

    onMount(() => {
        editInput.focus()
    })
</script>

<form
	bind:this={editForm}
	class="w-full"
	method="POST"
	action="?/update"
	use:enhance={({ formData, cancel }) => {
		if (isSubmitting) {
			cancel();
		}
		isSubmitting = true;
		return async ({ update }) => {
			todo.displayText = formData.get('displayText')!.toString().trim();
            aftersubmit()
			await update();
			isSubmitting = false;
		};
	}}
>
	<input name="id" value={todo._id} type="hidden" />
	<input
		bind:this={editInput}
		name="displayText"
		value={todo.displayText}
		type="text"
		class="w-full"
		onblur={() => editForm.requestSubmit()}
	/>
</form>
