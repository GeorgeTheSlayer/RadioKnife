<script lang="ts">
	import type { Synth } from '@prisma/client';
	//import Knob from './Knob.svelte';
	export let cardSynth: Synth;

	const link2 = 'https://source.unsplash.com/eCSL1ujUyD4';
</script>

<div class="h-full w-full overflow-hidden rounded shadow-lg">
	<a href={'/synth/view?id=' + cardSynth.id}>
		<img src={link2} alt="Test" class="w-full" />
		<h2>{cardSynth.title}</h2>
		<p>{cardSynth.content}</p>
		<button class="mt-auto w-full border-2 border-pastel-b text-center">Play Now</button>
	</a>
</div>
