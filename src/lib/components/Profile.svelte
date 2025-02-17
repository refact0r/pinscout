<script>
	import { goto } from '$app/navigation';
	import { userState } from '$lib/state.svelte';
	import { UserCircle } from 'phosphor-svelte';
	export let logged_in;
</script>

<div class="position">
	<a class="header" href="/dashboard">
		<div>{userState.user ? userState.user.points : 0} PP</div>
		<div class="avatar">
			{#if userState.user}
				<img src={userState.user.avatar_url} />
			{/if}
			<UserCircle size="2rem" />
		</div>
	</a>
</div>

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
		gap: 1rem;
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
	.avatar {
		width: 2rem;
		height: 2rem;
		position: relative;
	}

	.avatar * {
		width: 2rem;
		height: 2rem;
		border-radius: 9999px;
		position: absolute;
		top: 0;
		left: 0;
	}
</style>
