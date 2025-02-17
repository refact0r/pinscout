import { supabase } from '$lib/supabaseClient';

export async function load() {
	const { data, error } = await supabase.from('profiles').select('*');

	if (error) {
		console.error('Error fetching profiles:', error);
		return { profiles: [] };
	}

	return { users: data };
}
