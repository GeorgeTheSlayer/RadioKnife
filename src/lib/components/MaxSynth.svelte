<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { createDevice, type IPatcher, type Device, type Parameter } from '@rnbo/js';
	// import Knob from './Knob.svelte';
	// import { WebMidi } from 'webmidi';
	//import type { Synth } from '@prisma/client';
	//import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import Knobbies from './Knobbies.svelte';

	//Various inputs
	let WAContext = window.AudioContext;
	let context = new WAContext();
	export let patcher: IPatcher;
	let device: Device;
	export let isSetup = false;
	export let canEdit = false;
	export let title: string | undefined = '';
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
		}

		params = device.parameters;
		console.log(params[0].index);

		// Bind MIDI to device parameters
		// bindDeviceParametersToMidi(device);

		isSetup = true;
	};

	const flipDurationMs = 300;

	function handleSort(e) {
		params = e.detail.params;
	}

	//This is a cleanup function that runs before the page navigates away
	beforeNavigate(() => {
		context.close();
	});
</script>

<div class="h-full w-full  bg-pastel-w p-8">
	{#if isSetup}
		<div class="mx-auto h-full w-3/4 border-2 border-pastel-b bg-pastel-p shadow-2xl">
			<h1 class=" text-center">{title}</h1>
			<div class=" align-center grid  grid-cols-4 justify-items-center gap-4">
				{#if canEdit}
					<section use:dndzone={{ params }} on:consider={handleSort} on:finalize={handleSort}>
						{#each params as pam (pam.index)}
							<div>{pam.name}</div>
						{/each}
					</section>
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
		<div class="justify-center text-center">
			<button
				class="focus:shadow-outline mt-4 rounded bg-indigo-500 py-2 px-4 font-bold text-white hover:bg-indigo-700 focus:outline-none"
				on:click={setup}>Start the Sound</button
			>
		</div>
	{/if}
</div>
