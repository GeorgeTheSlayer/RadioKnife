<script lang="ts">
	import { slide } from 'svelte/transition';
	import { beforeNavigate } from '$app/navigation';
	import { getUser } from '@lucia-auth/sveltekit/client';

	let isFlipped = false;
	let isSearch = false;

	const user = getUser();
	const userId = $user?.userId;

	function flipSearch() {
		isSearch = !isSearch;
	}

	function flipper() {
		isFlipped = !isFlipped;
	}

	beforeNavigate(() => {
		isFlipped = false;
		isSearch = false;
	});
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

<div class="block w-screen justify-evenly border-b-2 border-black md:flex">
	<div class="max-w-1/3 hidden md:block md:w-1/6" />
	<ul class="flex h-full w-full flex-nowrap items-center justify-evenly text-center md:w-2/3">
		<li class=" rounded hover:bg-pastel-p">
			<button class="block md:hidden" on:click={flipSearch}>
				{#if isSearch}
					<span class="material-symbols-outlined md-36"> close </span>
				{:else}
					<span class="material-symbols-outlined md-36"> search </span>
				{/if}
			</button>
			<a class="hidden md:block" href="https://Hollandsersen.com/posts/radioknife"><h2>About</h2></a
			>
		</li>
		<li class="h-fit w-fit rounded hover:bg-pastel-p">
			<a data-sveltekit-reload href="/home"><h1 class="text-5xl font-bold">RadioKnife</h1></a>
		</li>
		<li class="rounded hover:bg-pastel-p">
			<button class="block md:hidden" on:click={flipper}>
				{#if isFlipped}
					<span class="material-symbols-outlined md-36"> close </span>
				{:else}
					<span class="material-symbols-outlined md-36"> menu </span>
				{/if}
			</button>
			<a data-sveltekit-reload class="hidden md:block" href="/synth/create"><h2>Create</h2></a>
		</li>
	</ul>
	<ul class=" w-fit ml-auto hidden grow-0 items-center gap-x-2 pr-4 md:flex">
		<li class=" flex rounded hover:bg-pastel-p">
			{#if isSearch}
				<div transition:slide|local class="flex h-full w-full border-4 border-black text-primary-b">
					<input type="search" name="searchBar" id="searchBar" />
					<span class="material-symbols-outlined md-36"> search </span>
				</div>
			{/if}
			<button on:click={flipSearch}>
				{#if isSearch}
					<span class="material-symbols-outlined md-36"> close </span>
				{:else}
					<span class="material-symbols-outlined md-36"> search </span>
				{/if}
			</button>
		</li>
		<li class=" rounded hover:bg-pastel-p">
			<a data-sveltekit-reload href="/forum" class=""
				><span class="material-symbols-outlined md-36"> forum </span></a
			>
		</li>
		<li class=" rounded hover:bg-pastel-p">
			{#if $user}
				<a href={'/account?id=' + userId}
					><span class="material-symbols-outlined md-36"> account_circle </span></a
				>
			{:else}
				<a href="/login"><span class="material-symbols-outlined md-36"> login </span></a>
			{/if}
		</li>
	</ul>
	{#if isSearch}
		<div transition:slide|local class="flex w-full border-2 border-black text-primary-b md:hidden">
			<input class="w-full" type="search" name="searchBar" id="searchBarMobile" />
			<span class="material-symbols-outlined md-36"> search </span>
		</div>
	{/if}
	{#if isFlipped}
		<div transition:slide|local class=" w-full border-t-2 border-t-pastel-b md:hidden">
			<ul class="align-center flex flex-col text-left">
				{#if $user}
					<li class="hover:bg-pastel-p">
						<a href={'/account?id=' + userId}><h1>Account</h1></a>
					</li>
				{:else}
					<li class="hover:bg-pastel-p"><a href="/login"><h1>Login</h1></a></li>
				{/if}
				<li class="hover:bg-pastel-p"><a href="/forum"><h1>Forum</h1></a></li>
				<li class="hover:bg-pastel-p">
					<a class="" href="https://Hollandsersen.com/posts/radioknife"><h1>About</h1></a>
				</li>
			</ul>
		</div>
	{/if}
</div>
