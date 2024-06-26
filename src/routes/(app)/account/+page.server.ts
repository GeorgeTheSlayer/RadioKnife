import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { session, user } = await locals.validateUser();

	if (!session) {
		throw redirect(302, '/');
	}

	const posts = async () => {
		return prisma.synth_profile.findMany({
			where: {
				userId: user.userId
			}
		});
	};

	return { posts: posts() };
};
