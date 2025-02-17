<script>
	import X from 'phosphor-svelte/lib/X';
</script>

<svelte:head>
	<title>settings</title>
</svelte:head>

<div class="page">
	<div class="top">
		<a href="/"><X size="1.5rem" /></a>
	</div>
	<h1>Settings</h1>
</div>

<style>
	.page {
		position: relative;
		padding: 2rem;
	}
	.top {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}
	h1 {
		margin: 1rem 0;
		font-size: 3rem;
	}
</style>
