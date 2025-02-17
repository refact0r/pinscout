<script>
	import { fade } from 'svelte/transition';
	import X from 'phosphor-svelte/lib/X';

	let { title, children } = $props();

	let isOpen = $state(false);

	export function open() {
		isOpen = true;
	}

	export function close() {
		isOpen = false;
	}
</script>

{#if isOpen}
	<div class="modal-overlay" transition:fade={{ duration: 200 }}>
		<div class="modal box">
			<div class="modal-header">
				<h2>{title}</h2>
				<button class="close-button" onclick={close}><X /></button>
			</div>
			<div class="modal-body">
				{@render children()}
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 100;
	}

	.modal {
		min-width: var(--min-width, 30rem);
		width: var(--width, 60%);
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
	}

	.modal-header h2 {
		margin: 0;
		font-size: 1.5rem;
	}

	.close-button {
		background: none;
		border: none;
		font-size: 1.5rem;
		padding: 0;
	}

	.modal-body {
		padding: 1rem;
	}
</style>
