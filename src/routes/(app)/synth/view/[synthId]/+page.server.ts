import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params }) => {
	const synthId = Number(params.synthId);

	async function getRecSynths() {
		try {
			return await prisma.synth_profile.findMany();
		} catch (err) {
			throw error(505);
		}
	}

	async function getSynth() {
		try {
			return await prisma.synth_file.findUnique({
				where: { id: synthId },
				include: { synth_profile: true }
			});
		} catch (err) {
			return Error('Error');
		}
	}

	return {
		recs: await getRecSynths(),
		synth: await getSynth()
	};
};
