import { redirect, type Actions } from "@sveltejs/kit";
import { prisma } from "$lib/server/prisma";

export const actions: Actions = {
    createSynth: async ({request, locals}) => {
        const formDataReq = await request.formData();
        const {title, content} = Object.fromEntries(formDataReq) as {title: string, content: string};
        const session = await locals.validate();
        const currentUserId = session!.userId;
        
        let file;
        const maxJson: any = formDataReq.get("file");
        //     ^?
        //console.log(maxJson);

        if (maxJson != null) {
            const ab = await maxJson.arrayBuffer();
            const jsonBuff = Buffer.from(ab);
            const ouutput = jsonBuff.toString();
            file = JSON.parse(ouutput);
        }
        else{
            return {
                data: null
            }
        }


    try {
        await prisma.synth.create({
            data: {
                title,
                content,
                file,
                userId: currentUserId,
            }
        })

    } catch (error) {
        
    }
    throw redirect(302, "/login");
    },
};
