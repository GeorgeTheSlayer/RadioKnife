import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const synthId = Number(params.synthId);

	async function getRecSynths() {
		return await prisma.synth_profile.findMany();
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
