<script>
	import { userState } from '$lib/state.svelte';
	import { login } from '$lib/supabaseClient';

	import GoogleLogo from 'phosphor-svelte/lib/GoogleLogo';
</script>

<svelte:head>
	<title>login</title>
</svelte:head>

<div class="box">
	<h1>Login</h1>
	<button on:click={login} title="Login with Google">
		<a>Login with Google</a>
	</button>
	<br /><br />
	<p>Login to pinscout to mark new locations, place reviews, earn pinpoints, and more!</p>
</div>

<style>
	.box {
		width: 20rem;
		margin-left: auto;
		margin-right: auto;
		text-align: center;
	}

	button {
		width: 100%;
		height: 7vh;
		font-family: 'Urbanist', serif;
		text-align: center;
		align-content: center;
		align-items: center;
		font-size: 1rem;
		border: none;
		border-radius: 1rem;
		color: black;
		background-color: white;
		transition: 0.2s;
	}
	button:hover {
		color: white;
		background-color: rgb(234, 72, 78);
		cursor: pointer;
	}

	h1 {
		margin: 2rem 0rem;
		font-size: 4rem;
	}
</style>
