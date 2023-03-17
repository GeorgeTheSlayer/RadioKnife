<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import Card from '$lib/components/Card.svelte';
</script>

<svelte:head>
	<title>RadioKnife</title>
</svelte:head>

<div class="mt-9 flex w-screen justify-center">
	<div class="max-w-1/3 hidden w-1/4 md:block ">
		<div class=" border-b-2 border-pastel-b"><h2 class="font-bold">Filter</h2></div>
	</div>
	<div class=" gap-8 md:ml-12 md:grid md:grid-cols-3">
		{#each data.synths as synth}
			<div class="mt-8 w-fit md:mt-0">
				<Card cardSynth={synth} />
			</div>
		{/each}
	</div>
</div>
