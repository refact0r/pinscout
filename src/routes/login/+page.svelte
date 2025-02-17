<script>
	import { userState } from '$lib/state.svelte';
	import { login } from '$lib/supabaseClient';
</script>

<div class="box">
	<h1>Login</h1>
	<button on:click={login}> Login with Google </button>
	<br><br>
	<p>Login to pinscout to mark new locations, place reviews, and earn points among other things.</p>
</div>

<style>
	.box{
		width: 30vw;
		height: 70vh;
		max-width: 40vw;
		margin-top: 2vh;
		margin-left: auto;
		margin-right: auto;
		background-color: rgb(123, 195, 222);
		border-radius: 1vw;
        padding: 2vh 2vw;
	}

	button {
		width: 100%;
		height: 6vh;
	}
</style>
