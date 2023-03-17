import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
// import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	const forums = async () => {
		return await prisma.thread.findMany();
	};

	try {
		return { forums: await prisma.thread.findMany() };
	} catch (err) {
		console.log(err);
		throw error(500, 'Check the console');
	}
};
