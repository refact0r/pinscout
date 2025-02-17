<script>
	import { goto } from '$app/navigation';
	import { userState } from '$lib/state.svelte';
	import { UserCircle } from 'phosphor-svelte';
	export let logged_in;
</script>

{#if userState.user}
	<div class="position">
		<a class="header" href="/dashboard">
			<div>{userState.user?.points} PP</div>
			<div><UserCircle /></div>
		</a>
	</div>
{/if}

<style>
	.position {
		width: fit-content;
	}
	.header {
		margin: 1rem;
		border-radius: 1rem;
		padding: 0.5rem 0.75rem;
		background-color: rgba(255, 255, 255, 0.75);
		display: flex;
		align-items: center;
		justify-content: space-between;
		backdrop-filter: blur(4px);
		font-size: 1.5rem;
		color: black;
		text-decoration: none;
		transition: 0.2s;
	}
	.header:hover {
		color: rgb(234, 72, 78);
		background-color: rgba(255, 255, 255, 1);
		cursor: pointer;
	}
	a {
		display: flex;
	}
</style>
