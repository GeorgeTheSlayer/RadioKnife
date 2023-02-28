<script lang="ts">
	import type { Synth } from '@prisma/client';
	import Knob from './Knob.svelte';
	export let cardSynth: Synth;

	const testLink =
		'https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=8aae34cf35df31a592f0bef16e6342ef';
	const link2 = 'https://source.unsplash.com/eCSL1ujUyD4';
</script>

<div class="max-w-sm rounded overflow-hidden shadow-lg">
	<a href={'/synth/view?id=' + cardSynth.id}>
		<img src={link2} alt="Test" class="w-full" />
		<h2>{cardSynth.title}</h2>
		<p>{cardSynth.content}</p>
	</a>
</div>
