//import type { Actions } from "@sveltejs/kit";
import { prisma } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const getSynths = async () => {
		return await prisma.synth_profile.findMany();
	};

	const getProfiles = async () => {
		return await prisma.user.findMany({ include: { _count: { select: { SynthProfile: true } } } });
	};

	return {
		synths: getSynths(),
		profiles: getProfiles()
	};
};
