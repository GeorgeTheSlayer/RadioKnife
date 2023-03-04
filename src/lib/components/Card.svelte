<script lang="ts">
	import type { Synth } from '@prisma/client';
	//import Knob from './Knob.svelte';
	export let cardSynth: Synth;

	const link2 = 'https://source.unsplash.com/eCSL1ujUyD4';
</script>

<div class="max-w-sm rounded overflow-hidden shadow-lg">
	<a href={'/synth/view?id=' + cardSynth.id}>
		<img src={link2} alt="Test" class="w-full" />
		<h2>{cardSynth.title}</h2>
		<p>{cardSynth.content}</p>
	</a>
</div>
