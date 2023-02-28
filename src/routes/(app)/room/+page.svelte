<script lang="ts">
	import MaxSynth from '$lib/components/MaxSynth.svelte';
	import { z } from 'zod';

	type Synth = {
		id: number;
	};

	let synthList: Array<Synth> = [];
	let newID: string;
	const mySchema = z.number();

	function addSynth() {
		const newInput = Number(newID);
		synthList = synthList.concat({ id: newInput });
	}
</script>

<h1>Testing</h1>
{#each synthList as synth}
	<MaxSynth ID={synth.id} />
{/each}
<input bind:value={newID} />
<button on:click={addSynth}>Submit</button>
