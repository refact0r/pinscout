<script>
	import { selectedPin } from '$lib/state.svelte.js';
	import X from 'phosphor-svelte/lib/X';
	import { supabase } from '$lib/supabaseClient';
	import { v4 as uuidv4 } from 'uuid';
	import { userState, pinState } from '$lib/state.svelte';
	import { PUBLIC_SUPABASE_URL } from '$env/static/public';
	import { colorMap } from '$lib/utils';
	import Modal from '$lib/components/Modal.svelte';
	import PaperPlaneRight from 'phosphor-svelte/lib/PaperPlaneRight';
	import { ThumbsDown, ThumbsUp } from 'phosphor-svelte';

	let { data, form } = $props();
	let images = $state([]);

	let pin = $state(pinState.pins?.find((pin) => String(pin.id) === data.id) || null);
	$effect(() => {
		pin = pinState.pins?.find((pin) => String(pin.id) === data.id) || null;
		selectedPin.pin = data.id;
	});

	let fileInput;
	let uploadError = $state('');
	let imagePath;
	$effect(async () => {
		await getImages(pin);
		await refreshReviews(pin);
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

	let reviews = $state(data.reviews);
	let textinput = $state('');

	async function refreshReviews(pin) {
		if (!pin) return;
		const { data: newReviews, error } = await supabase
			.from('reviews')
			.select('*')
			.eq('pin_id', pin.id)
			.select('*, profiles (id, name, avatar_url)');

		if (error) {
			console.error('Failed to refresh reviews:', error);
			return;
		}

		reviews = newReviews || [];
	}

	async function submitReview() {
		const { res, error } = await supabase.from('reviews').insert({
			content: textinput,
			pin_id: data.id,
			author_id: userState.user.id
		});

		if (error) {
			console.error('Failed to submit review:', error);
			return;
		}

		refreshReviews();

		textinput = '';
	}
</script>

<div class="page">
	<div class="top">
		<a href="/" onclick={() => (selectedPin.pin = null)}><X size="1.5rem" /></a>
	</div>
	{#if pin}
		<div class="tags">
			<span class="tag" style="--color: {colorMap[pin.type] || '#333'}">{pin.type}</span>
			{#if pin.name.length > 0}
				<span class="tag" style="--color: {colorMap[pin.type] || '#333'}">{pin.subtype}</span>
			{/if}
		</div>
		<h1>
			{#if pin.name.length > 0}
				{pin.name}
			{:else}
				{pin.subtype}
			{/if}
		</h1>

		{#if images.length > 0}
			<div class="image-list">
				{#each images as image}
					<img src={`${PUBLIC_SUPABASE_URL}storage/v1/object/public/images/${image.image_path}`} />
				{/each}
			</div>
		{/if}

		{#if userState.user}
			<button class="upload surface-button" onclick={openModal}>upload image</button>
		{/if}

		{#if userState.user}
			<div class="review-form">
				<textarea bind:value={textinput} placeholder="Leave a review" maxlength="25"></textarea>
				<button onclick={submitReview}><PaperPlaneRight /></button>
			</div>
			{#each reviews as review}
				<div class="review">
					<div class="user">
						<img src={review?.profiles?.avatar_url} alt="Avatar" />
						<div>{review?.profiles?.name}</div>
					</div>
					{review.content}
					<div class="bottom">
						<button>
							<ThumbsUp />
						</button>
						<button>
							<ThumbsDown />
						</button>
					</div>
				</div>
			{/each}
		{/if}
	{/if}
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
		overflow: auto;
		position: relative;
	}

	.top {
		position: absolute;
		top: 1rem;
		right: 1rem;
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
		margin: 1rem 0;
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
		margin-bottom: 1rem;
	}

	.upload-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.error {
		margin-bottom: 0;
	}

	.review-form {
		display: flex;
		margin-bottom: 1rem;
		gap: 1.5rem;

		button {
			background-color: var(--bg-2);
			border-radius: 0.75rem;
			font-size: 1.5rem;
			width: 2.5rem;
			height: 2.5rem;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 2px solid var(--bg-2);
		}

		textarea {
			width: 100%;
			height: 2.5rem;
			background-color: var(--bg-2);
			border: 2px solid var(--bg-2);
			overflow: hidden;
			outline: none;
			padding: 0 0.75rem;
			border-radius: 0.75rem;
			resize: none;
			font: inherit;
			line-height: 2.5rem;
		}
	}

	.review {
		padding: 1rem 0;
		img {
			width: 2rem;
			height: 2rem;
			border-radius: 50%;
			margin-right: 0.5rem;
		}

		.user {
			display: flex;
			align-items: center;
			margin-bottom: 1rem;
			font-size: 1rem;
		}

		.bottom {
			display: flex;
			gap: 1rem;
			margin-top: 1rem;
		}
	}
</style>
