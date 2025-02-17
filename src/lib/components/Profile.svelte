<script>
	import { goto } from '$app/navigation';
	import { userState } from '$lib/state.svelte';
	import { login, logout } from '$lib/supabaseClient';
	import { SignOut, UserCircle } from 'phosphor-svelte';
	export let logged_in;
</script>

<div class="profile box">
	{#if logged_in}
		<a class="link" href="/dashboard">
			<div>{userState.user?.points} PP</div>
			<div class="avatar">
				<img src={userState.user?.avatar_url} alt="" />
				<UserCircle size="1.5rem" />
			</div>
		</a>
		<button class="logout" title="Sign Out" onclick={logout}><SignOut size="1.5rem" /></button>
	{:else}
		<button class="link" onclick={login}>
			<div>Login</div>
			<div class="avatar">
				<UserCircle size="1.5rem" />
			</div>
		</button>
	{/if}
</div>

<style>
	.profile {
		width: fit-content;
		display: flex;
		align-items: center;
		overflow: hidden;
	}
	.link {
		padding: 0.75rem 1rem;
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: space-between;
		font-size: 1.5rem;
		text-decoration: none;
		transition: 0.2s;
	}
	.link:hover {
		color: rgb(234, 72, 78);
		cursor: pointer;
		background-color: var(--bg-2);
	}
	a {
		display: flex;
	}
	.avatar {
		width: 1.5rem;
		height: 1.5rem;
		position: relative;
	}

	.avatar * {
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 9999px;
		position: absolute;
		top: 0;
		left: 0;
	}

	.logout {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		padding: 0.75rem;
		height: calc(1lh + 1.5rem);
		position: relative;
	}

	.logout::before {
		content: '';
		width: 1px;
		height: 1.5rem;
		background-color: #999999;
		position: absolute;
		left: 0;
		transform: translateX(-50%);
	}

	button:hover {
		background-color: var(--bg-2);
	}
</style>
