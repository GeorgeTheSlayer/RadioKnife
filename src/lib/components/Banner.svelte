<style lang="postcss">
	.marquee {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		animation: marquee var(--speed) linear infinite;
	}

	@keyframes marquee {
		0% {
			transform: translateX(100%);
		}
		100% {
			transform: translateX(-100%);
		}
	}
</style>

<script>
	import { browser } from '$app/environment';

	export let quoteBanner = '';
	let deviceWidth = 1512;
	if (browser) {
		deviceWidth = window.innerWidth;
	}

	const defaultConst = 30 / 1512;
	let animationSpeed = defaultConst * deviceWidth;
</script>

<div
	style="--speed: {animationSpeed}s"
	class=" h-9 w-full  border-b-2 border-black bg-pastel-p pt-1.5 text-center "
>
	<div class="marquee">
		<p class="text-base font-bold tracking-wider text-pastel-w ">
			{quoteBanner}
		</p>
	</div>
</div>
