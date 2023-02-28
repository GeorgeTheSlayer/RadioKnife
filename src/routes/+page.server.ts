import type { Actions } from "@sveltejs/kit";
import { prisma } from "../lib/server/prisma";
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async () => {
	return {
		synths: await prisma.synth.findMany()
	};
};

