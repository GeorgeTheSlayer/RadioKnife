<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { synth_profile } from '@prisma/client';
	//import { goto } from '$app/navigation';
	/** @type {import('./$types').PageData} */
	import { capitalizeFirstLetter } from '$lib/scripts/Strings';
	import CommentCard from '$lib/components/CommentCard.svelte';

	export let data;

	const synthPosts: synth_profile[] = data.posts as const;
	const userId = data.userId as const;
	const userName = data.userName as const;

	const img = 'https://api.dicebear.com/6.x/notionists/svg?seed=' + userId;

	let isPosts = true;
	let isComments = false;
	let isLikes = false;
	let isThreads = false;
</script>

<svelte:head>
	<title>Account | RadioKnife</title>
</svelte:head>

<img
	src={img}
	alt="user avatar"
	class=" mx-auto mt-2 h-32 w-32 rounded-full border-4 border-pastel-b"
/>

<h1 class="mt-2 text-center">{capitalizeFirstLetter(userName) + "'s Account"}</h1>

<div class="mx-4 mt-4 flex  justify-evenly border-b-4 border-pastel-b pb-2 text-center">
	<button
		class="border-2 border-pastel-b bg-pastel-p px-10 hover:bg-pastel-c hover:text-primary-w"
		on:click={() => {
			isPosts = true;
			isComments = false;
			isLikes = false;
		}}>Posts</button
	>
	<button
		class="border-2 border-pastel-b bg-pastel-p px-10 hover:bg-pastel-c hover:text-primary-w"
		on:click={() => {
			isPosts = false;
			isComments = true;
			isLikes = false;
		}}>Comments</button
	>
	<button
		class="border-2 border-pastel-b bg-pastel-p px-10 hover:bg-pastel-c hover:text-primary-w"
		on:click={() => {
			isPosts = false;
			isComments = false;
			isLikes = true;
		}}>Likes</button
	>
</div>

<div class="h-screen w-screen">
	{#if isPosts}
		{#if synthPosts.length === 0}
			<div class="mt-4 text-center">
				<p>No posts yet</p>
			</div>
		{:else}
			<div class="mx-4 grid h-3/5 grid-cols-3">
				{#each synthPosts as synth}
					<div class="m-4">
						<Card cardSynth={synth} />
					</div>
				{/each}
			</div>
		{/if}
	{/if}

	{#if isComments}
		{#if data.comments.length === 0}
			<div class="mt-4 text-center">
				<p>No comments yet</p>
			</div>
		{:else}
			<div class=" mx-4 grid grid-cols-4">
				{#each data.comments as comment}
					<div class="m-4">
						<!--					<CommentCard {comment} tab={0} />-->
						{comment.content}
					</div>
				{/each}
			</div>
		{/if}
	{/if}

	{#if isLikes}
		<div class="mt-4 text-center">
			<p>No likes yet</p>
		</div>
	{/if}
</div>

<!--<form-->
<!--	action="/logout"-->
<!--	method="post"-->
<!--	class="focus:shadow-outline mt-4 rounded bg-indigo-500 py-2 px-4 font-bold text-white hover:bg-indigo-700 focus:outline-none"-->
<!--&gt;-->
<!--	<button class="text-center"> Logout </button>-->
<!--</form>-->
