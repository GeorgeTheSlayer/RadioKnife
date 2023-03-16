import type { RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const GET: RequestHandler = async ({ url }) => {
	const id = Number(url.searchParams.get('id'));
	const childComment = await prisma.comment.findUnique({
		where: {
			id: id
		},
		include: {
			childComments: true
		}
	});

	return new Response(JSON.stringify(childComment));
};
