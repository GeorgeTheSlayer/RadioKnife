<script lang="ts">
	//import type { PageData } from './$types';
	import CommentCard from '$lib/components/CommentCard.svelte';
	import type { Comment, Thread } from '@prisma/client';
	import { enhance } from '$app/forms';
	import { CommentTree } from '$lib/scripts/CommentTree';
	/** @type {import('./$types').PageData} */
	export let data;

	const allComments: Comment[] = data.posts as const;

	const commentGraph = CommentTree.buildCommentGraph(allComments);

	const threads: Thread = data.thread as const;
	import Editor from '@tinymce/tinymce-svelte';

	let apiKey = 'ama8nrb3pwnvsiap1exjga2ja1aktl54cmbr8ose8spgeh2m';
	let editorAdd = '';
</script>

<svelte:head>
	<title>{threads.title + ' | RadioKnife'}</title>
</svelte:head>

<div class="w-fit break-normal">
	<h1>{threads.title}</h1>
	<p>{threads.content}</p>

	<div class="mt-4 bg-primary-b">
		{#each commentGraph as posts}
			<div class="ml-{(posts.level * 10).toString()} mt-4">
				<CommentCard comment={posts.masterComment} tab={posts.level * 2} />
			</div>
		{/each}
	</div>

	<form
		class="mt-4"
		action="?/addComment"
		method="post"
		id="upload"
		enctype="multipart/form-data"
		use:enhance
	>
		<Editor {apiKey} bind:value={editorAdd} />
		<input type="hidden" name="content" id="content" value={editorAdd} />
		<button class="btn-base align-center">Submit</button>
	</form>
</div>
