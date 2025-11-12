<script lang="ts">
	let { data } = $props();

	const everyDay = $state(data.todos.filter(({ everyDay }) => everyDay));
	const today = $state(data.todos.filter(({ today }) => today));
	const anotherDay = $state(data.todos.filter(({ everyDay, today }) => !everyDay && !today));
</script>

<div class="m-auto max-w-xl px-4">
	<p class="mt-10 mb-2 text-xl font-bold">Every day</p>
	{#each everyDay as todo}
		<form method="POST" action="?/check">
			<label class="flex h-10 w-max max-w-full items-center gap-2 leading-none">
				<input type="checkbox" value={todo.checked} />
				{todo.displayText}
			</label>
		</form>
	{/each}
	<form method="POST" action="?/create" class="mt-4">
		<input name="displayText" type="text" placeholder="Add..." class="w-full" />
		<input name="everyDay" value={true} type="hidden" />
		<input name="today" value={false} type="hidden" />
	</form>

	<p class="mt-10 mb-2 text-xl font-bold">Today</p>
	{#each today as todo}
		<form method="POST" action="?/check">
			<label class="flex h-10 w-max max-w-full items-center gap-2 leading-none">
				<input type="checkbox" value={todo.checked} />
				{todo.displayText}
			</label>
		</form>
	{/each}
	<form method="POST" action="?/create" class="mt-4">
		<input name="displayText" type="text" placeholder="Add..." class="w-full" />
		<input name="everyDay" value={false} type="hidden" />
		<input name="today" value={true} type="hidden" />
	</form>

	<p class="mt-10 mb-2 text-xl font-bold">Another day</p>
	{#each anotherDay as todo}
		<form method="POST" action="?/check">
			<label class="flex h-10 w-max max-w-full items-center gap-2 leading-none">
				<input type="checkbox" value={todo.checked} disabled />
				{todo.displayText}
			</label>
		</form>
	{/each}
	<form method="POST" action="?/create" class="mt-4">
		<input name="displayText" type="text" placeholder="Add..." class="w-full" />
		<input name="everyDay" value={false} type="hidden" />
		<input name="today" value={false} type="hidden" />
	</form>
</div>
