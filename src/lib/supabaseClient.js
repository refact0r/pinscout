import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { goto, invalidateAll } from '$app/navigation';
import { page } from '$app/state';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export const getUser = async () => {
	const user = await supabase.auth.getUser();
	if (user.data.user) {
		if (page.url.pathname === '/login') {
			goto('/');
		}
		const { data } = await supabase.from('profiles').select().eq('id', user.data.user.id);
		return data[0];
	} else {
		return null;
	}
};

export const login = async () => {
	await supabase.auth.signInWithOAuth({ provider: 'google' });
};

export const logout = async () => {
	await supabase.auth.signOut();
	location.reload();
};
