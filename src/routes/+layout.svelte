<script>
	import { onMount } from 'svelte';
	import '../app.css';
	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';

	mapboxgl.accessToken =
		'pk.eyJ1IjoicmVmYWN0MHIiLCJhIjoiY203ODZndDB3MHI4bTJrcHVpcDl0a2NjYiJ9.oFH9TjRqRRobGDri9dbmfA';

	onMount(() => {
		const map = new mapboxgl.Map({
			container: 'map', // container ID
			style: 'mapbox://styles/mapbox/satellite-streets-v12', // style URL
			center: [-122.205, 47.613], // starting position [lng, lat]
			zoom: 16 // starting zoom
		});
	});
</script>

<div id="map" class="map"></div>
<slot></slot>

<style>
	.map {
		width: 100%;
		height: 100%;
	}
</style>
