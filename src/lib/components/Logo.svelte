<script>
	import PinSmall from '$lib/assets/pin-small.svg?raw';
</script>

<div class="logo">
	<span>pinsc</span>
	<span class="pin">{@html PinSmall}</span>
	<span>ut</span>
</div>

<style>
	.logo {
		display: flex;
		align-items: center;
		gap: 0.1rem;
	}
	:global(.logo .pin svg) {
		height: 100%;
		width: 100%;
	}
	.pin {
		font-size: 0;
		height: 1.5rem;
		color: var(--red);
	}
</style>
