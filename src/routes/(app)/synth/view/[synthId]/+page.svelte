<script lang="ts">
	import MaxSynth from '$lib/components/MaxSynth.svelte';
	import { browser } from '$app/environment';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	// import { page } from '$app/stores';
	// import StarRating from '$lib/components/StarRating.svelte';
	import Chevron from '$lib/components/Chevron.svelte';
	// import ViewEmote from '$lib/components/ViewEmote.svelte';
	// import { license } from '$lib/scripts/Strings';
	// import type { synth_file } from '@prisma/client';
	import type { synth_profile } from '@prisma/client';
	import type { PageData } from './$types';
	import Card from '$lib/components/Card.svelte';
	import { trpc } from '$lib/trpc/client';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { IPatcher } from '@rnbo/js';
	import { invalidate } from '$app/navigation';

	export let data: PageData;
	const synthPatch: IPatcher = Object.create(data?.synth?.file);
	const synthProfile: synth_profile = data?.synth?.synth_profile;
	// const synthPatch: synth_file = data.synth;
	const synthTitle = synthProfile.title;
	const currentUrl = $page.url.pathname;

	let isLiked = false;
	// let isLicense = false;
	let isDescription = false;
	let isDisscussion = true;
	const testMode = false;
	const userId = synthProfile.userId;

	let userName = 'Anonymous';
	//
	onMount(async () => {
		let tempName = await trpc($page).getUsernameFromId.query({ userId: userId });
		userName = tempName.username;
		// userName = tempName.username;
	});
</script>

<svelte:head>
	<title>{synthTitle + ' | RadioKnife'}</title>
</svelte:head>

<div class="w-max-full h-screen px-2">
	<div class=" min-h-4/6 mt-4 flex h-4/6 flex-col gap-x-2 md:flex-row">
		<div class="mx-auto flex h-full w-full max-w-7xl flex-col  ">
			<div class="md:hidden ">
				<a href="/account/{userId}"
					><h2 class="w-fit font-bold text-pastel-p hover:text-pastel-c">
						{userName}
					</h2>
				</a>
				<h1 class=" font-bold">{synthTitle}</h1>
			</div>
			{#if browser}
				<MaxSynth patcher={synthPatch} title={synthTitle} canEdit={testMode} />
			{/if}
			<div class="flex w-full border-b-2 border-pastel-b md:hidden">
				<Chevron bind:isExpanded={isDescription} />
				<div class=" pb-1"><h2 class="font-bold">Description</h2></div>
			</div>
			{#if isDescription}
				<p>
					{synthProfile.content}
				</p>
			{/if}
			<div class="flex w-full border-b-2 border-pastel-b md:hidden">
				<Chevron bind:isExpanded={isDisscussion} />
				<div class=" pb-1"><h2 class="font-bold">Comments</h2></div>
			</div>
		</div>
		<div class="mr-auto hidden w-full max-w-md flex-col px-2 md:block ">
			<a href="/account/{userId}"
				><h2 class="w-fit font-bold text-pastel-p hover:text-pastel-c">
					{userName}
				</h2></a
			>
			<h1 class=" font-bold">{synthTitle}</h1>
			<div class="align-center flex gap-x-2 align-text-bottom">
				<!--				<StarRating />-->
				<!--				<h2 class="opacity-50">100 Ratings</h2>-->
				<!--				<ViewEmote />-->
			</div>
			<!--			<div class="flex gap-x-2">-->
			<!--				<svg-->
			<!--					xmlns="http://www.w3.org/2000/svg"-->
			<!--					class="icon icon-tabler icon-tabler-heart-filled text-pastel-p"-->
			<!--					width="24"-->
			<!--					height="24"-->
			<!--					viewBox="0 0 24 24"-->
			<!--					stroke-width="2"-->
			<!--					stroke="currentColor"-->
			<!--					fill="none"-->
			<!--					stroke-linecap="round"-->
			<!--					stroke-linejoin="round"-->
			<!--				>-->
			<!--					<path stroke="none" d="M0 0h24v24H0z" fill="none" />-->
			<!--					<path-->
			<!--						d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z"-->
			<!--						stroke-width="0"-->
			<!--						fill="currentColor"-->
			<!--					/>-->
			<!--				</svg>-->
			<!--				<h2 class="text-primary-b opacity-50">1000 Likes</h2>-->
			<!--			</div>-->

			<p>8.4kb</p>
			<div class="mt-10 flex border-b-2 border-pastel-b pb-4 ">
				<button
					class="border-2 border-pastel-b bg-pastel-p px-10 hover:bg-pastel-c hover:text-primary-w"
					>Play Now</button
				>
				<button on:click={() => (isLiked = !isLiked)} class="ml-2">
					{#if !isLiked}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="icon icon-tabler icon-tabler-heart hover:text-pastel-p"
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
								d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
							/>
						</svg>
					{:else}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="icon icon-tabler icon-tabler-heart-filled text-pastel-p hover:text-pastel-c"
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
								d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z"
								stroke-width="0"
								fill="currentColor"
							/>
						</svg>
					{/if}
				</button>
			</div>

			<div class="flex w-full border-b-2 border-pastel-b">
				<Chevron bind:isExpanded={isDescription} />
				<div class=" pb-1"><h2 class="font-bold">Description</h2></div>
			</div>
			{#if isDescription}
				<p>
					{synthProfile.content}
				</p>
			{/if}
			<div class=" flex w-full border-b-2 border-pastel-b">
				<Chevron bind:isExpanded={isDisscussion} />
				<div class=" pb-1"><h2 class="font-bold">Comments</h2></div>
			</div>
		</div>
	</div>
</div>
<div class="mx-4 -mt-80">
	<div class="border-b-2 border-pastel-b p-4 pb-1">
		<h2 class="text-center font-bold">RELATED UNITS</h2>
	</div>
	<div
		class="mt-4 grid h-2/5 w-full grid-cols-1 justify-evenly gap-y-4 gap-x-20 overflow-hidden p-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
	>
		{#each data.recs as synth}
			<div class="">
				<Card cardSynth={synth} />
			</div>
		{/each}
	</div>
</div>
