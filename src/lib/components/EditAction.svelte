<script lang="ts">
	import type { MouseEventHandler } from "svelte/elements";

	let { onclick = (() => {}) as MouseEventHandler<HTMLButtonElement> } = $props();
</script>

<button
	{onclick}
	type="button"
	title="Edit action"
	class="
        h-7
        w-7
        cursor-pointer
        text-xs
        text-blue-200
        hover:text-blue-500"
>
	<i class="fa-solid fa-pen"></i>
</button>
