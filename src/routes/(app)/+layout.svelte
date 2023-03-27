<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Banner from '$lib/components/Banner.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const quoteObj = data.quote;
	const fullQuote = "'" + quoteObj.content.slice(0, -1) + "'" + ' - ' + quoteObj.author;
</script>

<body class="max-w-screen scrollbar-hide box-border w-screen overflow-x-hidden">
	<nav>
		<Banner quoteBanner={fullQuote} />
		<Navbar />
	</nav>
	<main class="">
		<slot />
	</main>
</body>
