<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	import Card from '$lib/components/Card.svelte';
</script>

<h1 class="text-center">Home</h1>
<div class="grid grid-cols-4 mt-4">
	{#each data.synths as synth}
		<div class="m-4">
			<Card cardSynth={synth} />
		</div>
	{/each}
</div>
