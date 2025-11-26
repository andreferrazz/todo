<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Todo } from '$lib/todo';

	type MoveOption = 'today' | 'everyDay' | 'anotherDay';

	let { todo = {} as Todo, to = '' as MoveOption } = $props();

	function getIcon() {
		switch (to) {
			case 'today':
				return 'arrow-up';
			case 'everyDay':
				return 'calendar';
			case 'anotherDay':
				return 'arrow-down';
		}
	}
</script>

<form
	method="POST"
	action="?/move"
	use:enhance={() =>
		async ({ update }) => {
			switch (to) {
				case 'today':
					todo.today = true;
					break;
				case 'everyDay':
					todo.everyDay = true;
					break;
				case 'anotherDay':
					todo.everyDay = todo.today = false;
					break;
			}
			await update();
		}}
>
	<input name="id" value={todo._id} type="hidden" />
	<input name={to} type="hidden" />
	<button
		title="Move to {to}"
		class="
            h-7
            w-7
            cursor-pointer
            text-xs
            text-blue-200
            hover:text-blue-500"
	>
		<i class="fa-solid fa-{getIcon()}"></i>
	</button>
</form>
