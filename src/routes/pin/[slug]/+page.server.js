import { supabase } from '$lib/supabaseClient';

export async function load({ params }) {
	const { data: reviews, error } = await supabase
		.from('reviews')
		.select('*')
		.eq('pin_id', params.slug);

	if (error) {
		console.error('Failed to fetch reviews:', error);
		return {
			reviews: []
		};
	}

	return {
		reviews: reviews || [],
		id: params.slug
	};
}
