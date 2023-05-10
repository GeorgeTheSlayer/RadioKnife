<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import {
		createDevice,
		type IPatcher,
		type Device,
		type Parameter,
		type IParameterDescription
	} from '@rnbo/js';
	// import Knob from './Knob.svelte';
	// import { WebMidi } from 'webmidi';
	//import type { Synth } from '@prisma/client';
	//import { flip } from 'svelte/animate';
	// import { browser } from '$app/environment';
	import { dndzone } from 'svelte-dnd-action';
	import Knobbies from './Knobbies.svelte';
	import { onDestroy } from 'svelte';
	import type ImageSynth from './ImageSynth.svelte';

	//Various inputs
	let WAContext = window.AudioContext || window.webkitAudioContext;
	let context = new WAContext();
	export let patcher: IPatcher | undefined = undefined;

	let device: Device;
	export let isSetup = false;
	export let canEdit = false;
	export let title: string | undefined = '';
	export const SynthPreview: ImageSynth | undefined = undefined;
	let params: Parameter[] = [];

	// let Inputs: string[] = [];
	// let currentInput = '';
	// let midiDevice;

	export const playNow = () => {
		if (!isSetup) {
			setup();
		}
	};

	export const setup = async () => {
		//console.log(MAXPATCH);
		// WebMidi.enable()
		// 	.then(onEnabled)
		// 	.catch((err) => alert(err));
		if (!patcher) {
			console.log('No patcher');
			return;
		}

		device = await createDevice({ context, patcher });

		if (!canEdit) {
			// This connects the device to audio output, but you may still need to call context.resume()
			// from a user-initiated function.
			device.node.connect(context.destination);

			let presets = patcher.presets || [];
			if (presets.length < 1) {
				console.log('No presets defined');
			} else {
				const preset = presets[0];
				device.setPreset(preset!.preset);
				console.log('Loaded Preset 0');
			}
			params = device.parameters;
			context.resume();
		}

		// Bind MIDI to device parameters
		// bindDeviceParametersToMidi(device);

		isSetup = true;
	};

	const flipDurationMs = 300;

	function handleSort(e) {
		params = e.detail.params;
	}

	// onDestroy(async () => {
	// 	if (context.state === 'running' || context.state === 'suspended') {
	// 		await context.close();
	// 	}
	// });

	// //This is a cleanup function that runs before the page navigates away
	// beforeNavigate(async () => {
	// 	if (context.state === 'running' || context.state === 'suspended') {
	// 		await context.close();
	// 	}
	// });
</script>

<div class="h-full bg-pastel-w ">
	{#if isSetup}
		<div class="h-full border-2 border-pastel-b bg-pastel-p shadow-2xl">
			<h1 class=" text-center">{title}</h1>
			<div class=" align-center grid  grid-cols-4 justify-items-center gap-4">
				{#if canEdit}
					<!-- <section use:dndzone={{ params }} on:consider={handleSort} on:finalize={handleSort}>
						{#each params as pam (pam.index)}
							<div>{pam.name}</div>
						{/each}
					</section> -->
				{:else}
					{#each device.parameters as pam}
						{#if pam.type == 0}
							<!--					<Knob min={pam.min} max={pam.max} name={pam.displayName} bind:value={pam.value} />-->
							<Knobbies
								bind:value={pam.value}
								max={pam.max}
								min={pam.min}
								name={pam.displayName}
								pixelRange={200}
							/>
						{:else if pam.type == 5}
							<!--					<Knob min={pam.min} max={pam.max} name={pam.displayName} bind:value={pam.value} />-->
							<Knobbies bind:value={pam.value} max={pam.max} min={pam.min} pixelRange={200} />
						{/if}
					{/each}
				{/if}
			</div>
		</div>
	{:else}
		<div
			class=" flex h-full items-center justify-center border-2 border-pastel-b bg-pastel-p text-center"
		>
			<button
				class="focus:shadow-outline focus:outline-none mt-4 border-2 border-pastel-b bg-pastel-w py-2 px-4  font-bold hover:bg-pastel-c"
				on:click={setup}>Start the Sound</button
			>
		</div>
	{/if}
</div>
