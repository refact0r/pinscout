<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';
	import { page } from '$app/state';
	import { getContext } from 'svelte';
	import { colorMap, subTypeMap } from '$lib/utils';
	import X from 'phosphor-svelte/lib/X';

	const confirmPlacement = getContext('confirmPlacement');
	const cancelPlacement = getContext('cancelPlacement');
	const isPlaced = getContext('isPlaced');

	let type = $state('utility');
	let subtype = $state('');
	let name = $state('');
	let error = $state('');

	async function submit(e) {
		e.preventDefault();
		const placed = isPlaced();
		if (!placed) {
			return;
		}
		goto('/');
		await confirmPlacement(type, subtype, name);
	}
</script>

<div class="page">
	<div class="top">
		<a href="/" onclick={cancelPlacement}><X size="1.5rem" /></a>
	</div>

	<h1>New Pin</h1>

	<form onsubmit={submit}>
		<label for="type">Type:</label>
		<select id="type" bind:value={type}>
			<option value="transportation">transportation</option>
			<option value="utility">utility</option>
			<option value="tech">tech</option>
			<option value="explore">explore</option>
			<option value="safety">safety</option>
		</select>

		<label for="subtype">Subtype:</label>
		<select id="subtype" bind:value={subtype}>
			{#each Object.values(subTypeMap[type]) as subType}
				<option value={subType}>{subType}</option>
			{/each}
		</select>

		<label for="name">Name (optional):</label>
		<input type="text" id="name" bind:value={name} />

		<div class="row">
			<button
				class="surface-button"
				type="button"
				onclick={() => {
					{
						cancelPlacement();
						goto('/');
					}
				}}>Cancel</button
			>
			<button class="surface-button" type="submit">Create Pin</button>
		</div>
		{#if error}
			<p class="error">{error}</p>
		{/if}
	</form>
</div>

<style>
	.page {
		padding: 1rem;
		position: relative;
	}

	.top {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}

	h1 {
		margin: 0 0 1rem 0;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	label {
		font-weight: bold;
	}

	input,
	select {
		font: inherit;
		border-radius: 0.75rem;
		padding: 0.5rem 0.75rem;
		border-radius: 0.75rem;
		border: 2px solid var(--bg-3);
		background: var(--bg-2);

		&:focus {
			outline: none;
		}
	}

	.row {
		margin-top: 1rem;
		display: flex;
		gap: 1rem;
		justify-content: flex-end;
	}
</style>
