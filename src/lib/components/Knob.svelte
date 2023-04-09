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
	<div class="align-center flex flex-col justify-center text-center">
		<div class="knob" style="--rotation: {rotation}">
			<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
				<circle cx="50" cy="50" r="50" fill="black" />
				<line x1="50" y1="50" x2="50" y2="10%" stroke="white" stroke-width="5" />
			</svg>
		</div>
		<p>{Math.round(value)}</p>
	</div>
</div>

<style lang="postcss">
	.knob {
		//background: conic-gradient(white 0%, white 2%, black 2%, black 98%, white 98%);

		width: 100%;
		user-select: none;
		height: 100%;
		border-radius: 50%;
		transform: rotate(calc(var(--rotation) * 1rad));
	}

	.full-size {
		width: 10%;
		height: 10%;
	}
</style>
