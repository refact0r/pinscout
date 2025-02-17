// src/routes/pin/[slug]/+page.server.js
import { supabase } from '$lib/supabaseClient';

export async function load({ params }) {
	const { data: reviews, reviewError } = await supabase
		.from('reviews')
		.select('*')
		.eq('pin_id', params.slug)
		.select('*, profiles (id, name, avatar_url)');

	if (reviewError) {
		console.error('Failed to fetch reviews:', reviewError);
		return {
			reviews: []
		};
	}

	return {
		reviews: reviews || [],
		id: params.slug
	};
}
