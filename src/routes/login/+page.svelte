<script>
	import { userState } from '$lib/state.svelte';
	import { login } from '$lib/supabaseClient';
</script>

<button on:click={login}> Login </button>
