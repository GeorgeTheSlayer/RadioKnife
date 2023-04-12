<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { synth_profile } from '@prisma/client';
	//import { getUser } from '@lucia-auth/sveltekit/client';
	//import { goto } from '$app/navigation';
	/** @type {import('./$types').PageData} */
	export let data;

	//const user = getUser();
	//const userId = $user?.userId;

	const synthPosts: synth_profile[] = data.posts as const;
	//console.log(synthPosts);
	//let loaded = false;
</script>

<svelte:head>
	<title>Account | RadioKnife</title>
</svelte:head>

<h1 class="text-center">Account page</h1>

<div class=" grid grid-cols-4">
	{#each synthPosts as synth}
		<div class="m-4">
			<Card cardSynth={synth} />
		</div>
	{/each}
</div>

<form
	action="/logout"
	method="post"
	class="focus:shadow-outline mt-4 rounded bg-indigo-500 py-2 px-4 font-bold text-white hover:bg-indigo-700 focus:outline-none"
>
	<button class="text-center"> Logout </button>
</form>
