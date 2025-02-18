<script>
	import PinOutlined from '$lib/assets/pin-outlined.svg?raw';
	import { colorMap } from '$lib/utils';
	import { selectedPin } from '$lib/state.svelte';
	import Plus from 'phosphor-svelte/lib/Plus';
	import FirstAidKit from 'phosphor-svelte/lib/FirstAidKit';
	import Phone from 'phosphor-svelte/lib/Phone';
	import Drop from 'phosphor-svelte/lib/Drop';
	import Trash from 'phosphor-svelte/lib/Trash';
	import Toilet from 'phosphor-svelte/lib/Toilet';
	import HouseSimple from 'phosphor-svelte/lib/HouseSimple';
	import Chair from 'phosphor-svelte/lib/Chair';
	import PawPrint from 'phosphor-svelte/lib/PawPrint';
	import PlugCharging from 'phosphor-svelte/lib/PlugCharging';
	import WifiHigh from 'phosphor-svelte/lib/WifiHigh';
	import Car from 'phosphor-svelte/lib/Car';
	import Bus from 'phosphor-svelte/lib/Bus';
	import Bicycle from 'phosphor-svelte/lib/Bicycle';
	import PersonSimpleBike from 'phosphor-svelte/lib/PersonSimpleBike';
	import PaintBrush from 'phosphor-svelte/lib/PaintBrush';
	import Buildings from 'phosphor-svelte/lib/Buildings';
	import Lighthouse from 'phosphor-svelte/lib/Lighthouse';
	import Panorama from 'phosphor-svelte/lib/Panorama';
	import Baby from 'phosphor-svelte/lib/Baby';

	let { type, subtype, pin_id } = $props();

	const iconMap = {
		AED: FirstAidKit,
		'emergency phone': Phone,
		'water fountain': Drop,
		'waste disposal': Trash,
		restroom: Toilet,
		shelter: HouseSimple,
		seating: Chair,
		'dog waste bags': PawPrint,
		'charging station': PlugCharging,
		'wi-fi hotspot': WifiHigh,
		parking: Car,
		'bus stop': Bus,
		'bikeshare station': Bicycle,
		'bike rack': PersonSimpleBike,
		art: PaintBrush,
		architecture: Buildings,
		'landmark/historical': Lighthouse,
		'scenic viewpoint': Panorama,
		playground: Baby
	};
	let Icon = iconMap[subtype];
</script>

<a
	class="marker"
	class:active={String(selectedPin.pin) === String(pin_id)}
	style="color: {colorMap[type]}"
	href={pin_id ? `/pin/${pin_id}` : ''}
>
	{@html PinOutlined}
	<div class="icon">
		{#if iconMap[subtype]}
			<Icon size={18} />
		{:else}
			<Plus size={18} />
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
		color: #333;
		transition: 0.2s;
	}
	.marker.active {
		transform: scale(1.5);
		transform-origin: bottom;
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
