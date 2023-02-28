<script lang="ts">
	import '../app.css';
	import '@fontsource/roboto';
	import Navbar from '$lib/components/Navbar.svelte';
	import { page } from '$app/stores';
	import { handleSession } from '@lucia-auth/sveltekit/client';
	import { getUser } from '@lucia-auth/sveltekit/client';

	//Lucia Get Session
	handleSession(page);
</script>

<body class="m-0 p-0 box-border">
	<nav class="m-0 p-0 overflow-hidden relative">
		<Navbar />
	</nav>
	<main class="m-0 p-20 bg-mono-30">
		<slot />
	</main>
</body>

<!-- <style type="text/scss">
	@import './layoutstyle.scss';
</style> -->
<!-- <style lang="scss">
	$text-primary: #b6b6b6;
	$text-secondary: #ececec;
	$bg-primary: #23232e;
	$bg-secondary: #141418;
	$c-white: #fff;

	:root {
		font-size: 16px;
		font-family: 'Roboto', sans-serif;
		box-sizing: border-box;
	}
</style> -->
