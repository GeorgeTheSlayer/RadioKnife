<script lang="ts">
	import type { PageData } from './$types';
	//import type { ForumThread } from '$lib/types';
	import type { Thread } from '@prisma/client';

	export let data: PageData;
	const forums: Thread[] = data.forums as const;
</script>

<svelte:head>
	<title>Forums | RadioKnife</title>
</svelte:head>

<h1 class="text-center">Forum Page</h1>

<div class="text-center">
	<a href="/forum/create"><button class="btn-base mt-4">Create</button></a>
</div>

{#each forums as thread}
	<div class="thread">
		<a href="/forum/thread/{thread.id}">
			<h2>{thread.title}</h2>
		</a>
		<p>{thread.content}</p>
	</div>
{/each}
