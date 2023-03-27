<script>
	import { capitalizeFirstLetter } from '$lib/scripts/Strings.ts';

	export let value, min, max;
	export let rotRange = 2 * Math.PI * 0.8;
	export let pixelRange = 200;
	export let startRotation = -Math.PI * 0.8;
	export let name = 'Pam';

	let startY, startValue;
	$: valueRange = max - min;
	$: rotation = startRotation + ((value - min) / valueRange) * rotRange;

	function clamp(num, min, max) {
		return Math.max(min, Math.min(num, max));
	}

	function pointerMove({ clientY }) {
		const valueDiff = (valueRange * (clientY - startY)) / pixelRange;
		value = clamp(startValue - valueDiff, min, max);
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
</script>

<!-- Knob.svelte -->
<div class="align-center flex flex-col justify-center text-center">
	<p>{capitalizeFirstLetter(name)}</p>
	<div class="knob" style="--rotation: {rotation}" on:pointerdown={pointerDown}>
		<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
			<circle cx="50" cy="50" r="50%" fill="black" />
			<line x1="50" y1="50" x2="50" y2="10" stroke="white" stroke-width="5" />
		</svg>
	</div>
	<p>{Math.round(value)}</p>
</div>

<style lang="postcss">
	.knob {
		//background: conic-gradient(white 0%, white 2%, black 2%, black 98%, white 98%);

		width: 100px;
		user-select: none;
		height: 100px;
		border-radius: 50%;
		transform: rotate(calc(var(--rotation) * 1rad));
	}
</style>
