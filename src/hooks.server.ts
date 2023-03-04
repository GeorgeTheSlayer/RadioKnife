import type { Handle } from '@sveltejs/kit';
import { handleHooks } from '@lucia-auth/sveltekit';
import { auth } from '$lib/server/lucia';
//import { sequence } from '@sveltejs/kit/hooks';

// export const handle: Handle = sequence(handleHooks(auth), customHandle)
export const handle: Handle = handleHooks(auth);
