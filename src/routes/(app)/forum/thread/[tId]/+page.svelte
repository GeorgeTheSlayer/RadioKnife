<script lang="ts">
	//import type { PageData } from './$types';
	import CommentCard from '$lib/components/CommentCard.svelte';
	import type { Comment } from '@prisma/client';
	//import { each } from 'svelte/internal';
	/** @type {import('./$types').PageData} */
	export let data;
	import { browser } from '$app/environment';
	const allComments: Comment[] = data.posts as const;
	// allComments.forEach((comment) => {
	// 	console.log(comment);
	// });
</script>

<h1>{data.thread.title}</h1>
<p>{data.thread.content}</p>

<div class="mt-4 bg-primary-b">
	{#if browser}
		{#each allComments as posts}
			<div class="mt-4">
				<CommentCard comment={posts} />
			</div>
		{/each}
	{/if}
</div>

<form action="?/addComment" method="post" id="upload" enctype="multipart/form-data">
	<input type="text" name="content" id="content" />
	<button class="btn-base">Submit</button>
</form>
