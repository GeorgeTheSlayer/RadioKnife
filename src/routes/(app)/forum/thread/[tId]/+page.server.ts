import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const ID = Number(params.tId);
	try {
		const thread = await prisma.thread.findUnique({
			where: {
				id: ID
			}
		});
		const posts = await prisma.comment.findMany({
			where: { forumId: ID, parentId: null },
			include: {
				childComments: true
			}
		});
		return { thread: thread, posts: posts } as const;
	} catch (e) {
		console.log(e);
	}
}) satisfies PageServerLoad;

export const actions: Actions = {
	addComment: async ({ request, locals, params }) => {
		//Check if user is logged in. If not redirect to login page
		const session = await locals.validate();
		if (!session) {
			throw redirect(302, '/login');
		}
		const userId = session!.userId;
		const forumId = Number(params.tId);

		const { content } = Object.fromEntries(await request.formData()) as { content: string };
		try {
			await prisma.comment.create({
				data: { content: content, userId: userId, forumId: forumId },
				include: { childComments: true }
			});
			console.log('success');
		} catch (e) {
			console.log(e);
		}
	},
	addReply: async ({ request, locals, params }) => {
		const session = await locals.validate();
		if (!session) {
			throw redirect(302, '/login');
		}

		const { replyContent, commentId } = Object.fromEntries(await request.formData()) as {
			replyContent: string;
			commentId: string;
		};

		const userId = session!.userId;
		const forumId = Number(params.tId);
		const parentId = Number(commentId);

		try {
			await prisma.comment.create({
				data: { content: replyContent, userId: userId, forumId: forumId, parentId: parentId }
			});
		} catch (e) {
			console.log(e);
		}
	}
};
