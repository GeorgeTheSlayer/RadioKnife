<script lang="ts">
	import { page } from '$app/stores';
	import { trpc } from '$lib/trpc/client';
	import { onMount } from 'svelte';
	import Card from '$lib/components/Card.svelte';
	import type { Synth } from '@prisma/client';
	import { getUser } from '@lucia-auth/sveltekit/client';
	import { goto } from '$app/navigation';

	const user = getUser();
	const userId = $user?.userId;

	let synthPosts: Synth[];
	let loaded = false;

	onMount(async () => {
		if (userId) {
			const value = await trpc.getAllSynthsByUser.query({ id: userId! });
			synthPosts = value.posts;
			loaded = true;
		} else goto('/');
	});
</script>

<h1 class="text-center">Account page</h1>
{#if loaded}
	<div class=" grid grid-cols-4">
		{#each synthPosts as synth}
			<div class="m-4">
				<Card cardSynth={synth} />
			</div>
		{/each}
	</div>
{/if}

<form
	action="/logout"
	method="post"
	class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
>
	<button> logout </button>
</form>
