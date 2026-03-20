<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		onswiperight,
		onswipeleft,
		rightColor = 'bg-red-500',
		leftColor = 'bg-blue-500',
		rightIcon,
		leftIcon,
		disabled = false,
		children
	}: {
		onswiperight?: () => void;
		onswipeleft?: () => void;
		rightColor?: string;
		leftColor?: string;
		rightIcon?: Snippet;
		leftIcon?: Snippet;
		disabled?: boolean;
		children: Snippet;
	} = $props();

	let offsetX = $state(0);
	let swiping = $state(false);
	let transitioning = $state(false);

	const THRESHOLD = 80;
	const MAX_OFFSET = 150;
	const DAMPEN = 0.6;

	let startX = 0;
	let startY = 0;
	let locked: 'horizontal' | 'vertical' | null = null;

	function handleTouchStart(e: TouchEvent) {
		if (disabled) return;
		const touch = e.touches[0];
		startX = touch.clientX;
		startY = touch.clientY;
		locked = null;
		transitioning = false;
		swiping = false;
	}

	function handleTouchMove(e: TouchEvent) {
		if (disabled) return;
		const touch = e.touches[0];
		const dx = touch.clientX - startX;
		const dy = touch.clientY - startY;

		if (!locked) {
			if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
				locked = Math.abs(dx) > Math.abs(dy) ? 'horizontal' : 'vertical';
			}
			return;
		}

		if (locked === 'vertical') return;

		e.preventDefault();
		swiping = true;
		const dampened = dx * DAMPEN;
		offsetX = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, dampened));
	}

	function handleTouchEnd() {
		if (disabled || !swiping) {
			locked = null;
			return;
		}

		transitioning = true;
		swiping = false;
		locked = null;

		if (offsetX > THRESHOLD && onswiperight) {
			onswiperight();
		} else if (offsetX < -THRESHOLD && onswipeleft) {
			onswipeleft();
		}

		offsetX = 0;
	}

	let rightIconOpacity = $derived(
		offsetX > 0 ? Math.min(1, offsetX / THRESHOLD) : 0
	);
	let leftIconOpacity = $derived(
		offsetX < 0 ? Math.min(1, Math.abs(offsetX) / THRESHOLD) : 0
	);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="relative overflow-hidden sm:overflow-visible"
	style="touch-action: pan-y;"
	ontouchstart={handleTouchStart}
	ontouchmove={handleTouchMove}
	ontouchend={handleTouchEnd}
>
	<!-- Right swipe background (revealed when swiping right) -->
	{#if rightIcon && offsetX > 0}
		<div class="absolute inset-0 {rightColor} flex items-center pl-6 sm:hidden">
			<div style="opacity: {rightIconOpacity};">
				{@render rightIcon()}
			</div>
		</div>
	{/if}

	<!-- Left swipe background (revealed when swiping left) -->
	{#if leftIcon && offsetX < 0}
		<div class="absolute inset-0 {leftColor} flex items-center justify-end pr-6 sm:hidden">
			<div style="opacity: {leftIconOpacity};">
				{@render leftIcon()}
			</div>
		</div>
	{/if}

	<!-- Row content -->
	<div
		class="relative bg-white dark:bg-gray-900"
		style="transform: translateX({offsetX}px); {transitioning ? 'transition: transform 300ms ease;' : ''}"
		ontransitionend={() => (transitioning = false)}
	>
		{@render children()}
	</div>
</div>
