import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { goto } from '$app/navigation';
import { page } from '$app/state';

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);

export const getUser = async () => {
	const user = await supabase.auth.getUser();
	if (user.data.user) {
		if (page.url.pathname === '/login') {
			goto('/');
		}
		return user.data.user;
	} else {
		goto('/login');
	}
};

export const login = async () => {
	await supabase.auth.signInWithOAuth({ provider: 'google' });
};

export const logout = async () => {
	await supabase.auth.signOut();
	goto('/login');
};
