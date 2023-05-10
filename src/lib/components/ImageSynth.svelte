<script lang="ts">
	import type { IParameterDescription } from '@rnbo/js';
	import Knob from './Knob.svelte';
	export let title = 'Patcher';

	export let uiPatcher: IParameterDescription[];
</script>

<div class="ml-auto mr-auto max-h-full max-w-full overflow-hidden bg-pastel-p p-4">
	<div class="text-center text-2xl">{title}</div>
	<div class="max-w-fit mt-4 grid grid-cols-4 gap-2">
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
