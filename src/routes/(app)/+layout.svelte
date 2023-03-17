<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Banner from '$lib/components/Banner.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const quoteObj = data.quote;
	const fullQuote = "'" + quoteObj.content.slice(0, -1) + "'" + ' - ' + quoteObj.author;
</script>

<body class="max-w-screen box-border w-screen overflow-clip overscroll-x-none">
	<nav class="">
		<Banner quoteBanner={fullQuote} />
		<Navbar />
	</nav>
	<main>
		<slot />
	</main>
</body>
