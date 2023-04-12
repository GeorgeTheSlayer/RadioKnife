import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '../../../../lib/server/prisma';

export const load: PageServerLoad = async ({ params }) => {
	const posts = async () => {
		return prisma.synth_profile.findMany({
			where: {
				userId: params.userId
			}
		});
	};

	const userInfo = async () => {
		try {
			const user = await prisma.user.findUnique({
				where: { id: params.userId }
			});
			if (!user) return new Error('User not found');
			return user.name;
		} catch (error) {
			return { error: 'error' };
		}
	};

	const comments = async () => {
		return prisma.comment.findMany({
			where: {
				userId: params.userId
			}
		});
	};

	const likes = async () => {
		return prisma.synth_profile_like.findMany({
			where: {
				userId: params.userId
			}
		});
	};

	return {
		posts: posts(),
		comments: comments(),
		likes: likes(),
		userId: params.userId,
		userName: userInfo()
	};
};
