import { supabase } from '$lib/supabaseClient';

// export async function load() {
// 	const { data: pins, error } = await supabase.from('pins').select('*');

// 	if (error) {
// 		console.error('Failed to fetch pins:', error.message);
// 		return {
// 			pins: []
// 		};
// 	}

// 	return {
// 		pins: pins || []
// 	};
// }
