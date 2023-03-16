<script lang="ts">
	import type { Synth } from '@prisma/client';
	//import Knob from './Knob.svelte';
	export let cardSynth: Synth;

	const link2 = 'https://source.unsplash.com/eCSL1ujUyD4';
</script>

<div class="h-80 w-72 max-w-sm overflow-hidden rounded shadow-lg">
	<a href={'/synth/view?id=' + cardSynth.id}>
		<img src={link2} alt="Test" class="w-full" />
		<h2>{cardSynth.title}</h2>
		<p>{cardSynth.content}</p>
	</a>
</div>
