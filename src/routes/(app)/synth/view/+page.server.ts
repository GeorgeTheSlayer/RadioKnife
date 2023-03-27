import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		synths: await prisma.synth.findMany()
	};
};
