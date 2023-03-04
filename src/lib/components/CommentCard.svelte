<script lang="ts">
	import type { Comment } from '@prisma/client';
	import CommentCard from './CommentCard.svelte';
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	/** @type {import('@prisma/client').Comment} */

	export let comment: Comment;
	export let upVote: boolean = false;
	export let downVote: boolean = false;
	let isReply: boolean = false;
	let hasChildren: boolean = true;
	let showChildren: boolean = true;
	let mounted: boolean = false;

	function toggleChildren() {
		showChildren = !showChildren;
	}

	function clickReply() {
		isReply = !isReply;
	}
	export function clickUp() {
		upVote = true;
	}

	export function clickDown() {
		downVote = false;
	}

	const getChildren = async () => {
		let newChildren: Comment[] = [];
		if (comment.childComments) {
			const children: Comment[] = comment?.childComments!;
			for (const child of children) {
				newChildren.push(
					await fetch('/api/comments/getChild?id=' + child.id)
						.then((res) => res.json())
						.then((data) => {
							return data;
						})
				);
			}
			console.log(newChildren);
		} else {
			hasChildren = false;
		}
		return newChildren;
	};

	const getUserName = async () => {
		const tempName = await fetch('/api/user/getNameFromId?id=' + comment.userId)
			.then((res) => res.json())
			.then((data) => {
				return data;
			});
		return tempName.name;
	};

	const userName: Promise<String> = getUserName();
	const subComments: Promise<Comment[]> = getChildren();

	onMount(() => {});
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
</svelte:head>

{#await userName}
	<p>loading...</p>
{:then userName}
	<div
		transition:slide|local
		class="border-transparent border-t-primary-g text-primary-w border-4 w-full "
	>
		<a href={'/account?id=' + comment.userId}>{userName}</a>
		<div class="flex items-start">
			<button on:click={toggleChildren}>
				{#if hasChildren}
					{#if showChildren}
						<span class="material-symbols-outlined"> expand_more </span>
					{:else}
						<span class="material-symbols-outlined"> expand_less </span>
					{/if}
				{:else}
					<span class="material-symbols-outlined"> process_chart </span>
				{/if}
			</button>
			<div class="flex flex-col">
				<p>{comment.content}</p>
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
					<div class="flex items-start text-center">
						<span class="material-symbols-outlined"> reply </span>
						<button class="border-black" on:click={clickReply}>Reply</button>
					</div>
				</div>
			</div>
		</div>
		{#if isReply}
			<form
				transition:slide|local
				action="?/addReply"
				method="post"
				id="upload"
				enctype="multipart/form-data"
			>
				<input type="text" name="replyContent" id="replyContent" />
				<input type="hidden" name="commentId" id="commentId" value={comment.id} />
				<button type="submit">Submit</button>
			</form>
		{/if}
	</div>
	{#if hasChildren}
		{#await subComments}
			<p>loading...</p>
		{:then subComments}
			{#if showChildren}
				<div transition:slide|local class="ml-20 mt-4">
					{#each subComments as subComment}
						<div class="ml-20 mt-4">
							<CommentCard comment={subComment} />
						</div>
					{/each}
				</div>
			{/if}
		{/await}
	{/if}
{/await}
