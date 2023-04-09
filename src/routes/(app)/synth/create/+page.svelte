<script lang="ts">
	import { getUser } from '@lucia-auth/sveltekit/client';
	import type { PageData } from './$types';

	export let data: PageData;
	const displayName = data.name;
	console.log(displayName);

	const user = getUser();
	let patcher = undefined;

	// const loadPatcher = async () => {};
</script>

<svelte:head>
	<title>Create | RadioKnife</title>
</svelte:head>

<div class=" mx-auto mt-10 h-full w-full max-w-xs items-center border-4 border-pastel-b">
	<h1 class=" mt-4 w-full text-center text-lg font-bold text-gray-700">Create Page</h1>
	<form action="?/createSynth" method="post" id="upload" enctype="multipart/form-data">
		<div class="mb-4">
			<label class="mb-2 block text-sm font-bold text-gray-700" for="title">Title</label>
			<input
				type="text"
				name="title"
				id="title"
				class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
			/>
		</div>
		<div class="mb-4">
			<label class="mb-2 block text-sm font-bold text-gray-700" for="content">Description</label>
			<input
				type="text"
				name="content"
				id="content"
				class="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 text-sm leading-tight text-gray-700 shadow focus:outline-none"
			/>
		</div>
		<div class="mb-4">
			<label class="mb-2 block text-sm font-bold text-gray-700" for="file">File</label>
			<input type="file" name="file" id="file" bind:value={patcher} />
		</div>
		<input type="hidden" name="name" id="name" value={displayName} />
		<button type="submit" class="btn-base">submit</button>
	</form>
</div>
