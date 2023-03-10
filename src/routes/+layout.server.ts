// import type { PageServerLoad } from './$types';
// import { prisma } from '$lib/server/prisma';
// import { auth } from '$lib/server/lucia';
// import { fail, redirect } from '@sveltejs/kit';
import { handleServerSession } from '@lucia-auth/sveltekit';

export const load = handleServerSession();
