import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import z, { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

const createTopicSchema = z.object({
	title: z.string().min(1).max(100),
	content: z.string().min(1)
});

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate();
	if (!session) {
		throw redirect(302, '/login');
	}
};
export const actions: Actions = {
	createTopic: async ({ request, locals }) => {
		const formDataReq = await request.formData();
		const session = await locals.validate();
		if (!session) {
			throw redirect(302, '/login');
		}

		const userId = session?.userId;
		const { title, content } = Object.fromEntries(formDataReq) as {
			title: string;
			content: string;
		};
		console.log(title, content);

		try {
			createTopicSchema.parse({ title, content });
			await prisma.thread.create({
				data: { title, content, userId }
			});
			console.log('success');
		} catch (e) {
			if (e instanceof ZodError) {
				const zError = e.flatten();
				return {
					data: zError
				};
			}
			if (e instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(e);
				throw redirect(302, '/');
			}
		}
		throw redirect(302, '/forum');
	}
};
