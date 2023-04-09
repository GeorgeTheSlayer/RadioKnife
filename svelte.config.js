import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// alias: {
		// 	$app: path.resolve('./node_modules/@sveltejs/kit/assets/app'),
		// 	$lib: '/src/lib',
		// 	$routes: path.resolve('./.svelte-kit/types/src/routes')
		// },
		adapter: adapter()
		// alias: {
		// 	$routes: '.svelte-kit/types/src/routes'
		// }
	}
};

export default config;

//import { vitePreprocess } from '@sveltejs/kit/vite';
