import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const synthId = Number(params.synthId);

	async function getRecSynths() {
		return await prisma.synth.findMany();
	}

	async function getSynth() {
		try {
			return await prisma.synth.findUnique({ where: { id: synthId }, include: { User: true } });
		} catch (err) {
			return Error('Error');
		}
	}

	return {
		recs: await getRecSynths(),
		synth: await getSynth()
	};
};
