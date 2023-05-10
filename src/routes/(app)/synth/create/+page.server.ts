import { redirect, type Actions } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import type { IPatcher } from '@rnbo/js';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request, locals }) => {
	const session = await locals.validate();
	if (!session) {
		throw redirect(302, '/login');
	}

	const userId = session.userId;

	const getName = async () => {
		const user = await prisma.user.findUnique({
			where: {
				id: userId
			}
		});

		if (!user) throw new Error('User not found');

		return user.name;
	};

	return {
		name: await getName()
	};
};

export const actions: Actions = {
	createSynth: async ({ request, locals }) => {
		//Check if user is logged in
		const session = await locals.validate();
		if (!session) {
			throw redirect(302, '/');
		}

		const currentUserId = session.userId;

		const formDataReq = await request.formData();
		console.log(formDataReq);
		const { title, content } = Object.fromEntries(formDataReq) as {
			title: string;
			content: string;
		};

		let file;
		const maxJson: any = formDataReq.get('file');
		// console.log(maxJson);
		//     ^?
		//console.log(maxJson);

		if (maxJson != null) {
			const ab = await maxJson.arrayBuffer();
			const jsonBuff = Buffer.from(ab);
			const ouutput = jsonBuff.toString();
			file = JSON.parse(ouutput);
		} else {
			return {
				data: null
			};
		}

		const maxFile: IPatcher = file!;
		const uiFile = JSON.parse(JSON.stringify({ value: { ui: maxFile.desc.parameters } }));

		try {
			const newFile = await prisma.synth_file.create({
				data: {
					file: file
				}
			});
			// console.log(newFile);
			await prisma.synth_profile.create({
				data: {
					title: title,
					content: content,
					file_id: newFile.id,
					userId: currentUserId,
					tags: ['synth'],
					ui: uiFile
				}
			});
		} catch (error) {
			console.log(error);
		}

		throw redirect(302, '/login');
	}
};
