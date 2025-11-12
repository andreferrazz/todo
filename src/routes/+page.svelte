<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();

	let everyDayForms: HTMLFormElement[] = $state([]);
	let todayForms: HTMLFormElement[] = $state([]);
	const everyDay = $state(data.todos.filter(({ everyDay }) => everyDay));
	const today = $state(data.todos.filter(({ today }) => today));
	const anotherDay = $state(data.todos.filter(({ everyDay, today }) => !everyDay && !today));
</script>

<div class="m-auto max-w-xl px-4">
	<p class="mt-10 mb-2 text-xl font-bold">Every day</p>
	{#each everyDay as todo, i}
		<form
			method="POST"
			action="?/check"
			use:enhance={() =>
				async ({ update }) => {
					todo.checked = !todo.checked;
					await update();
				}}
			bind:this={everyDayForms[i]}
		>
			<input name="id" value={todo._id} type="hidden" />
			<label for="checked" class="flex h-10 w-max max-w-full items-center gap-2 leading-none">
				<input
					name="checked"
					type="checkbox"
					defaultChecked={todo.checked}
					oninput={() => everyDayForms[i]!.requestSubmit()}
				/>
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
	{#each today as todo, i}
		<form
			method="POST"
			action="?/check"
			use:enhance={() =>
				async ({ update }) => {
					todo.checked = !todo.checked;
					await update();
				}}
			bind:this={todayForms[i]}
		>
			<input name="id" value={todo._id} type="hidden" />
			<label for="checked" class="flex h-10 w-max max-w-full items-center gap-2 leading-none">
				<input
					name="checked"
					type="checkbox"
					defaultChecked={todo.checked}
					oninput={() => todayForms[i]!.requestSubmit()}
				/>
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
		<label class="flex h-10 w-max max-w-full items-center gap-2 leading-none">
			<input type="checkbox" value={todo.checked} disabled />
			{todo.displayText}
		</label>
	{/each}
	<form method="POST" action="?/create" class="mt-4">
		<input name="displayText" type="text" placeholder="Add..." class="w-full" />
		<input name="everyDay" value={false} type="hidden" />
		<input name="today" value={false} type="hidden" />
	</form>
</div>
