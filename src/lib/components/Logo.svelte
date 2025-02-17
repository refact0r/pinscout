<script>
	import PinSmall from './PinSmall.svelte';
</script>

<div class="logo">
	<span>pinsc</span>
	<span class="pin"><PinSmall /></span>
	<span>ut</span>
</div>

<style>
	.logo {
		display: flex;
		align-items: center;
		gap: 0.1rem;
	}
	.pin {
		font-size: 0;
		height: 2rem;
		color: red;
	}
</style>
