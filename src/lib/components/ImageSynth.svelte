<script lang="ts">
	import type { IParameterDescription } from '@rnbo/js';
	import Knob from './Knob.svelte';
	export let title = 'Patcher';

	export let uiPatcher: IParameterDescription[];
</script>

<div class=" flex h-full w-full flex-col justify-center  bg-pastel-p">
	<div class="text-center text-2xl">{title}</div>
	<div class="mt-4 grid grid-cols-4">
		{#each uiPatcher as parameter}
			{#if parameter.visible}
				<Knob param={parameter} />
			{/if}
			<!--			<div>-->
			<!--				<Knob param={parameter} />-->
			<!--			</div>-->
		{/each}
	</div>
</div>
