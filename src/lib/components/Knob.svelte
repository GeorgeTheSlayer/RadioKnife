<script lang="ts">
	import { capitalizeFirstLetter } from '$lib/scripts/Strings.ts';
	import type { IParameterDescription } from '@rnbo/js';

	export let param: IParameterDescription;
	const value = param.initialValue;
	const min = param.minimum;
	const max = param.maximum;
	let rotRange = 2 * Math.PI * 0.8;
	let startRotation = -Math.PI * 0.8;
	export let name = 'Pam';

	$: valueRange = max - min;
	$: rotation = startRotation + ((value - min) / valueRange) * rotRange;
</script>

<!-- Knob.svelte -->
<div class="full-size">
	<div class="mx-8 flex flex-col text-center">
		<div class="knob" style="--rotation: {startRotation}">
			<svg viewBox="-50 -50 100 100" width="2rem" height="2rem" xmlns="http://www.w3.org/2000/svg">
				<circle cx="0%" cy="0%" r="50%" fill="black" />
				<line x1="0%" y1="0%" x2="0%" y2="-50%" stroke="white" stroke-width="5" />
			</svg>
		</div>
		<!--		<p>{Math.round(value)}</p>-->
	</div>
</div>

<style lang="postcss">
	.knob {
		width: 100%;
		user-select: none;
		height: 100%;
		border-radius: 50%;
		transform: rotate(calc(var(--rotation) * 1rad));
	}

	.full-size {
		width: 100%;
		height: 100%;
	}
</style>
