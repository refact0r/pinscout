<script>
	import { onMount } from 'svelte';
	import '../app.css';
	import mapboxgl from 'mapbox-gl';
	import 'mapbox-gl/dist/mapbox-gl.css';

	mapboxgl.accessToken =
		'pk.eyJ1IjoicmVmYWN0MHIiLCJhIjoiY203ODZndDB3MHI4bTJrcHVpcDl0a2NjYiJ9.oFH9TjRqRRobGDri9dbmfA';

	onMount(async () => {
		// default position in case geolocation fails
		let userLocation = [-122.205, 47.613];

		// get user location if possible
		try {
			const position = await new Promise((resolve, reject) => {
				if (!navigator.geolocation) {
					reject(new Error('Geolocation not supported'));
				}

				navigator.geolocation.getCurrentPosition(
					(position) => resolve(position),
					(error) => reject(error),
					{
						enableHighAccuracy: true
					}
				);
			});
			userLocation = [position.coords.longitude, position.coords.latitude];
			console.log('Got position:', position);
		} catch (error) {
			console.warn('Failed to get location:', error);
		}

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
		map.addControl(geolocate);

		// turn on geolocation when map is loaded
		map.on('load', () => {
			geolocate.trigger();
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
