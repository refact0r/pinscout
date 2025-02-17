<script>
	import logo from '$lib/assets/pinscout-logo.svg';
	import Logo from './Logo.svelte';
	import PinSmall from './PinSmall.svelte';

	import {House, MapTrifold, Ranking, Gear, Info} from 'phosphor-svelte';

	//export let logged_in;
</script>

<div class="position">
	<div class="header">
		<a href="/" title="pinscout"><Logo /></a>
		<div class="right">
			<a class="link" href="/" title="Home"><House /></a>
			<a class="link" href="/" title="Map"><MapTrifold /></a>
			<a class="link" href="/leaderboard" title="Leaderboard"><Ranking /></a>
			<a class="link" href="/settings" title="Settings"><Gear /></a>
			<a class="link" href="/about" title="About"><Info/></a>
		</div>
	</div>
</div>

<style>
	.position {
		width: 28rem;
	}
	.header {
		margin: 1rem;
		border-radius: 1rem;
		padding: .5rem .75rem;
		background-color: rgba(255, 255, 255, 0.75);
		display: flex;
		align-items: center;
		justify-content: space-between;
		backdrop-filter: blur(4px);
		font-size: 1.5rem;
		transition: .2s;
	}
	.header:hover {
		background-color: white;
	}
	.right {
		display: flex;
		gap: 1rem;
	}
	a {
		color: black;
		text-decoration: none;
		display: flex;
		transition: .2s;
	}
	a:hover {
		color: rgb(234, 72, 78);
	}
	.link {
		display: flex;
	}
</style>
