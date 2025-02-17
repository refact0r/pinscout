<script>
	import logo from '$lib/assets/pinscout-logo.svg';
	import Logo from './Logo.svelte';
	import PinSmall from './PinSmall.svelte';

	let x = true;
</script>

<div class="position">
	<div class="header">
		<a href="/"><Logo /></a>
		<div class="right">
			{#if x}
				<a class="link" href="/dashboard">dashboard</a>
			{:else}
				<a class="link" href="/login">login</a>
			{/if}
			<a class="link" href="/settings">settings</a>
			<a class="link" href="/about">about</a>
		</div>
	</div>
</div>

<style>
	.position {
		width: 100vw;
	}
	.header {
		margin: 1rem;
		border-radius: 1rem;
		padding: 1rem;
		background-color: rgba(255, 255, 255, 0.75);
		display: flex;
		align-items: center;
		justify-content: space-between;
		backdrop-filter: blur(4px);
		font-size: 2.5rem;
	}
	.right {
		display: flex;
		gap: 2rem;
	}
	a {
		color: black;
		text-decoration: none;
		display: flex;
	}
</style>
