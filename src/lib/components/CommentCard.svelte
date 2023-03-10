<script lang="ts">
	import type { Comment, User } from '@prisma/client';
	//import CommentCard from './CommentCard.svelte';
	import { slide } from 'svelte/transition';
	import { getUser } from '@lucia-auth/sveltekit/client';
	import Editor from '@tinymce/tinymce-svelte';

	/** @type {import('@prisma/client').Comment} */

	interface exComment extends Comment {
		childComments: Comment[];
		User: User;
	}

	let apiKey = 'ama8nrb3pwnvsiap1exjga2ja1aktl54cmbr8ose8spgeh2m';
	export let comment: exComment;
	export let upVote = false;
	export let downVote = false;
	export let tab = 0;
	let isReply = false;
	let isEdit = false;
	let hasChildren = true;
	let showChildren = true;
	let isUser = false;

	const user = getUser();
	const userId = $user?.userId;

	function toggleChildren() {
		showChildren = !showChildren;
	}

	function clickReply() {
		isReply = !isReply;
	}

	function clickSubmitReply() {
		isReply = !isReply;
	}
	export function clickUp() {
		upVote = true;
	}

	export function clickDown() {
		downVote = false;
	}

	function clickEdit() {
		isEdit = !isEdit;
	}

	//TODO: Make more efficient
	const getUserName = () => {
		if (user && userId == comment.userId) {
			isUser = true;
		}
	};

	getUserName();
	//const subComments: Promise<Comment[]> = getChildren();
	let editorReply = '';
	let editorEdit = comment.content;
	const tabVal = (tab * 5).toString();
	console.log(tabVal);
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>

	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>

	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
	/>
</svelte:head>

<div
	transition:slide|local
	class=" w-full border-4 border-transparent border-t-primary-g text-primary-w"
>
	<a href={'/account?id=' + comment.userId}>{comment.User.name}</a>
	<div class=" flex items-start">
		{#if hasChildren}
			<button on:click={toggleChildren}>
				{#if showChildren}
					<span class="material-symbols-outlined"> expand_more </span>
				{:else}
					<span class="material-symbols-outlined"> expand_less </span>
				{/if}
			</button>
		{:else}
			<span class="material-symbols-outlined"> process_chart </span>
		{/if}
		<div class="flex flex-col">
			<div>
				{@html comment.content}
			</div>
			<div class="flex text-center align-middle">
				<div class="flex">
					<button on:click={clickUp} class="mr-1">
						<span class="material-symbols-outlined"> arrow_upward </span>
					</button>
					<p class="mr-1">{comment.votes}</p>
					<button on:click={clickDown} class="mr-1">
						<span class="material-symbols-outlined"> arrow_downward </span>
					</button>
				</div>
				<div class="rounded hover:bg-gray-700">
					<button class="flex items-start border-black text-center" on:click={clickSubmitReply}>
						<span class="material-symbols-outlined"> reply </span>
						Reply
					</button>
				</div>
				{#if isUser}
					<form action="?/deleteComment" id="delete" method="post">
						<button type="submit">
							<span class="material-symbols-outlined"> delete </span>
						</button>
						<input type="hidden" name="deleteCommentId" id="deleteCommentId" value={comment.id} />
						<input
							type="hidden"
							name="deleteCommentUserId"
							id="deleteCommentUserId"
							value={userId}
						/>
					</form>
					<button on:click={clickEdit} type="submit">
						<span class="material-symbols-outlined"> edit </span>
					</button>
				{/if}
			</div>
		</div>
	</div>
	{#if isReply}
		<form transition:slide|local action="?/addReply" method="post" enctype="multipart/form-data">
			<Editor {apiKey} bind:value={editorReply} />
			<input type="hidden" name="replyContent" id="replyContent" value={editorReply} />
			<input type="hidden" name="commentId" id="commentId" value={comment.id} />
			<button on:click={clickReply} type="submit">Submit</button>
		</form>
	{/if}
	{#if isEdit}
		<form transition:slide|local action="?/editComment" method="post" enctype="multipart/form-data">
			<Editor {apiKey} bind:value={editorEdit} />
			<input type="hidden" name="editContent" id="editContent" value={editorEdit} />
			<input type="hidden" name="editCommentId" id="editCommentId" value={comment.id} />
			<button type="submit">Submit</button>
		</form>
	{/if}
</div>
