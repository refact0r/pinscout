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

<div class="layout">
	<div id="map" class="map"></div>
	<div class="header-container">
		<Header />
	</div>
	<div class="page box">
		{@render children()}
	</div>
	<div class="profile-container">
		<Profile {logged_in} />
	</div>
</div>

<style>
	.layout {
		position: relative;
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: minmax(35rem, 30%) 1fr auto auto;
		grid-template-rows: auto 1fr;
		gap: 1rem;
		padding: 1rem;
	}
	.map {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
	}
	.header-container {
		grid-area: 1 / 1 / 2 / 2;
		z-index: 1;
	}
	.profile-container {
		grid-area: 1 / 3 / 2 / 5;
		z-index: 1;
	}
	.page {
		grid-area: 2 / 1 / 3 / 2;
		z-index: 2;

		&.full {
			grid-area: 2 / 1 / 3 / 5;
		}

		&.hidden {
			transform: translateX(100%);
		}
	}
</style>
