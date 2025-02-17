<script>
	import { goto } from '$app/navigation';
	import { userState } from '$lib/state.svelte';
	import { login, logout } from '$lib/supabaseClient';
	import { SignOut, UserCircle } from 'phosphor-svelte';
	export let logged_in;
</script>

<div class="profile box">
	{#if logged_in}
		<a href="/dashboard">
			<div>{userState.user?.points} PP</div>
			<div class="avatar">
				<img src={userState.user?.avatar_url} alt="" />
				<UserCircle size="2rem" />
			</div>
		</a>
		<button class="logout icon" title="Sign Out" onclick={logout}><SignOut size="1.5rem" /></button>
	{:else}
		<button onclick={login}>
			<div>Login</div>
			<div class="avatar">
				<UserCircle size="2rem" />
			</div>
		</button>
	{/if}
</div>

<style>
	.profile {
		width: fit-content;
		padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 1.5rem;
		gap: 0.25rem;
	}
	a {
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		gap: 0.75rem;
		display: flex;
		transition: 0.2s;
		border-radius: 0.75rem;
		border: 2px solid transparent;
		height: 2.5rem;
		padding: 0 0.25rem;
	}
	a:hover {
		/* color: var(--red); */
		background: var(--bg-3);
		border: 2px solid var(--bg-3);
	}
	.avatar {
		width: 2rem;
		height: 2rem;
		position: relative;
	}

	.avatar * {
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		position: absolute;
		top: 0;
		left: 0;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 2px solid transparent;
		border-radius: 0.75rem;
		gap: 0.5rem;
	}
	button.icon {
		width: 2.5rem;
		height: 2.5rem;
	}
	button:hover {
		/* color: var(--red); */
		background: var(--bg-3);
		border: 2px solid var(--bg-3);
	}
</style>
