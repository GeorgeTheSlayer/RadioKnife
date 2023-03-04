import type { RequestHandler } from '@sveltejs/kit';

export const GET = (async ({ url }) => {
	const id = url.searchParams.get('id');
	if (id) {
		const name = await prisma.user.findUnique({
			where: {
				id: id
			},
			select: {
				name: true
			}
		});

		return new Response(JSON.stringify(name));
	}
	return new Response(JSON.stringify({ error: 'No id provided' }));
}) satisfies RequestHandler;
