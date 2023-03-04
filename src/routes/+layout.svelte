<script lang="ts">
	import '../app.css';
	import '@fontsource/roboto';
	import Navbar from '$lib/components/Navbar.svelte';
	import { page } from '$app/stores';
	import { handleSession } from '@lucia-auth/sveltekit/client';
	//import { getUser } from '@lucia-auth/sveltekit/client';

	//Lucia Get Session
	handleSession(page);
</script>

<body class="m-0 p-0 box-border bg-primary-b text-primary-w">
	<nav class="m-0 p-0 overflow-hidden relative">
		<Navbar />
	</nav>
	<main class="m-0 p-20 ">
		<slot />
	</main>
</body>
