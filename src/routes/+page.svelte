<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Todo } from '$lib/todo';

	let { data, form } = $props();

	let everyDayForms: HTMLFormElement[] = $state([]);
	let todayForms: HTMLFormElement[] = $state([]);
	const everyDay = $state(data.todos.filter(({ everyDay }) => everyDay));
	const today = $state(data.todos.filter(({ today }) => today));
	const anotherDay = $state(
		data.todos.filter(({ everyDay, today, checked }) => !everyDay && !today && !checked)
	);
</script>

<div class="m-auto max-w-xl px-4 pb-20">
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
	<form
		method="POST"
		action="?/create"
		class="mt-4"
		use:enhance={({ formData }) => {
			everyDay.push({ displayText: formData.get('displayText')!.toString() } as Todo);
			return async ({ update }) => {
				await update();
				if (form?.todo) {
					everyDay[everyDay.length - 1] = form?.todo;
				}
			};
		}}
	>
		<input name="displayText" type="text" placeholder="Add..." class="w-full" />
		<input name="everyDay" value={true} type="hidden" />
		<input name="today" value={false} type="hidden" />
	</form>

	<div class="mt-10 mb-2 flex items-center gap-4">
		<p class="text-xl font-bold">Today</p>
		<form method="POST" action="?/dismissToday" use:enhance>
			<button class="cursor-pointer p-2 text-sm text-blue-600 underline">
				Dismiss all checked
			</button>
		</form>
	</div>
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
	<form
		method="POST"
		action="?/create"
		class="mt-4"
		use:enhance={({ formData }) => {
			today.push({ displayText: formData.get('displayText')!.toString() } as Todo);
			return async ({ update }) => {
				await update();
				if (form?.todo) {
					today[today.length - 1] = form?.todo;
				}
			};
		}}
	>
		<input name="displayText" type="text" placeholder="Add..." class="w-full" />
		<input name="everyDay" value={false} type="hidden" />
		<input name="today" value={true} type="hidden" />
	</form>

	<p class="mt-10 mb-2 text-xl font-bold">Another day</p>
	{#each anotherDay as todo}
		<label class="flex h-10 w-max max-w-full items-center gap-2 leading-none">
			<input type="checkbox" defaultChecked={todo.checked} disabled />
			{todo.displayText}
		</label>
	{/each}
	<form
		method="POST"
		action="?/create"
		class="mt-4"
		use:enhance={({ formData }) => {
			anotherDay.push({ displayText: formData.get('displayText')!.toString() } as Todo);
			return async ({ update }) => {
				await update();
				if (form?.todo) {
					anotherDay[anotherDay.length - 1] = form?.todo;
				}
			};
		}}
	>
		<input name="displayText" type="text" placeholder="Add..." class="w-full" />
		<input name="everyDay" value={false} type="hidden" />
		<input name="today" value={false} type="hidden" />
	</form>
</div>
