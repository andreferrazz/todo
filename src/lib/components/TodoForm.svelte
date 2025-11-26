<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Todo } from '$lib/todo';

	let { todo = {} as Todo } = $props();

	let formElement = $state() as HTMLFormElement;
</script>

<form
	class="grow flex w-full items-center justify-between gap-4"
	method="POST"
	action="?/check"
	use:enhance={() =>
		async ({ update }) => {
			todo.checked = !todo.checked;
			await update();
		}}
	bind:this={formElement}
>
	<input name="id" value={todo._id} type="hidden" />
	<label
		for="checked"
		class="
            flex
            h-10
            w-max
            max-w-full
            items-center
            gap-2
            leading-none"
	>
		<input
			name="checked"
			type="checkbox"
			defaultChecked={todo.checked}
			oninput={() => formElement.requestSubmit()}
		/>
		{todo.displayText}
	</label>
</form>
