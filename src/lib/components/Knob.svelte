<style lang="postcss">
	.knob {
		width: fit-content;
		user-select: none;
		height: fit-content;
		border-radius: 50%;
		transform: rotate(calc(var(--rotation) * 1rad));
		margin-left: auto;
		margin-right: auto;
	}
</style>

<script lang="ts">
	//import { capitalizeFirstLetter } from '$lib/scripts/Strings';
	import type { IParameterDescription } from '@rnbo/js';

	export let param: IParameterDescription;
	const value = param.initialValue;
	const min = param.minimum;
	const max = param.maximum;
	let rotRange = 2 * Math.PI * 0.8;
	let startRotation = -Math.PI * 0.8;
	//export let name = 'Pam';

	$: valueRange = max - min;
	$: rotation = startRotation + ((value - min) / valueRange) * rotRange;
</script>

<!-- Knob.svelte -->

<div class="knob h-full w-full" style="--rotation: {startRotation}">
	<svg viewBox="-50 -50 100 100" width="100%" xmlns="http://www.w3.org/2000/svg">
		<circle cx="0%" cy="0%" r="50%" fill="black" />
		<line x1="0%" y1="0%" x2="0%" y2="-50%" stroke="white" stroke-width="5" />
	</svg>
</div>
<!--		<p>{Math.round(value)}</p>-->
