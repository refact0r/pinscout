<script>
	import { mount, onMount } from 'svelte';
	import { page } from '$app/stores';
	import '../app.css';
	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { getUser } from '$lib/supabaseClient';
	import { userState } from '$lib/state.svelte';

	import Header from '../lib/components/Header.svelte';
	import Profile from '$lib/components/Profile.svelte';
	import { goto } from '$app/navigation';
	import Pin from '$lib/components/Pin.svelte';

	let { children, data } = $props();

	mapboxgl.accessToken =
		'pk.eyJ1IjoicmVmYWN0MHIiLCJhIjoiY203ODZndDB3MHI4bTJrcHVpcDl0a2NjYiJ9.oFH9TjRqRRobGDri9dbmfA';

	console.log(data);

	let mapPins = [];

	let logged_in = $state(false);
	let container_height = $state(20);

	function updateVisiblePins(map) {
		const bounds = map.getBounds();

		// remove all existing pins
		mapPins.forEach((marker) => marker.remove());
		mapPins = [];

		// add only pins that are within the current bounds
		data.pins.forEach((pin) => {
			if (bounds.contains([pin.longitude, pin.latitude])) {
				const ref = document.createElement('div');
				mount(Pin, { target: ref, props: { type: pin.type, subtype: pin.subtype } });
				const marker = new mapboxgl.Marker({ element: ref, anchor: 'bottom' })
					.setLngLat([pin.longitude, pin.latitude])
					.addTo(map);
				mapPins.push(marker);
			}
		});
	}

	onMount(async () => {
		// check and get auth user
		userState.user = await getUser();

		if (userState.user) {
			logged_in = true;
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
		map.addControl(geolocate, 'right');
		// add navigation control
		const nav = new mapboxgl.NavigationControl({
			visualizePitch: true
		});
		map.addControl(nav, 'right');

		// turn on geolocation when map is loaded
		map.on('load', () => {
			geolocate.trigger();
			updateVisiblePins(map);
		});

		// update visible pins when map moves
		map.on('moveend', () => {
			updateVisiblePins(map);
		});

		map.on('click', () => {});
	});

	function setComponentHeight(pathname) {
		if (pathname === '/') {
			if (logged_in) {
				container_height = 8;
			} else {
				container_height = 16;
			}
		} else if (pathname === '/dashboard') {
			if (!logged_in) {
				goto('/login');
			} else {
				container_height = 89;
			}
		} else if (
			pathname === '/login' ||
			pathname === '/signup' ||
			pathname === '/leaderboard' ||
			pathname === '/settings' ||
			pathname === '/about'
		) {
			container_height = 89;
		} else {
			container_height = 50;
		}
	}

	$effect(() => {
		setComponentHeight($page.url.pathname);
	});
</script>

<div id="map" class="map"></div>
<div class="container" style="height: {container_height}vh;">
	{@render children()}
</div>
<div class="position">
	<Header />
</div>
<div class="profile">
	<Profile {logged_in} />
</div>

<style>
	.position {
		position: absolute;
		top: 0;
		z-index: 9;
	}
	.profile {
		position: absolute;
		top: 0;
		left: auto;
		right: 0;
		z-index: 10;
	}
	.map {
		width: 100%;
		height: 100%;
	}
	.container {
		height: 16vh;
		width: 98vw;
		margin: 0 1vw;
		padding: 1rem 1rem;
		overflow: hidden;
		transition: height 0.5s ease;
		position: absolute;
		bottom: 0;
		z-index: 3;
		background-color: rgba(255, 255, 255, 0.8);
		backdrop-filter: blur(4px);
		border-radius: 1rem 1rem 0 0;
	}
</style>
