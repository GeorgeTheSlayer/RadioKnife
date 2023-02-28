import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './server';
import { dev } from '$app/environment';

const prodEndpoint = import.meta.env.VERCEL_URL;
//const apiUrl = process.env.VERCEL_URL!;

export const trpc = createTRPCProxyClient<AppRouter>({
 links: [
  httpBatchLink({
      // url is dependent on the environment
      // in dev, we use localhost
      // in prod, we use the public domain
   url: dev
    ? 'http://localhost:5173/api/trpc'
    : prodEndpoint + '/api/trpc',
  }),
 ],
});
