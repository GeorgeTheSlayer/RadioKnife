<script lang="ts">
	//import type { PageData } from './$types';
	import CommentCard from '$lib/components/CommentCard.svelte';
	import type { Comment, Thread } from '@prisma/client';
	import type { extendedComment } from '$lib/scripts/CommentTree';
	//import { enhance } from '$app/forms';
	import { CommentTree } from '$lib/scripts/CommentTree';
	//import Editor from '@tinymce/tinymce-svelte';
	/** @type {import('./$types').PageData} */
	export let data;

	const allComments: extendedComment[] = data.posts;

	const commentGraph = CommentTree.buildCommentGraph(allComments);

	const threads: Thread = data.thread;

	const apiKey = 'ama8nrb3pwnvsiap1exjga2ja1aktl54cmbr8ose8spgeh2m';
	let conf = {
		height: 500,
		plugins: [
			'a11ychecker',
			'advlist',
			'advcode',
			'advtable',
			'autolink',
			'checklist',
			'export',
			'lists',
			'link',
			'image',
			'charmap',
			'preview',
			'anchor',
			'searchreplace',
			'visualblocks',
			'powerpaste',
			'fullscreen',
			'formatpainter',
			'insertdatetime',
			'media',
			'table',
			'help',
			'wordcount'
		],
		toolbar:
			'undo redo | a11ycheck casechange blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | ' +
			'bullist numlist checklist outdent indent | removeformat | code table help'
	};

	let editorAdd = '';
</script>

<svelte:head>
	<title>{threads.title + ' | RadioKnife'}</title>
</svelte:head>

<div class="mx-10 w-full break-normal">
	<h1>{threads.title}</h1>
	<p>{threads.content}</p>

	<div class="mt-4 ">
		{#each commentGraph as posts}
			<div class="mx-10 mt-4">
				<CommentCard comment={posts.masterComment} tab={posts.level * 100} />
			</div>
		{/each}
	</div>

	<form class="mt-4" action="?/addComment" method="post" id="upload" enctype="multipart/form-data">
		<!--		<Editor {apiKey} bind:value={editorAdd} />-->
		<input type="hidden" name="content" id="content" value={editorAdd} />
		<button class="btn-base align-center">Submit</button>
	</form>
</div>
