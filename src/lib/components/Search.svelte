<script lang="ts">
	import { fade } from 'svelte/transition';
	export let search = false;

	function onClick() {
		search = !search;
	}
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
	/>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
	/>
</svelte:head>

<button class="stripped" on:click={onClick}>
	{#if !search}
		<span in:fade class="material-symbols-outlined"> search </span>
	{:else}
		<span in:fade class="material-symbols-outlined"> close </span>
	{/if}
</button>

<style lang="scss">
	.stripped {
		all: unset;
		cursor: pointer;
	}
</style>
