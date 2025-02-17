<script>
	import { selectedPin } from '$lib/state.svelte.js';
	import { X } from 'phosphor-svelte';
	import { supabase } from '$lib/supabaseClient';
	import { v4 as uuidv4 } from 'uuid';
	import { userState } from '$lib/state.svelte';
	import { PUBLIC_SUPABASE_URL } from '$env/static/public';
	import { colorMap } from '$lib/utils';
	import Modal from '$lib/components/Modal.svelte';

	let { data, form } = $props();
	let images = $state([]);

	let pin = $state(data.pins?.find((pin) => String(pin.id) === data.id) || null);
	$effect(() => {
		pin = data.pins?.find((pin) => String(pin.id) === data.id) || null;
		selectedPin.pin = data.id;
	});

	let fileInput;
	let uploadError = $state('');
	let imagePath;
	$effect(async () => {
		await getImages(pin);
	});

	async function getImages(pin) {
		if (!pin) return;

		const { data: newImages, error: imageError } = await supabase
			.from('images')
			.select('*')
			.eq('pin_id', pin.id)
			.order('created_at', { ascending: false });

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

	let modal = $state();

	function openModal() {
		modal.open();
	}
</script>

<div class="page">
	<div class="top">
		<div class="tags">
			<span class="tag" style="--color: {colorMap[pin.type]}">{pin.type}</span>
			{#if pin.name.length > 0}
				<span class="tag" style="--color: {colorMap[pin.type]}">{pin.subtype}</span>
			{/if}
		</div>
		<a href="/" onclick={() => (selectedPin.pin = null)}><X size="1.5rem" /></a>
	</div>
	<h1>
		{#if pin.name.length > 0}
			{pin.name}
		{:else}
			{pin.subtype}
		{/if}
	</h1>

	<div class="image-list">
		{#each images as image}
			<img src={`${PUBLIC_SUPABASE_URL}storage/v1/object/public/images/${image.image_path}`} />
		{/each}
	</div>

	<br />

	<button class="upload surface-button" onclick={openModal}>upload image</button>
</div>

<Modal bind:this={modal} title="upload image"
	><div class="upload-row">
		<input
			type="file"
			accept="image/png, image/jpeg, image/gif, image/webp, image/avif"
			bind:this={fileInput}
		/>
		<button class="surface-button" onclick={uploadImage}>Upload</button>
	</div>
	{#if uploadError}
		<p class="error">{uploadError}</p>
	{/if}
</Modal>

<style>
	.page {
		width: 100%;
		height: 100%;
		padding: 1rem;
	}

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
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
		gap: 1rem;
		display: flex;
		overflow-x: scroll;
		scrollbar-width: none;
		-ms-overflow-style: none;
		border-radius: 0.75rem;
	}

	.image-list::-webkit-scrollbar {
		display: none;
	}

	.image-list img {
		width: 15rem;
		height: 20rem;
		border-radius: 0.75rem;
		object-fit: cover;
	}

	.upload {
		width: 100%;
	}

	.upload-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.error {
		margin-bottom: 0;
	}
</style>
