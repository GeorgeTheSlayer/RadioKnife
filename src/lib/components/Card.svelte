<script lang="ts">
	import type { synth_profile } from '@prisma/client';
	import MaxSynth from './MaxSynth.svelte';
	import ImageSynth from './ImageSynth.svelte';
	//import Knob from './Knob.svelte';
	export let cardSynth: synth_profile;
	const cardArrary = cardSynth.ui.value.ui;
	console.log(cardSynth);

	// const link2 = 'https://source.unsplash.com/eCSL1ujUyD4';
</script>

<div class="h-full w-full overflow-hidden rounded shadow-lg">
	<a href={'/synth/view/' + cardSynth.file_id}>
		<!--		<img src={link2} alt="Test" class="w-full" />-->
		<ImageSynth uiPatcher={cardArrary} />
		<h2>{cardSynth.title}</h2>
		<p>{cardSynth.content}</p>
		<button class="mt-auto w-full border-2 border-pastel-b text-center">Play Now</button>
	</a>
</div>
