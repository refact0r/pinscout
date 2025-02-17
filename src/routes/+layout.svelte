<script>
	import { onMount } from 'svelte';
	import '../app.css';
	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { getUser } from '$lib/supabaseClient';
	import { userState } from '$lib/state.svelte';

	import Header from '../lib/components/Header.svelte';

	mapboxgl.accessToken =
		'pk.eyJ1IjoicmVmYWN0MHIiLCJhIjoiY203ODZndDB3MHI4bTJrcHVpcDl0a2NjYiJ9.oFH9TjRqRRobGDri9dbmfA';

	const pins = [
		[-122.205, 47.613],
		[-122.21, 47.61],
		[-122.215, 47.615],
		[-122.22, 47.62]
	];

	let mapPins = [];

	function updateVisiblePins(map) {
		const bounds = map.getBounds();

		// remove all existing pins
		mapPins.forEach((marker) => marker.remove());
		mapPins = [];

		// add only pins that are within the current bounds
		pins.forEach((markerCoords) => {
			if (bounds.contains(markerCoords)) {
				const marker = new mapboxgl.Marker().setLngLat(markerCoords).addTo(map);
				mapPins.push(marker);
			}
		});
	}

	onMount(async () => {
		// check and get auth user
		userState.user = await getUser();

		// default position in case geolocation fails
		let userLocation = [-122.205, 47.613];

		// get user location if possible
		// try {
		// 	const position = await new Promise((resolve, reject) => {
		// 		if (!navigator.geolocation) {
		// 			reject(new Error('Geolocation not supported'));
		// 		}
		// 		navigator.geolocation.getCurrentPosition(
		// 			(position) => resolve(position),
		// 			(error) => reject(error),
		// 			{
		// 				enableHighAccuracy: true
		// 			}
		// 		);
		// 	});
		// 	userLocation = [position.coords.longitude, position.coords.latitude];
		// 	console.log('Got position:', position);
		// } catch (error) {
		// 	console.warn('Failed to get location:', error);
		// }

		// initialize map
		const map = new mapboxgl.Map({
			container: 'map', // container ID
			style: 'mapbox://styles/mapbox/satellite-streets-v12', // style URL
			center: userLocation, // starting position [lng, lat]
			zoom: 16 // starting zoom
		});

		// add geolocate control
		const geolocate = new mapboxgl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true
			},
			trackUserLocation: true,
			showUserHeading: true
		});
		map.addControl(geolocate, 'bottom-right');
		// add navigation control
		const nav = new mapboxgl.NavigationControl({
			visualizePitch: true
		});
		map.addControl(nav, 'bottom-right');

		// turn on geolocation when map is loaded
		map.on('load', () => {
			geolocate.trigger();
			updateVisiblePins(map);
		});

		// update visible pins when map moves
		map.on('moveend', () => {
			updateVisiblePins(map);
		});
	});
</script>

<div id="map" class="map"></div>
<div class="container">
	<slot></slot>
</div>
<div class="position">
	<Header />
</div>

<style>
	.position {
		position: absolute;
		top: 0;
		z-index: 9;
	}
	.map {
		width: 100%;
		height: 80vh;
	}
	.container {
		height: 20vh;
		width: 100%;
		padding: 1rem;
	}
</style>
