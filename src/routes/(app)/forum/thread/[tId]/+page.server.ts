import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';
import type { Actions } from '@sveltejs/kit';
import { error, redirect } from '@sveltejs/kit';
import { z } from 'zod';

const commentParser = z.object({
	content: z.string().min(1).max(10000),
	userId: z.string().min(1),
	forumId: z.number().min(1).positive(),
	parentId: z.number().min(1).positive().optional()
});

export const load: PageServerLoad = async ({ params }) => {
	const ID = Number(params.tId);
	const thread = async () => {
		try {
			return await prisma.thread.findUnique({
				where: {
					id: ID
				}
			});
		} catch (e) {
			throw error(505, 'Check the console');
		}
	};

	const posts = async () => {
		try {
			return await prisma.comment.findMany({
				where: { forumId: ID },
				include: { childComments: true, User: true, CommentLike: true }
			});
		} catch (e) {
			throw error(505, 'Check the console');
		}
	};

	return { thread: thread(), posts: posts() };
};

export const actions: Actions = {
	addComment: async ({ request, locals, params }) => {
		//Check if user is logged in. If not redirect to login page
		const session = await locals.validate();
		if (!session) {
			throw redirect(302, '/login');
		}
		const userId = session.userId;
		const forumId = Number(params.tId);

		const { content } = Object.fromEntries(await request.formData()) as { content: string };
		try {
			commentParser.parse({ content: content, userId: userId, forumId: forumId });
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

		const userId = session.userId;
		const forumId = Number(params.tId);
		const parentId = Number(commentId);

		try {
			commentParser.parse({
				content: replyContent,
				userId: userId,
				forumId: forumId,
				parentId: parentId
			});
			await prisma.comment.create({
				data: { content: replyContent, userId: userId, forumId: forumId, parentId: parentId }
			});
		} catch (e) {
			console.log(e);
		}
	},
	deleteComment: async ({ request, locals }) => {
		const session = await locals.validate();
		if (!session) {
			throw redirect(302, '/login');
		}

		const { deleteCommentId, deleteCommentUserId } = Object.fromEntries(
			await request.formData()
		) as {
			deleteCommentId: string;
			deleteCommentUserId: string;
		};

		const commentId = Number(deleteCommentId);
		try {
			await prisma.comment.delete({
				where: {
					id: commentId
				}
			});
		} catch (e) {
			console.log(e);
		}
	},
	editComment: async ({ request, locals }) => {
		const session = await locals.validate();
		if (!session) {
			throw redirect(302, '/login');
		}

		const { editCommentId, editContent } = Object.fromEntries(await request.formData()) as {
			editCommentId: string;
			editContent: string;
		};

		const commentId = Number(editCommentId);
		try {
			await prisma.comment.update({
				where: {
					id: commentId
				},
				data: {
					content: editContent
				}
			});
		} catch (e) {
			console.log(e);
		}
	}
};
