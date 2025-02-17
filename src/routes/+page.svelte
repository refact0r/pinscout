<script>
	import { userState } from '$lib/state.svelte';
	import { logout } from '$lib/supabaseClient';
</script>

<svelte:head>
	<title>pinscout</title>
</svelte:head>
<button on:click={logout}>Sign Out</button>
<h1>{userState.user?.email}</h1>
