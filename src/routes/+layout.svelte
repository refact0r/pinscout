<script>
	import { onMount } from 'svelte';
	import { page, navigating } from '$app/stores';
	import '../app.css';
	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { getUser } from '$lib/supabaseClient';
	import { userState } from '$lib/state.svelte';

	import Header from '../lib/components/Header.svelte';
	import { goto } from '$app/navigation';

	mapboxgl.accessToken =
		'pk.eyJ1IjoicmVmYWN0MHIiLCJhIjoiY203ODZndDB3MHI4bTJrcHVpcDl0a2NjYiJ9.oFH9TjRqRRobGDri9dbmfA';

	const pins = [
		[-122.205, 47.613],
		[-122.21, 47.61],
		[-122.215, 47.615],
		[-122.22, 47.62]
	];

	let mapPins = [];

	let logged_in;
	let map_height;
	let container_height;

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

		if (userState.user) {
			logged_in = true;
		} else {
			logged_in = false;
		}

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

		if ($page.url.pathname === "/") {
			if (logged_in) {
				map_height = 100;
				container_height = 0;
			} else {
				map_height = 80;
				container_height = 20;
			}	
		} else if ($page.url.pathname === "/dashboard") {
			if (!logged_in) {
				goto('/login');
			} else {
				map_height = 20;
				container_height = 80;
			}
		} else if ($page.url.pathname === "/login" || $page.url.pathname === "/signup" || $page.url.pathname === "/settings" || $page.url.pathname === "/about") {
			map_height = 20;
			container_height = 80;
		} else {
			map_height = 50;
			container_height = 50;
		}
	});



	function setComponentHeight(pathname){
		if (pathname === "/") {
			if (logged_in) {
				map_height = 100;
				container_height = 0;
			} else {
				map_height = 80;
				container_height = 20;
			}	
		} else if (pathname === "/dashboard") {
			if (!logged_in) {
				goto('/login');
			} else {
				map_height = 20;
				container_height = 80;
			}
		} else if (pathname === "/login" || pathname === "/signup" || pathname === "/settings" || pathname === "/about") {
			map_height = 20;
			container_height = 80;
		} else {
			map_height = 50;
			container_height = 50;
		}
	}

	$: if($navigating) setComponentHeight($navigating.to.url.pathname);
</script>

<div id="map" class="map" style="height: {map_height}vh;"></div>
<div class="container" style="height: {container_height}vh;">
	<slot></slot>
</div>
<div class="position">
	<Header {logged_in} />
</div>

<style>
	.position {
		position: absolute;
		top: 0;
		z-index: 9;
	}
	.map {
		width: 100%;
	}
	.container {
		height: 20vh;
		width: 100%;
		padding: 1rem;
		overflow: auto;
	}
</style>
