<script lang="ts">
	import MaxSynth from '$lib/components/MaxSynth.svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	//Get Seach Params and show on browser
	const URL = $page.url;
	const synthId: number | undefined = Number(URL.searchParams.get('id'));
</script>

<svelte:head>
	<title>{'RadioKnife Synth: ' + synthId}</title>
</svelte:head>

{#if synthId}
	{#if browser}
		<MaxSynth ID={synthId} />
	{/if}
{/if}
