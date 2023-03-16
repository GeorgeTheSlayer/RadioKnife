<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import Card from '$lib/components/Card.svelte';
</script>

<div class="mt-9 grid grid-cols-3">
	<div class=" w-full ">
		<div class=" border-b-2 border-pastel-b"><h2 class="font-bold">Filter</h2></div>
	</div>
	<div class="col-span-2 grid grid-cols-3 gap-14">
		{#each data.synths as synth}
			<div class="">
				<Card cardSynth={synth} />
			</div>
		{/each}
	</div>
</div>
