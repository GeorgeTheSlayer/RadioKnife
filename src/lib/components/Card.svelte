<script lang="ts">
	import type { synth_profile } from '@prisma/client';
	//import MaxSynth from './MaxSynth.svelte';
	import ImageSynth from './ImageSynth.svelte';
	//import Knob from './Knob.svelte';
	export let cardSynth: synth_profile;
	const cardArrary = cardSynth.ui.value.ui;

	// const link2 = 'https://source.unsplash.com/eCSL1ujUyD4';

	const link = '/synth/view/' + cardSynth.file_id;

	let isLiked = false;
</script>

<div class="block h-full w-full max-w-sm border-2 border-pastel-b shadow-lg">
	<!--		<img src={link2} alt="Test" class="w-full" />-->
	<a
		href={link}
		class="flex h-3/4 items-center justify-center border-b-2 border-pastel-b hover:opacity-50"
	>
		<div class="m-8 h-3/4 shadow-lg">
			<ImageSynth uiPatcher={cardArrary} title={cardSynth.title} />
		</div>
	</a>
	<div class="max-h-1/8 flex h-fit w-auto min-w-fit bg-pastel-w p-1 ">
		<a href={link} class="w-fit truncate hover:text-pastel-p">
			<h2>{cardSynth.title}</h2>
			<p class="opacity-50">{cardSynth.content}</p>
		</a>
		<div class="ml-auto w-fit overflow-ellipsis">
			<button on:click={() => (isLiked = !isLiked)}>
				{#if isLiked}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="icon icon-tabler icon-tabler-heart-filled text-pastel-p hover:text-pastel-c"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path
							d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z"
							stroke-width="0"
							fill="currentColor"
						/>
					</svg>
				{:else}
					<!--                    Not Liked-->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="icon icon-tabler icon-tabler-heart text-pastel-b hover:text-pastel-p"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path
							d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
						/>
					</svg>
				{/if}
			</button>
			<p class="text-center opacity-50">0</p>
		</div>
	</div>
	<!--	<a href={link}>-->
	<!--		<button-->
	<!--			class="h-1/8 mt-auto w-full border-t-2 border-pastel-b text-center text-2xl hover:bg-pastel-p  "-->
	<!--			>Play Now</button-->
	<!--		>-->
	<!--	</a>-->
</div>
