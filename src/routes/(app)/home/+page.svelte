<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import Card from '$lib/components/Card.svelte';
</script>

<div class="mt-9 grid grid-cols-1 md:grid-cols-3 ">
	<div class=" hidden w-full md:block ">
		<div class=" border-b-2 border-pastel-b"><h2 class="font-bold">Filter</h2></div>
	</div>
	<div class=" flex flex-col items-center gap-14 md:col-span-2 md:grid md:grid-cols-3">
		{#each data.synths as synth}
			<div class="w-fit">
				<Card cardSynth={synth} />
			</div>
		{/each}
	</div>
</div>
