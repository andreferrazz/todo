<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Todo } from '$lib/todo';

	let { todo = {} as Todo, aftersubmit = () => {} } = $props();
</script>

<form
	method="POST"
	action="?/cancel"
	use:enhance={() =>
		async ({ update }) => {
            aftersubmit()
			await update();
		}}
>
	<input name="id" value={todo._id} type="hidden" />
	<button
		title="Cancel"
		class="
            h-7
            w-7
            cursor-pointer
            text-xs
            text-red-200
            hover:text-red-500"
	>
		<i class="fa-solid fa-cancel"></i>
	</button>
</form>
