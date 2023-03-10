<script lang="ts">
	import Hamburger from './Hamburger.svelte';
	import Search from './Search.svelte';
	import { slide } from 'svelte/transition';
	import { beforeNavigate } from '$app/navigation';
	import { getUser } from '@lucia-auth/sveltekit/client';

	let isFlipped = false;
	let isSearch = false;
	$: isFlipped == true, (isSearch = false);

	const user = getUser();
	const username = $user?.username;
	const userId = $user?.userId;

	beforeNavigate(() => {
		isFlipped = false;
		isSearch = false;
	});
</script>

<ul class="m-0 p-4 flex justify-between items-center">
	<li class="nav-search"><Search bind:search={isSearch} /></li>
	<li class="logo"><a href="/"><span class="font-mono text-xl">RadioKnife</span></a></li>
	<li class="nav-burger"><Hamburger bind:flipped={isFlipped} /></li>
</ul>
{#if isSearch}
	<div transition:slide|local class="m-0 p-4">
		<input type="search" name="searchBar" id="searchBar" />
	</div>
{/if}
{#if isFlipped}
	<ul transition:slide|local class="m-0 p-0 text-left flex flex-col justify-between  ">
		{#if $user}
			<li
				class=" w-full p-2 bg-primary-b hover:bg-primary-g hover:text-white  transition duration-500 ease-in-out"
			>
				<a href={'/account?id=' + userId} class="block text-center">{username}</a>
			</li>
		{:else}
			<li
				class=" w-full p-2 bg-mono-30 hover:bg-mono-10 hover:text-white  transition duration-500 ease-in-out"
			>
				<a href="/login" class="block text-center">Login</a>
			</li>
		{/if}
		<li
			class=" w-full p-2 bg-mono-30 hover:bg-mono-10 hover:text-white  transition duration-500 ease-in-out"
		>
			<a href="/room" class="block text-center">Rooms</a>
		</li>
		<li
			class=" w-full p-2 bg-mono-30 hover:bg-mono-10 hover:text-white  transition duration-500 ease-in-out"
		>
			<a href="/synth/create" class="block text-center">Create</a>
		</li>
		<li
			class=" w-full p-2 bg-mono-30 hover:bg-mono-10 hover:text-white  transition duration-500 ease-in-out"
		>
			<a href="/forum" class="block text-center">Forum</a>
		</li>
	</ul>
{/if}
