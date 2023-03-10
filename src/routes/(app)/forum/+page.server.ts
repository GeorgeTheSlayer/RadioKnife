import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const forums = async () => {
		return await prisma.thread.findMany();
	};

	return { forums: forums() } as const;
};
