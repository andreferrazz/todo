<script lang="ts">
	import { enhance } from '$app/forms';
	import CancelAction from '$lib/components/CancelAction.svelte';
	import CreateTodoForm from '$lib/components/CreateTodoForm.svelte';
	import EditAction from '$lib/components/EditAction.svelte';
	import EditTodoForm from '$lib/components/EditTodoForm.svelte';
	import MoveAction from '$lib/components/MoveAction.svelte';
	import TodoForm from '$lib/components/TodoForm.svelte';
	import type { Todo } from '$lib/todo';

	let { data } = $props();

	let todos = $state(data.todos);
	let today = $derived(todos.filter(({ today, everyDay }) => today || everyDay));
	let anotherDay = $derived(
		todos.filter(({ everyDay, today, checked }) => !everyDay && !today && !checked)
	);
	let editableTodo = $state() as string | null;

	function turnTodoEditable(todo: Todo) {
		editableTodo = todo._id;
	}

	function hideTodo(todo: Todo) {
		todos = todos.filter((t) => t._id !== todo._id);
	}

	function showNewTodo(todo: Todo) {
		todos.push({
			_id: '',
			displayText: todo.displayText,
			today: todo.today
		} as Todo);
	}
</script>

<div class="m-auto max-w-xl px-4 pb-20">
	<form method="POST" action="?/dismissToday">
		<button class="cursor-pointer py-4 text-sm text-blue-600 underline">
			Dismiss all checked
		</button>
	</form>

	<p class="text-xl font-bold">Today</p>
	{#each today as todo, i}
		{#if editableTodo === todo._id}
			<EditTodoForm {todo} aftersubmit={() => (editableTodo = null)} />
		{:else}
			<div class="flex w-full items-center justify-between">
				<TodoForm {todo} />
				<EditAction onclick={() => turnTodoEditable(todo)} />
				<MoveAction {todo} to="anotherDay" />
				<CancelAction {todo} aftersubmit={() => hideTodo(todo)} />
			</div>
		{/if}
	{/each}
	<CreateTodoForm today aftersubmit={showNewTodo} />

	<p class="mt-10 mb-2 text-xl font-bold">Another day</p>
	{#each anotherDay as todo}
		{#if editableTodo === todo._id}
			<EditTodoForm {todo} aftersubmit={() => (editableTodo = null)} />
		{:else}
			<div class="mb-2 flex w-full items-center justify-between">
				<div class="grow">{todo.displayText}</div>
				<EditAction onclick={() => turnTodoEditable(todo)} />
				<MoveAction {todo} to="today" />
				<MoveAction {todo} to="everyDay" />
				<CancelAction {todo} aftersubmit={() => hideTodo(todo)} />
			</div>
		{/if}
	{/each}
	<CreateTodoForm aftersubmit={showNewTodo} />
</div>
