import type { RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const POST: RequestHandler = async ({ request }) => {
	const form = await request.json();
	try {
		const commentId = Number(form.commentId);
		const userId: string = form.userId;
		const testLike: string = form.like;
		let like: boolean;

		if (testLike === 'true') {
			like = true;
		} else {
			like = false;
		}

		// await prisma.commentLike.create({ data: { commentId: commentId, userId: userId, like: like } });
		const newLike = await prisma.commentLike.upsert({
			update: { like: like },
			create: { commentId: commentId, userId: userId, like: like },
			where: { userId_commentId: { userId, commentId } }
		});

		return new Response(JSON.stringify({ message: 'success', post: newLike }));
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ message: 'error' }));
	}
};
