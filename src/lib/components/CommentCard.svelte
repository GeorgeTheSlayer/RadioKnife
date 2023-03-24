<script lang="ts">
	import type { Comment, User, CommentLike } from '@prisma/client';
	//import CommentCard from './CommentCard.svelte';
	import { slide } from 'svelte/transition';
	import { getUser } from '@lucia-auth/sveltekit/client';
	import Editor from '@tinymce/tinymce-svelte';
	//import type { likeRequest } from '../interfaces';
	import { trpc } from '$lib/trpc/client';
	import { page } from '$app/stores';
	import * as dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import { browser } from '$app/environment';
	/** @type {import('@prisma/client').Comment} */

	interface exComment extends Comment {
		childComments: Comment[];
		CommentLike: CommentLike[];
		User: User;
	}

	let apiKey = 'ama8nrb3pwnvsiap1exjga2ja1aktl54cmbr8ose8spgeh2m';
	export let comment: exComment;
	let likeNum = 0;
	export let tab = 0;
	let isReply = false;
	let isEdit = false;
	let hasChildren = true;
	let showChildren = true;
	let isUser = false;
	let colorThumb: boolean | undefined = false;

	const user = getUser();
	const userId: string = $user?.userId;

	function toggleChildren() {
		showChildren = !showChildren;
	}

	function clickReply() {
		isReply = !isReply;
	}

	function clickSubmitReply() {
		isReply = !isReply;
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

	const refreshClientLikes = (arr: CommentLike[]) => {
		likeNum = 0;
		// console.log(likeObjs);
		if (arr.length == 0) {
			colorThumb = undefined;
			return;
		}
		arr.forEach((like) => {
			if (like.like) {
				likeNum++;
			} else {
				likeNum--;
			}
			if (like.userId == userId) {
				colorThumb = like.like;
			} else {
				colorThumb = undefined;
			}
		});
	};

	let likeObjs: CommentLike[] = [];
	let time = '';
	if (browser) {
		const date = comment.updatedAt;
		dayjs.extend(relativeTime);
		time = dayjs(date).fromNow();
		likeObjs = comment.CommentLike;
		refreshClientLikes(likeObjs);
	}

	async function addVote(value: boolean) {
		if (user) {
			const found = likeObjs.find((like) => like.userId == userId);

			let result;
			const likeVal = found?.like;
			if (found && likeVal == value) {
				await trpc($page).deleteVoteComment.mutate({
					likeId: found.id
				});
			} else {
				await trpc($page).voteComment.mutate({
					commentId: comment.id,
					userId: userId,
					like: value
				});
			}

			const newLikes = await trpc($page).getCommentLikes.query({
				commentId: comment.id
			});
			likeObjs = newLikes.likes;
			refreshClientLikes(likeObjs);
		}
	}

	async function pullLikes() {
		const newLikes = await trpc($page).getCommentLikes.query({
			commentId: comment.id
		});
		likeObjs = newLikes.likes;
		refreshClientLikes(likeObjs);
	}

	//comment.childComments.;

	getUserName();
	//const subComments: Promise<Comment[]> = getChildren();
	let editorReply = '';
	let editorEdit = comment.content;
	const tabVal = (tab * 5).toString();
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
	class=" w-full border-4 border-transparent border-t-primary-g bg-pastel-w text-primary-b"
>
	<div class="flex justify-between">
		<a href={'/account?id=' + comment.userId}
			><p class="font-bold leading-tight">{comment.User.name}</p></a
		>
		<p>{time}</p>
	</div>
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
				<div class="flex justify-evenly">
					<button
						on:click={() => addVote(true)}
						class="mr-1 align-top text-2xl text-pastel-{colorThumb === true
							? 'p'
							: 'b'} hover:text-pastel-p"
					>
						{#if colorThumb === true}
							<!--thumb up Solid-->
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="icon icon-tabler icon-tabler-arrow-big-up-filled"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path
									d="M10.586 3l-6.586 6.586a2 2 0 0 0 -.434 2.18l.068 .145a2 2 0 0 0 1.78 1.089h2.586v7a2 2 0 0 0 2 2h4l.15 -.005a2 2 0 0 0 1.85 -1.995l-.001 -7h2.587a2 2 0 0 0 1.414 -3.414l-6.586 -6.586a2 2 0 0 0 -2.828 0z"
									stroke-width="0"
									fill="currentColor"
								/>
							</svg>
						{:else}
							<!--thumb up Outline-->
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="icon icon-tabler icon-tabler-arrow-big-up"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path
									d="M9 20v-8h-3.586a1 1 0 0 1 -.707 -1.707l6.586 -6.586a1 1 0 0 1 1.414 0l6.586 6.586a1 1 0 0 1 -.707 1.707h-3.586v8a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"
								/>
							</svg>
						{/if}
					</button>
					<p class="mr-1">{likeNum}</p>
					<button
						on:click={() => addVote(false)}
						class="mr-1 text-2xl text-pastel-{colorThumb === false
							? 'p'
							: 'b'}  hover:text-pastel-p"
					>
						{#if colorThumb === false}
							<!--thumb down solid-->
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="icon icon-tabler icon-tabler-arrow-big-down-filled"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path
									d="M10 2l-.15 .005a2 2 0 0 0 -1.85 1.995v6.999l-2.586 .001a2 2 0 0 0 -1.414 3.414l6.586 6.586a2 2 0 0 0 2.828 0l6.586 -6.586a2 2 0 0 0 .434 -2.18l-.068 -.145a2 2 0 0 0 -1.78 -1.089l-2.586 -.001v-6.999a2 2 0 0 0 -2 -2h-4z"
									stroke-width="0"
									fill="currentColor"
								/>
							</svg>
						{:else}
							<!--thumb down Outline-->
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="icon icon-tabler icon-tabler-arrow-big-down"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path
									d="M15 4v8h3.586a1 1 0 0 1 .707 1.707l-6.586 6.586a1 1 0 0 1 -1.414 0l-6.586 -6.586a1 1 0 0 1 .707 -1.707h3.586v-8a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1z"
								/>
							</svg>
						{/if}
					</button>
				</div>
				<div class="rounded hover:text-pastel-p">
					<button class="flex items-start text-center" on:click={clickSubmitReply}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="icon icon-tabler icon-tabler-message-circle-2"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
						</svg>

						Reply
					</button>
				</div>
				{#if isUser}
					<form action="?/deleteComment" id="delete" method="post" class="ml-auto flex">
						<button type="submit" class="text-2xl hover:text-pastel-p">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="icon icon-tabler icon-tabler-trash"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								stroke-width="2"
								stroke="currentColor"
								fill="none"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M4 7l16 0" />
								<path d="M10 11l0 6" />
								<path d="M14 11l0 6" />
								<path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
								<path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
							</svg>
						</button>
						<input type="hidden" name="deleteCommentId" id="deleteCommentId" value={comment.id} />
						<input
							type="hidden"
							name="deleteCommentUserId"
							id="deleteCommentUserId"
							value={userId}
						/>
					</form>
					<button on:click={clickEdit} type="submit" class="text-2xl hover:text-pastel-p">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="icon icon-tabler icon-tabler-pencil"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
							<path d="M13.5 6.5l4 4" />
						</svg>
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
