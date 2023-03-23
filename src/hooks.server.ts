import type { Handle } from '@sveltejs/kit';
import { handleHooks } from '@lucia-auth/sveltekit';
import { auth } from '$lib/server/lucia';
import { createContext } from '$lib/trpc/context';
import { router } from '$lib/trpc/router';
import { createTRPCHandle } from 'trpc-sveltekit';
import { sequence } from '@sveltejs/kit/hooks';

// export const handle: Handle = handleHooks(auth);
//
// export const handle: Handle = createTRPCHandle({ router, createContext });

export const handle: Handle = sequence(
	handleHooks(auth),
	createTRPCHandle({ router, createContext })
);
