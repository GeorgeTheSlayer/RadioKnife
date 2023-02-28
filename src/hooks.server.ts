import type { Handle } from '@sveltejs/kit';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { handleHooks } from '@lucia-auth/sveltekit';
import { auth } from '$lib/server/lucia';
import { appRouter } from '$lib/trpc/server';
import { sequence } from "@sveltejs/kit/hooks"

const trpcPathBase = '/api/trpc';

export const customHandle: Handle = async ({ event, resolve }) => {
 if (event.url.pathname.startsWith(`${trpcPathBase}/`)) {
  const response = await fetchRequestHandler({
   endpoint: trpcPathBase,
   req: event.request,
   router: appRouter,
   createContext() {
    return {
     req: event.request,
    };
   },
  });

  return response;
 }

 return await resolve(event);
};

export const handle: Handle = sequence(handleHooks(auth), customHandle)
