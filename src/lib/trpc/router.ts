import type { Context } from '$lib/trpc/context';
import { initTRPC } from '@trpc/server';
import { prisma } from '../server/prisma';
import { z } from 'zod';
// import delay from 'delay';

export const t = initTRPC.context<Context>().create();

export const router = t.router({
	greeting: t.procedure.query(async () => {
		// await delay(500); // 👈 simulate an expensive operation
		return `Hello tRPC v10 @ ${new Date().toLocaleTimeString()}`;
	}),
	voteComment: t.procedure
		.input(z.object({ userId: z.string().min(1), commentId: z.number().min(1), like: z.boolean() }))
		.mutation(async ({ input }) => {
			const userId = input.userId;
			const commentId = input.commentId;
			const like = input.like;

			try {
				await prisma.commentLike.upsert({
					update: { like: like },
					create: { commentId: commentId, userId: userId, like: like },
					where: { userId_commentId: { userId, commentId } }
				});
				return { success: 'success' };
			} catch (error) {
				return { error: 'error' };
			}
		}),
	deleteVoteComment: t.procedure
		.input(z.object({ likeId: z.number().min(1) }))
		.mutation(async ({ input }) => {
			try {
				await prisma.commentLike.delete({ where: { id: input.likeId } });
				return { success: 'success' };
			} catch (error) {
				return { error: 'error' };
			}
		}),
	getCommentLikes: t.procedure
		.input(z.object({ commentId: z.number().min(1) }))
		.query(async ({ input }) => {
			const commentId = input.commentId;
			try {
				const likes = await prisma.commentLike.findMany({
					where: { commentId: commentId }
				});
				return { likes };
			} catch (error) {
				return { error: 'error' };
			}
		})
});

export type Router = typeof router;
