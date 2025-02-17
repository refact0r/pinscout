<script>
	import { goto } from '$app/navigation';
	import { userState } from '$lib/state.svelte';
	import { UserCircle } from 'phosphor-svelte';
	export let logged_in;
</script>

<div class="profile box">
	<a class="link" href="/dashboard">
		<div>{logged_in ? userState.user?.points : 0} PP</div>
		<div class="avatar">
			{#if logged_in}
				<img src={userState.user?.avatar_url} alt="" />
			{/if}
			<UserCircle />
		</div>
	</a>
</div>

<style>
	.profile {
		width: fit-content;
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
</style>
