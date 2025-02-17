<script>
	import PinOutlined from '$lib/assets/pin-outlined.svg?raw';
	import { colorMap } from '$lib/utils';
	import Toilet from 'phosphor-svelte/lib/Toilet';
	import Car from 'phosphor-svelte/lib/Car';

	let { type, subtype, pin_id } = $props();

	const iconMap = {
		restroom: Toilet,
		parking: Car
	};
	let Icon = iconMap[subtype];
</script>

<a class="marker" style="color: {colorMap[type]}" href={`/pin/${pin_id}`}>
	{@html PinOutlined}
	<div class="icon">
		{#if iconMap[subtype]}
			<Icon size={18} />
		{/if}
	</div>
</a>

<style>
	.marker {
		width: 32px;
		display: grid;
		place-items: center;
		grid-template-columns: auto;
		grid-template-rows: auto;
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
