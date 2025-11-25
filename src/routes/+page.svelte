<script lang="ts">
	import { enhance } from '$app/forms';
	import Action from '$lib/components/Action.svelte';
	import type { Todo } from '$lib/todo';

	let { data, form } = $props();

	let everyDayForms: HTMLFormElement[] = $state([]);
	let todayForms: HTMLFormElement[] = $state([]);
	let todos = $state(data.todos);
	let everyDay = $derived(todos.filter(({ everyDay }) => everyDay));
	let today = $derived(todos.filter(({ today }) => today));
	let anotherDay = $derived(
		todos.filter(({ everyDay, today, checked }) => !everyDay && !today && !checked)
	);
	let editTodo = $state() as string | null;
	let editForm = $state() as HTMLFormElement;
	let editInput = $state() as HTMLInputElement;
	let isSubmitting = $state(false);
</script>

<div class="m-auto max-w-xl px-4 pb-20">
	<p class="mt-10 mb-2 text-xl font-bold">Every day</p>
	{#each everyDay as todo, i}
		<div class="flex items-center gap-4">
			{#if editTodo === todo._id}
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
							editTodo = null;
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
			{:else}
				<div class="group flex w-full items-center justify-between gap-4">
					<form
						class="group flex w-full items-center justify-between gap-4"
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
					<div class="flex gap-1">
						<Action
							type="button"
							color="blue"
							icon="pen"
							onclick={() => {
								editTodo = todo._id;
								setTimeout(() => editInput.focus(), 1);
							}}
						/>
						<Action
							type="form"
							color="red"
							icon="arrow-down"
							action="moveToAnother"
							todoid={todo._id}
							aftersubmit={() => (todo.everyDay = false)}
						/>
					</div>
				</div>
			{/if}
		</div>
	{/each}
	<form
		method="POST"
		action="?/create"
		class="mt-4"
		use:enhance={({ formData }) => {
			return async ({ update }) => {
				todos.push({
					displayText: formData.get('displayText')!.toString(),
					everyDay: true
				} as Todo);
				await update();
				if (form?.todo) {
					todos[todos.length - 1] = form?.todo;
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
		<form method="POST" action="?/dismissToday">
			<button class="cursor-pointer p-2 text-sm text-blue-600 underline">
				Dismiss all checked
			</button>
		</form>
	</div>
	{#each today as todo, i}
		<div class="flex items-center gap-4">
			{#if editTodo === todo._id}
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
							editTodo = null;
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
			{:else}
				<div class="group flex w-full items-center justify-between gap-4">
					<form
						class="flex w-full items-center justify-between gap-4"
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
					<div class="flex gap-1">
						<Action
							type="button"
							color="blue"
							icon="pen"
							onclick={() => {
								editTodo = todo._id;
								setTimeout(() => editInput.focus(), 1);
							}}
						/>
						<Action
							type="form"
							color="red"
							icon="arrow-down"
							action="moveToAnother"
							todoid={todo._id}
							aftersubmit={() => (todo.today = false)}
						/>
					</div>
				</div>
			{/if}
		</div>
	{/each}
	<form
		method="POST"
		action="?/create"
		class="mt-4"
		use:enhance={({ formData }) => {
			todos.push({
				displayText: formData.get('displayText')!.toString(),
				today: true
			} as Todo);
			return async ({ update }) => {
				await update();
				if (form?.todo) {
					todos[todos.length - 1] = form?.todo;
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
		<div class="flex items-center gap-4">
			{#if editTodo === todo._id}
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
							editTodo = null;
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
			{:else}
				<div class="group flex w-full items-center justify-between">
					<label class="flex h-10 w-max max-w-full grow items-center gap-2 leading-none">
						<input type="checkbox" defaultChecked={todo.checked} disabled />
						{todo.displayText}
					</label>
					<Action
						type="button"
						color="blue"
						icon="pen"
						onclick={() => {
							editTodo = todo._id;
							setTimeout(() => editInput.focus(), 1);
						}}
					/>
					<Action
						type="form"
						color="blue"
						icon="arrow-up"
						action="moveToToday"
						todoid={todo._id}
						aftersubmit={() => (todo.today = true)}
					/>
					<Action
						type="form"
						color="green"
						icon="arrow-up"
						action="moveToEvery"
						todoid={todo._id}
						aftersubmit={() => (todo.everyDay = true)}
					/>
					<Action
						type="form"
						color="red"
						icon="cancel"
						action="cancel"
						todoid={todo._id}
						aftersubmit={() => {}}
					/>
				</div>
			{/if}
		</div>
	{/each}
	<form
		method="POST"
		action="?/create"
		class="mt-4"
		use:enhance={({ formData }) => {
			todos.push({ displayText: formData.get('displayText')!.toString() } as Todo);
			return async ({ update }) => {
				await update();
				if (form?.todo) {
					todos[todos.length - 1] = form?.todo;
				}
			};
		}}
	>
		<input name="displayText" type="text" placeholder="Add..." class="w-full" />
		<input name="everyDay" value={false} type="hidden" />
		<input name="today" value={false} type="hidden" />
	</form>
</div>
