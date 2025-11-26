<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Todo } from '$lib/todo';

	let { today = false, aftersubmit = (todo: Todo) => {} } = $props();
</script>

<form
	method="POST"
	action="?/create"
	class="mt-4"
	use:enhance={({ formData }) => {
		return async ({ update, result }) => {
            const displayText = formData.get('displayText')!.toString()
            const todo = { displayText, today } as Todo
			aftersubmit(todo);
			await update();
            todo._id = (result as any).data.todo._id
		};
	}}
>
	<input name="displayText" type="text" placeholder="Add..." class="w-full" />
	<input name="everyDay" value={false} type="hidden" />
	<input name="today" value={today} type="hidden" />
</form>
