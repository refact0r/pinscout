<script>
	import { supabase } from '$lib/supabaseClient';
	import { v4 as uuidv4 } from 'uuid';
	import { userState } from '$lib/state.svelte';
	import { PUBLIC_SUPABASE_URL } from '$env/static/public';
	import { colorMap } from '$lib/utils';
	import { get } from 'svelte/store';

	let { data, form } = $props();
	let images = $state([]);

	let pin = data.pins.find((pin) => String(pin.id) === data.id);

	let fileInput;
	let uploadError = $state('');
	let imagePath;

	getImages();

	async function getImages() {
		const { data: newImages, error: imageError } = await supabase
			.from('images')
			.select('*')
			.eq('pin_id', data.id);

		if (imageError) {
			console.error('Failed to refresh images:', imageError);
			return;
		}

		images = newImages || [];
	}

	async function uploadImage() {
		if (!fileInput || !fileInput.files[0]) {
			uploadError = 'no image provided';
			return;
		}

		const file = fileInput.files[0];

		imagePath = `${data.id}/${uuidv4()}-${file.name}`;

		console.log('file', file);

		try {
			const { error: storageError } = await supabase.storage
				.from('images')
				.upload(imagePath, file, { upsert: false });

			if (storageError) {
				console.error('failed to upload image:', storageError);
				uploadError = 'failed to upload image';
				return;
			}

			const { error: dbError } = await supabase.from('images').insert({
				pin_id: data.id,
				image_path: imagePath,
				author_id: userState.user?.id
			});

			if (dbError) {
				console.error('failed to save image path to database:', dbError);
				await supabase.storage.from('images').remove([imagePath]);
				uploadError = 'failed to save image path';
				return;
			}

			await getImages();
		} catch (error) {
			console.error('unexpected error:', error);
			uploadError = 'unexpected error during upload';
		}
	}
</script>

<div class="page">
	<div class="tags">
		<span class="tag" style="--color: {colorMap[pin.type]}">{pin.type}</span>
		{#if pin.name.length > 0}
			<span class="tag" style="--color: {colorMap[pin.type]}">{pin.subtype}</span>
		{/if}
	</div>
	<h1>
		{#if pin.name.length > 0}
			{pin.name}
		{:else}
			{pin.subtype}
		{/if}
	</h1>

	<h2>Images</h2>
	<input
		type="file"
		accept="image/png, image/jpeg, image/gif, image/webp, image/avif"
		bind:this={fileInput}
	/>
	<button onclick={uploadImage}>Upload</button>
	{#if uploadError}
		<p class="error">{uploadError}</p>
	{/if}

	<div class="image-list">
		{#each images as image}
			<img src={`${PUBLIC_SUPABASE_URL}storage/v1/object/public/images/${image.image_path}`} />
		{/each}
	</div>
</div>

<style>
	.page {
		width: 100%;
		height: 100%;
		padding: 1rem;
	}

	.tags {
		display: flex;
		gap: 0.5rem;
	}

	.tag {
		display: inline-block;
		padding: 0.25rem 0.5rem;
		border-radius: 0.5rem;
		color: color-mix(in srgb, var(--color), black 40%);
		background-color: color-mix(in hsl, var(--color), transparent 70%);
		border: 2px solid color-mix(in hsl, var(--color), transparent 70%);
	}

	h1 {
		margin: 1rem 0;
	}

	.image-list {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 1rem;
	}

	.image-list img {
		width: 200px;
		height: auto;
		border-radius: 0.5rem;
		object-fit: cover;
	}
</style>
