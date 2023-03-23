import type { RequestHandler } from '@sveltejs/kit';
//import { prisma } from '$lib/server/prisma';

export const POST: RequestHandler = async ({ request }) => {
	const form = await request.json();

	return new Response(JSON.stringify(form));
};
