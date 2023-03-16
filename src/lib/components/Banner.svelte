<script>
	export let quoteBanner = '';
</script>

<div class=" h-9 w-full  border-b-2 border-b-black bg-pastel-p pt-1.5 text-center ">
	<div class="marquee">
		<p class="text-base font-bold tracking-wider text-pastel-w">
			{quoteBanner}
		</p>
	</div>
</div>

<style lang="postcss">
	.marquee {
		overflow: hidden;
		white-space: nowrap;
		animation: marquee 30s linear infinite;
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
