import type { RequestHandler } from "@sveltejs/kit"
import { prisma } from "$lib/server/prisma"
import type { Synth } from "@prisma/client";


export const GET = (async ({url}) => {
    const id = Number(url.searchParams.get("id"));
    const specificSynth = await prisma.synth.findUnique({
        where: {
            id: id
        }
    });

    return new Response(JSON.stringify(specificSynth));

}) satisfies RequestHandler;
