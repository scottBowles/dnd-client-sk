import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	const { isLoggedIn, token } = locals;
	if (isLoggedIn) {
		throw redirect(302, '/');
	}
	return { isLoggedIn, token };
};
