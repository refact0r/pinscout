<script>
	import { selectedPin } from '$lib/state.svelte.js';
	import { colorMap } from '$lib/utils';
	import { X } from 'phosphor-svelte';

	let { data } = $props();

	let pin = $state(data.pins.find((pin) => String(pin.id) === data.id));
	$effect(() => {
		pin = data.pins.find((pin) => String(pin.id) === data.id);
		selectedPin.pin = data.id;
	});
</script>

<div class="page">
	<div class="top">
		<div class="tags">
			<span class="tag" style="--color: {colorMap[pin.type]}">{pin.type}</span>
			{#if pin.name.length > 0}
				<span class="tag" style="--color: {colorMap[pin.type]}">{pin.subtype}</span>
			{/if}
		</div>
		<a href="/" onclick={() => (selectedPin.pin = null)}><X size="1.5rem" /></a>
	</div>
	<h1>
		{#if pin.name.length > 0}
			{pin.name}
		{:else}
			{pin.subtype}
		{/if}
	</h1>
</div>

<style>
	.page {
		width: 100%;
		height: 100%;
		padding: 1rem;
	}

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tags {
		display: flex;
		gap: 0.5rem;
	}

	.tag {
		display: inline-block;
		padding: 0.25rem 0.5rem;
		border-radius: 0.5rem;
		color: color-mix(in srgb, var(--color), black 40%);
		background-color: color-mix(in hsl, var(--color), transparent 70%);
		border: 2px solid color-mix(in hsl, var(--color), transparent 70%);
	}

	h1 {
		margin: 1rem 0;
	}
</style>
