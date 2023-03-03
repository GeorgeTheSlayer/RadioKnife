import type { RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
//import type { Synth } from "@prisma/client";

export const GET = (async ({ params }) => {
	const id = params.userId;

	const accountSynths = await prisma.synth.findMany({
		where: {
			userId: id
		}
	});

	return new Response(JSON.stringify(accountSynths));
}) satisfies RequestHandler;
