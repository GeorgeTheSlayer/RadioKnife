import type { RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const POST: RequestHandler = async ({ request }) => {
	const form = await request.json();
	try {
		const likeId: string = form.likeId;

		await prisma.commentLike.delete({
			where: { id: Number(likeId) }
		});

		return new Response(JSON.stringify({ message: 'success' }));
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ message: 'error' }));
	}
};
