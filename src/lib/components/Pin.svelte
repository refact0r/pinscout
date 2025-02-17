<script>
	import pinOutlined from '$lib/assets/pin-outlined.svg?raw';
	import { Toilet } from 'phosphor-svelte';
	import { Car } from 'phosphor-svelte';

	let { type, subtype } = $props();

	const colorMap = {
		safety: 'red',
		utility: 'green',
		tech: 'blue',
		transportation: 'orange',
		explore: 'purple'
	};
	const iconMap = {
		restroom: Toilet,
		parking: Car
	};
	let Icon = iconMap[subtype];
</script>

<div class="marker" style="--color: {colorMap[type]}">
	{@html pinOutlined}
	<div class="icon">
		{#if iconMap[subtype]}
			<Icon size={18} />
		{/if}
	</div>
</div>

<style>
	.marker {
		width: 32px;
		display: grid;
		place-items: center;
		grid-template-columns: auto;
		grid-template-rows: auto;
		color: var(--color);
	}
	:global(.marker svg) {
		grid-row: 1;
		grid-column: 1;
	}
	.icon {
		grid-row: 1;
		grid-column: 1;
	}
</style>
