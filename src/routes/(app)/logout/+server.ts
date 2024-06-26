import { auth } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ locals }: any) => {
	const session = await locals.validate();
	if (!session) {
		throw redirect(302, '/');
	}

	await auth.invalidateSession(session.sessionId);
	locals.setSession(null);

	throw redirect(302, '/');
};
