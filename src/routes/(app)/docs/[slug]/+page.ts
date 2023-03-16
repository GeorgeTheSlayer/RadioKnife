import type { PageLoad } from './$types';
import { marked } from 'marked';

export const load = (async ({ fetch, params }) => {
	const slug = params['slug']; // retrieve the "slug" param
	const res = await fetch(`/${slug}.md`);
	const post = await res.text();

	return {
		slug,
		post: marked.parse(post)
	};
}) as PageLoad;
