<script>
	import { mount, onMount } from 'svelte';
	import { page } from '$app/state';
	import '../app.css';
	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';
	import { getUser } from '$lib/supabaseClient';
	import { userState, pinState } from '$lib/state.svelte';

	import Header from '../lib/components/Header.svelte';
	import Profile from '$lib/components/Profile.svelte';
	import { goto } from '$app/navigation';
	import Pin from '$lib/components/Pin.svelte';
	import pinSmall from '$lib/assets/pin-small.svg?raw';
	import { setContext } from 'svelte';
	import { supabase } from '$lib/supabaseClient';

	import X from 'phosphor-svelte/lib/X';

	let { children } = $props();

	mapboxgl.accessToken =
		'pk.eyJ1IjoicmVmYWN0MHIiLCJhIjoiY203ODZndDB3MHI4bTJrcHVpcDl0a2NjYiJ9.oFH9TjRqRRobGDri9dbmfA';

	let map;
	let mapPins = [];

	let placingMode = $state(false);
	let placementPin;
	let placementPosition = $state({});

	let logged_in = $state(false);

	let pageHidden = $state(true);
	let pageFull = $state(false);

	function updateVisiblePins(map) {
		const bounds = map.getBounds();

		// remove all existing pins
		mapPins.forEach((marker) => marker.remove());
		mapPins = [];

		// add only pins that are within the current bounds
		pinState.pins.forEach((pin) => {
			if (bounds.contains([pin.longitude, pin.latitude])) {
				const ref = document.createElement('div');
				mount(Pin, {
					target: ref,
					props: { type: pin.type, subtype: pin.subtype, pin_id: pin.id }
				});
				const marker = new mapboxgl.Marker({ element: ref, anchor: 'bottom' })
					.setLngLat([pin.longitude, pin.latitude])
					.addTo(map);
				mapPins.push(marker);
			}
		});
	}

	async function getPins() {
		const { data: newPins, error } = await supabase.from('pins').select('*');
		if (error) {
			console.error('Failed to fetch pins:', error.message);
		}
		pinState.pins = newPins || [];
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
		map = new mapboxgl.Map({
			container: 'map', // container ID
			style: 'mapbox://styles/mapbox/satellite-streets-v12', // style URL
			center: userLocation, // starting position [lng, lat]
			zoom: 16, // starting zoom
			attributionControl: false
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

		// add other controls
		map.addControl(
			new mapboxgl.NavigationControl({
				visualizePitch: true
			}),
			'right'
		);

		// turn on geolocation when map is loaded
		map.on('load', () => {
			geolocate.trigger();
			updateVisiblePins(map);
		});

		// update visible pins when map moves
		map.on('moveend', () => {
			updateVisiblePins(map);
		});

		map.on('click', (event) => {
			handleMapClick(event);
		});

		const ref = document.createElement('div');
		mount(Pin, {
			target: ref,
			props: { type: 'placement', subtype: 'placement', pin_id: null }
		});
		placementPin = new mapboxgl.Marker({
			color: '#333',
			element: ref,
			anchor: 'bottom'
		});

		await getPins();
	});

	function togglePlacingMode() {
		placingMode = !placingMode;
		if (placingMode) {
			map.getCanvas().style.cursor = 'crosshair';
		} else {
			map.getCanvas().style.cursor = '';
			placementPin.remove();
		}
	}

	function handleMapClick(e) {
		if (placingMode) {
			placementPosition = e.lngLat;
			placementPin.setLngLat(placementPosition).addTo(map);
		}
	}

	async function confirmPlacement(type, subtype, name) {
		if (placementPosition.lat && placingMode) {
			togglePlacingMode();

			console.log('Marker placed at:', placementPosition);
			const { data, error } = await supabase.from('pins').insert([
				{
					latitude: placementPosition.lat,
					longitude: placementPosition.lng,
					type: type,
					subtype: subtype,
					name: name
				}
			]);

			if (error) {
				console.error('Error creating pin:', error);
				return;
			}

			location.reload();
		}
	}

	function cancelPlacement() {
		placingMode = false;
		map.getCanvas().style.cursor = '';
		placementPin.remove();
	}

	function isPlaced() {
		return placingMode && placementPosition.lat;
	}

	function setComponentHeight(pathname) {
		console.log('setComponentHeight', pathname);
		if (pathname === '/') {
			pageHidden = true;
			pageFull = false;
		} else if (pathname === '/dashboard') {
			if (!logged_in) {
				goto('/login');
			} else {
				pageHidden = false;
				pageFull = true;
			}
		} else if (
			pathname === '/login' ||
			pathname === '/signup' ||
			pathname === '/leaderboard' ||
			pathname === '/settings' ||
			pathname === '/about'
		) {
			pageHidden = false;
			pageFull = true;
		} else {
			pageHidden = false;
			pageFull = false;
		}
	}

	$effect(() => {
		setComponentHeight(page.url.pathname);
		if (page.url.pathname === '/pin' && !placingMode) {
			togglePlacingMode();
		} else if (page.url.pathname !== '/pin' && placingMode) {
			togglePlacingMode();
		}
	});

	setContext('confirmPlacement', confirmPlacement);
	setContext('cancelPlacement', cancelPlacement);
	setContext('isPlaced', isPlaced);
</script>

<div class="layout">
	<div id="map" class="map"></div>
	<div class="header-container">
		<Header />
	</div>
	<div class="page-container box" class:hidden={pageHidden} class:full={pageFull}>
		{@render children()}
	</div>
	<div class="profile-container">
		<Profile {logged_in} />
	</div>
	<div class="button-container">
		<button
			class="box"
			title="Add Pin"
			onclick={(e) => {
				e.preventDefault();
				goto(page.url.pathname === '/pin' ? '/' : '/pin');
			}}
		>
			{#if placingMode}
				<X size="2rem" />
			{:else}
				{@html pinSmall}
			{/if}
		</button>
	</div>
</div>

<style>
	.layout {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: minmax(35rem, 30%) 1fr auto auto;
		grid-template-rows: auto 1fr auto;
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
	.page-container {
		grid-area: 2 / 1 / 4 / 5;
		width: 30%;
		min-width: 35rem;
		margin-left: 0;
		z-index: 2;
		transition:
			margin-left 0.3s,
			width 0.2s;

		&.full {
			width: 100%;
		}
		&.hidden {
			width: 30%;
			margin-left: -100%;
		}
	}
	.button-container {
		grid-area: 3 / 4 / 4 / 5;
		display: flex;
		flex-direction: column;
	}

	button {
		z-index: 1;
		width: 4rem;
		height: 4rem;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--red);

		:global(svg) {
			width: 2rem;
			height: 2rem;
		}
	}
</style>
