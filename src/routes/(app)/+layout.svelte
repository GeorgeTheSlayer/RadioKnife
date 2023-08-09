<script lang="ts">
	import type { LayoutData } from './$types';
	import Navbar from '$lib/components/Navbar.svelte';
	import Banner from '$lib/components/Banner.svelte';

	export let data: LayoutData;

	// const quoteObj = data.quote;
	// const fullQuote = "'" + quoteObj.content.slice(0, -1) + "'" + ' - ' + quoteObj.author;
</script>

<body class="max-w-screen scrollbar-hide box-border w-screen overflow-x-hidden">
	<nav>
		<Banner
			quoteBanner={'Umm Umm, Holland is my favorite person in the whole world - Zoe Randolph'}
		/>
		<Navbar />
	</nav>
	<main class="">
		<slot />
	</main>
</body>
