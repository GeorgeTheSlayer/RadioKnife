<script lang="ts">
	import type { IParameterDescription } from '@rnbo/js';
	import Knob from './Knob.svelte';

	export let uiPatcher: IParameterDescription[];
</script>

<div class="bg-pastel-p">
	This is just a test
	<div class="grid w-fit grid-cols-8">
		{#each uiPatcher as parameter}
			<div class="bg-pastel-p">
				<Knob param={parameter} />
			</div>
		{/each}
	</div>
</div>
