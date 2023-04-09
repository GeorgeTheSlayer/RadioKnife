import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	async function loadQuote() {
		return await fetch('https://api.quotable.io/random').then((res) => res.json());
	}

	return {
		quote: await loadQuote()
	};
};
