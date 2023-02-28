<script lang="ts">
	//180* == 3rem
	export let name = 'Default';
	export let value = 0;
	export let min = 0;
	export let max = 100;
	let degValue = 120;
	let x = '0';
	let y = '-0.125';
	let degs = 45;
	let moving = false;

	function degToRad(input: number) {
		return input * (Math.PI / 180);
	}

	function onMouseDown() {
		moving = true;
	}

	//WHen value changes, update the dial
	$: {
		degValue = ((value - min) / (max - min)) * 300 + 120;
		const numDegs = Math.abs(degValue % 360);
		degs = numDegs;
		x = (Math.sin(degToRad(numDegs + 90)) * 1.5 + 1.5).toString();
		y = (Math.sin(degToRad(numDegs)) * 1.5 - 0.125).toString();
	}

	function onMouseMove(e: any) {
		if (moving) {
			degValue -= e.movementY;

			if (degValue < 120) degValue = 120;
			if (degValue > 420) degValue = 420;
			value = ((degValue - 120) / 300) * (max - min) + min;
		}
		const numDegs = Math.abs(degValue % 360);
		degs = numDegs;
		x = (Math.sin(degToRad(numDegs + 90)) * 1.5 + 1.5).toString();
		y = (Math.sin(degToRad(numDegs)) * 1.5 - 0.125).toString();
		//console.log('X:' + x + ', Y' + y + ', Degs ' + degs);
	}

	function onMouseUp() {
		moving = false;
	}
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,200"
	/>
</svelte:head>

<div
	class="flex flex-col justify-evenly h-fit w-fit  border-4 border-black {moving
		? ' bg-indigo-900'
		: 'bg-white'}"
	on:mousedown={onMouseDown}
>
	<p class="text-center">{name}</p>
	<!-- background -->
	<!-- pt-[1.875rem] h-[3.125rem]  -->
	<div class="m-0 pt-7 h-20 w-20  cursor-pointer">
		<!-- pointer -->
		<span
			class="h-1 w-8 bg-black inline-block"
			style="transform: translate({x}rem, {y}rem) rotate({degs}deg)"
		/>
		<!-- dot -->
		<span class="inline-block h-2 w-2 bg-black rounded" />
	</div>
	<!-- <p>{value}</p>
	<p>Deg: {degs}</p>
	<p>X: {x}</p>
	<p>Y: {y}</p> -->
	<!-- <div class="transform rotate-{degs.toString()} transition-transform w-24 h-24">
		<img src="/knob1.svg" alt="knob-img" class="w-24 h-24" />
	</div> -->
	<p class="text-center">{Math.round(value)}</p>
</div>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />
