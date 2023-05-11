<style lang="postcss">
	.knob {
		//background: conic-gradient(white 0%, white 2%, black 2%, black 98%, white 98%);

		width: fit-content;
		user-select: none;
		height: fit-content;
		border-radius: 50%;
		transform: rotate(calc(var(--rotation) * 1rad));
		touch-action: none;
	}
</style>

<script lang="ts">
	import { capitalizeFirstLetter } from '$lib/scripts/Strings';
	import { onDestroy } from 'svelte';

	export let value: number, min: number, max: number;
	export let rotRange = 2 * Math.PI * 0.8;
	export let pixelRange = 200;
	export let startRotation = -Math.PI * 0.8;
	export let name = 'Pam';

	let startY: number, startValue: number;
	$: valueRange = max - min;
	$: rotation = startRotation + ((value - min) / valueRange) * rotRange;

	function clamp(num: number, min: number, max: number) {
		return Math.max(min, Math.min(num, max));
	}

	function pointerMove({ clientY }) {
		const valueDiff = (valueRange * (clientY - startY)) / pixelRange;
		value = clamp(startValue - valueDiff, min, max);
		//console.log(value);
	}

	function pointerDown({ clientY }) {
		startY = clientY;
		startValue = value;

		window.addEventListener('pointermove', pointerMove);
		window.addEventListener('pointerup', pointerUp);
	}

	function pointerUp() {
		window.removeEventListener('pointermove', pointerMove);
		window.removeEventListener('pointerup', pointerUp);
	}

	onDestroy(() => {
		window.removeEventListener('pointermove', pointerMove);
		window.removeEventListener('pointerup', pointerUp);
	});
</script>

<!-- Knob.svelte -->
<div class="align-center flex flex-col justify-center text-center">
	<p>{capitalizeFirstLetter(name)}</p>
	<div class="knob h-full w-full" style="--rotation: {rotation}" on:pointerdown={pointerDown}>
		<svg viewBox="-50 -50 100 100" width="100%" xmlns="http://www.w3.org/2000/svg">
			<circle cx="0%" cy="0%" r="50%" fill="black" />
			<line x1="0%" y1="0%" x2="0%" y2="-50%" stroke="white" stroke-width="5" />
		</svg>
	</div>
	<p>{Math.round(value)}</p>
</div>
