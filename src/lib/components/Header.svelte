<script>
	import logo from '$lib/assets/pinscout-logo.svg';
	import Logo from './Logo.svelte';

	import { House, MapTrifold, Ranking, Gear, Info } from 'phosphor-svelte';

	//export let logged_in;
</script>

<div class="header box">
	<a href="/" title="pinscout"><Logo /></a>
	<div class="right">
		<a class="link" href="/" title="Map"><MapTrifold /></a>
		<a class="link" href="/leaderboard" title="Leaderboard"><Ranking /></a>
		<a class="link" href="/settings" title="Settings"><Gear /></a>
		<a class="link" href="/about" title="About"><Info /></a>
	</div>
</div>

<style>
	.header {
		padding: 0.75rem 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 1.5rem;
	}
	.right {
		display: flex;
		gap: 1.5rem;
	}
	a {
		color: black;
		text-decoration: none;
		display: flex;
		transition: 0.2s;
	}
	a:hover {
		color: rgb(234, 72, 78);
	}
	.link {
		display: flex;
	}
</style>
