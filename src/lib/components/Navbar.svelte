<script lang="ts">
	// import Hamburger from './Hamburger.svelte';
	// import Search from './Search.svelte';
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
</svelte:head>

<div class=" grid h-20 w-full grid-cols-3 border-b-2 border-b-black">
	<div class="mx-auto" />
	<ul class=" flex h-full w-fit flex-nowrap items-center gap-x-36 text-center">
		<li class="h-fit w-fit rounded hover:bg-pastel-p "><a href="/docs"><h2>Learn</h2></a></li>
		<li class="h-fit w-fit rounded hover:bg-pastel-p ">
			<a href="/home"><h1 class="text-5xl font-bold">RadioKnife</h1></a>
		</li>
		<li class="h-fit w-fit rounded hover:bg-pastel-p ">
			<a href="/synth/create"><h2>Create</h2></a>
		</li>
		<!--	<li class=" h-3 w-3">m</li>-->
		<!--	<li>a</li>-->
		<!--	<li>a</li>-->
	</ul>
	<ul class="basis-1/7 ml-auto mr-10 flex w-fit grow-0 items-center gap-x-2">
		<li class=" rounded hover:bg-pastel-p">
			{#if isSearch}
				<div transition:slide|local class="w-full border-4 border-b-black text-primary-b">
					<input type="search" name="searchBar" id="searchBar" />
				</div>
			{/if}
			<button on:clic={flipSearch}
				><span class="material-symbols-outlined md-48"> search </span></button
			>
		</li>
		<li class=" rounded hover:bg-pastel-p">
			<a href="/forum" class=""><span class="material-symbols-outlined md-48"> forum </span></a>
		</li>
		<li class=" rounded hover:bg-pastel-p">
			{#if $user}
				<a href={'/account?id=' + userId}
					><span class="material-symbols-outlined md-48"> account_circle </span></a
				>
			{:else}
				<a href="/login"><span class="material-symbols-outlined md-48"> login </span></a>
			{/if}
		</li>
	</ul>
</div>

<!--{#if isFlipped}-->
<!--	<ul transition:slide|local class="m-0 p-0 text-left flex flex-col justify-between  ">-->
<!--		{#if $user}-->
<!--			<li-->
<!--				class=" w-full p-2 bg-primary-b hover:bg-primary-g hover:text-white  transition duration-500 ease-in-out"-->
<!--			>-->
<!--				<a href={'/account?id=' + userId} class="block text-center">{username}</a>-->
<!--			</li>-->
<!--		{:else}-->
<!--			<li-->
<!--				class=" w-full p-2 bg-mono-30 hover:bg-mono-10 hover:text-white  transition duration-500 ease-in-out"-->
<!--			>-->
<!--				<a href="/login" class="block text-center">Login</a>-->
<!--			</li>-->
<!--		{/if}-->
<!--		<li-->
<!--			class=" w-full p-2 bg-mono-30 hover:bg-mono-10 hover:text-white  transition duration-500 ease-in-out"-->
<!--		>-->
<!--			<a href="/room" class="block text-center">Rooms</a>-->
<!--		</li>-->
<!--		<li-->
<!--			class=" w-full p-2 bg-mono-30 hover:bg-mono-10 hover:text-white  transition duration-500 ease-in-out"-->
<!--		>-->
<!--			<a href="/synth/create" class="block text-center">Create</a>-->
<!--		</li>-->
<!--		<li-->
<!--			class=" w-full p-2 bg-mono-30 hover:bg-mono-10 hover:text-white  transition duration-500 ease-in-out"-->
<!--		>-->
<!--			<a href="/forum" class="block text-center">Forum</a>-->
<!--		</li>-->
<!--	</ul>-->

<!--{/if}-->
<style>
	/* Rules for sizing the icon. */
	/*.material-symbols-outlined.md-18 {*/
	/*	font-size: 18px;*/
	/*}*/
	/*.material-symbols-outlined.md-24 {*/
	/*	font-size: 24px;*/
	/*}*/
	/*.material-symbols-outlined.md-36 {*/
	/*	font-size: 36px;*/
	/*}*/
	.material-symbols-outlined.md-48 {
		font-size: 48px;
	}

	/* Rules for using icons as black on a light background. */
	/*.material-symbols-outlined.md-dark {*/
	/*	color: rgba(0, 0, 0, 0.54);*/
	/*}*/
	/*.material-symbols-outlined.md-dark.md-inactive {*/
	/*	color: rgba(0, 0, 0, 0.26);*/
	/*}*/

	/*!* Rules for using icons as white on a dark background. *!*/
	/*.material-icons.md-light {*/
	/*	color: rgba(255, 255, 255, 1);*/
	/*}*/
	/*.material-icons.md-light.md-inactive {*/
	/*	color: rgba(255, 255, 255, 0.3);*/
	/*}*/
</style>
