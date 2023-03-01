import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';
import { initTRPC } from '@trpc/server';
import { validate } from 'schema-utils';
import { z } from 'zod';
import { prisma } from "../server/prisma";

const t = initTRPC.create();

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;

export const appRouter = t.router({
 hello: publicProcedure.input(z.string()).query(async (opt) => {
    return `Hello ${opt.input}`;
 }),
 getSynthById: publicProcedure.input(z.number()).query(async (id) => {
   return {
		synths: await prisma.synth.findUnique({
            where:{
                id: Number(id.input)
            }
        })
	};
 }),
 getAllSynthsByUser: publicProcedure.input(z.object({id: z.string()})).query(async (req) => {
    const {id} = req.input;
    try{
        return{
            posts: await prisma.synth.findMany({
                where: {
                    userId: id
                  }
            })
        }
    }catch (err){

    }
 }),
});

export type AppRouter = typeof appRouter;
