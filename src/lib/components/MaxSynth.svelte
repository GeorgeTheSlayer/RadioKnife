<script lang="ts">
	import { beforeNavigate } from '$app/navigation';
	import { trpc } from '$lib/trpc/client';
	import { createDevice, type IPatcher, type Device } from '@rnbo/js';
	import Knob from './Knob.svelte';
	import { WebMidi } from 'webmidi';
	import type { Input } from 'postcss';
	export let ID: number | undefined;

	//Various inputs
	let WAContext = window.AudioContext;
	let context = new WAContext();
	let device: Device;
	let isSetup = false;
	let title: string | undefined = '';
	let Inputs: string[] = [];
	let currentInput: string = '';
	let midiDevice;

	const setup = async () => {
		//console.log(MAXPATCH);
		WebMidi.enable()
			.then(onEnabled)
			.catch((err) => alert(err));
		const fullBodied = await trpc.getSynthById.query(ID!);
		const patcher: IPatcher = JSON.parse(JSON.stringify(fullBodied.synths?.file))!;
		title = fullBodied.synths?.title;

		device = await createDevice({ context, patcher });

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

		// Bind MIDI to device parameters
		// bindDeviceParametersToMidi(device);

		isSetup = true;
	};

	function bindDeviceParametersToMidi(device: Device) {
		const parameters = device.parameters;
		const midi = WebMidi.inputs[0];
		if (midi) {
			midi.addListener('controlchange', (e) => {
				const param = parameters.find((p) => p.id === e.controller.number);
				if (param) {
					param.value = e.value;
				}
			});
		}
	}

	function setMidiDevice() {
		const midi = WebMidi.getInputByName(currentInput);
		if (midi) {
			midiDevice = midi;
			midiDevice.addListener('controlchange', (e) => {
				//console.log(e.message.data[0]);
				const currentCtrl: number = e.message.data[1] - 1;
				const value = e.rawValue! / 127;
				if (device.parameters[currentCtrl]) {
					device.parameters[currentCtrl].value = device.parameters[currentCtrl].max * value;
				}
			});
		}
	}

	function onEnabled() {
		// Inputs
		WebMidi.inputs.forEach((input) => console.log(input.manufacturer, input.name));
		Inputs = WebMidi.inputs.map((input) => input.name);
		// console.log(Inputs);

		// Outputs
		WebMidi.outputs.forEach((output) => console.log(output.manufacturer, output.name));
	}

	//This is a cleanup function that runs before the page navigates away
	beforeNavigate(() => {
		context.close();
	});
</script>

{#if isSetup}
	<div class="p-8 bg-indigo-500 w-50%">
		<h1 class=" text-center">{title}</h1>
		<select name="midi" id="midi" bind:value={currentInput} on:change={setMidiDevice}>
			{#each Inputs as input}
				<option value={input}>{input}</option>
			{/each}
		</select>
		<div class=" grid grid-cols-3 gap-4 justify-items-center">
			{#each device.parameters as pam}
				{#if pam.type == 0}
					<Knob min={pam.min} max={pam.max} name={pam.displayName} bind:value={pam.value} />
				{:else if pam.type == 5}
					<Knob min={pam.min} max={pam.max} name={pam.displayName} bind:value={pam.value} />
				{/if}
			{/each}
		</div>
	</div>
{:else}
	<div class="text-center">
		<button
			class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
			on:click={setup}>Start the Sound</button
		>
	</div>
{/if}
