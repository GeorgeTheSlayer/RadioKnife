//import type { Actions } from "@sveltejs/kit";
import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const getSynths = async () => {
		return await prisma.synth_profile.findMany();
	};

	return {
		synths: getSynths()
	};
};
