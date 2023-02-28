<script lang="ts">
	export let clickz: any;
	export let string = '';
	export let defaultColor = 'mono-30';
	export let hoverColor = 'mono-10';
	export let color = 'white';
	export let typeZ = 'button';
</script>

<button
	class={'bg-' +
		{ defaultColor } +
		'hover:bg-' +
		{ hoverColor } +
		'text-' +
		{ color } +
		'font-bold py-2 px-4 rounded'}
	on:click={clickz}
	type={'submit'}
>
	{string}
</button>
