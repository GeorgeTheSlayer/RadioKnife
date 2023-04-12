<script lang="ts">
	import type { PageData } from './$types';
	import Chevron from '$lib/components/Chevron.svelte';
	import { slide } from 'svelte/transition';
	import Card from '$lib/components/Card.svelte';
	export let data: PageData;

	const profiles = data.profiles;

	let isCatsOpen = false;
	let isManOpen = true;
</script>

<svelte:head>
	<title>RadioKnife</title>
</svelte:head>

<div class="mt-9 flex h-screen w-screen justify-center">
	<div class="max-w-1/3 ml-2 hidden w-2/5 flex-col md:block ">
		<div class=" align-center flex gap-x-2 border-b-2 border-pastel-b pb-1">
			<h2 class="font-bold">
				Sort By: <select class="border-2 border-pastel-b text-center hover:bg-pastel-c">
					<option value="view">Most Viewed</option>
					<option value="like">Most Liked</option>
					<option value="nameabc">Name (A-Z)</option>
					<option value="namecba">Name (Z-A)</option>
				</select>
			</h2>
		</div>
		<div class="border-b-2 border-pastel-b pb-4">
			<div class="mt-4 flex justify-between">
				<h2 class="font-bold">Categories:</h2>
				<Chevron bind:isExpanded={isCatsOpen} />
			</div>
			{#if isCatsOpen}
				<div transition:slide|local class="justify-normal grid w-fit grid-cols-2 gap-y-1 ">
					<input type="checkbox" id="cat1" name="cat1" value="Synth" />
					<label class="hover:bg-pastel-p" for="cat1">
						Additive <span class="opacity-50">(10)</span></label
					>
					<input type="checkbox" id="cat2" name="cat2" value="Synth" />
					<label class="hover:bg-pastel-p" for="cat2">
						Subtractive <span class="opacity-50">(10)</span>
					</label>
					<input type="checkbox" id="cat3" name="cat3" value="Synth" />
					<label class="hover:bg-pastel-p" for="cat3">
						West Coast <span class="opacity-50">(10)</span></label
					>
					<input type="checkbox" id="cat4" name="cat4" value="Synth" />
					<label class="hover:bg-pastel-p" for="cat4">
						East Coast <span class="opacity-50">(10)</span></label
					>
					<input type="checkbox" id="cat5" name="cat5" value="Synth" />
					<label class="hover:bg-pastel-p" for="cat5">
						Drone <span class="opacity-50">(10)</span></label
					>
					<input type="checkbox" id="cat6" name="cat6" value="Synth" />
					<label class="hover:bg-pastel-p" for="cat6">
						Lofi <span class="opacity-50">(10)</span></label
					>
				</div>
			{/if}
		</div>
		<div class="border-b-2 border-pastel-b pb-4">
			<div class="mt-4 flex justify-between">
				<h2 class="font-bold">Manufacturer:</h2>
				<Chevron bind:isExpanded={isManOpen} />
			</div>
			{#if isManOpen}
				<div transition:slide|local class="justify-normal grid w-fit grid-cols-2 gap-y-1">
					{#each profiles as profile}
						<input type="checkbox" id={profile.name} name="cat1" value="Synth" />
						<label for={profile.name}>
							{profile.name}
							<span class="opacity-50">{'(' + profile._count.SynthProfile + ')'}</span></label
						>
					{/each}
				</div>
			{/if}
		</div>
	</div>
	<div class=" mr-6 h-2/5 w-full gap-8 md:ml-12 md:grid md:grid-cols-3">
		{#each data.synths as synth}
			<div class="w-full">
				<Card cardSynth={synth} />
			</div>
		{/each}
	</div>
</div>
