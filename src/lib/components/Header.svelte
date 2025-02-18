<script>
	import { page } from '$app/state';
	import { userState } from '$lib/state.svelte';
	import logo from '$lib/assets/pinscout-logo.svg';
	import Logo from './Logo.svelte';

	import MapTrifold from 'phosphor-svelte/lib/MapTrifold';
	import House from 'phosphor-svelte/lib/House';
	import Ranking from 'phosphor-svelte/lib/Ranking';
	import Gear from 'phosphor-svelte/lib/Gear';
	import Info from 'phosphor-svelte/lib/Info';
</script>

<div class="header box">
	<a href="/" title="pinscout"><Logo /></a>
	<div class="right">
		<a
			class="link"
			href="/"
			title="Map"
			class:active={page.url.pathname === '/' || page.url.pathname.startsWith('/pin')}
		>
			<MapTrifold />
		</a>
		{#if userState.user}
			<a
				class="link"
				href="/dashboard"
				title="Dashboard"
				class:active={page.url.pathname === '/dashboard'}
			>
				<House />
			</a>
		{/if}
		<a
			class="link"
			href="/leaderboard"
			title="Leaderboard"
			class:active={page.url.pathname === '/leaderboard'}
		>
			<Ranking />
		</a>
		<!--
		{#if userState.user}
			<a
				class="link"
				href="/settings"
				title="Settings"
				class:active={page.url.pathname === '/settings'}
			>
				<Gear />
			</a>
		{/if}-->
		<a class="link" href="/about" title="About" class:active={page.url.pathname === '/about'}>
			<Info />
		</a>
	</div>
</div>

<style>
	.header {
		padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 1.5rem;
	}
	.right {
		display: flex;
		gap: 1rem;
	}
	a {
		text-decoration: none;
		display: flex;
		transition: 0.2s;
		border-radius: 0.75rem;
		padding: 0.25rem 0.5rem;
		border: 2px solid transparent;
	}
	a.link {
		padding: 0;
		width: 2.5rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	a:hover {
		/* color: var(--red); */
		background: var(--bg-3);
		border: 2px solid var(--bg-3);
	}
	a.active {
		background: var(--bg-2);
		border: 2px solid var(--bg-3);
	}
</style>
