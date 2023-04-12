<script lang="ts">
	import { getUser } from '@lucia-auth/sveltekit/client';
	import type { PageData } from './$types';

	export let data: PageData;
	const displayName = data.name;

	const user = getUser();
	let patcher = undefined;

	// const loadPatcher = async () => {};
</script>

<svelte:head>
	<title>Create | RadioKnife</title>
</svelte:head>

<div class="flex h-screen w-full items-center justify-center ">
	<div class="h-1/2 w-1/3 border-4 border-transparent p-8 text-pastel-b md:border-pastel-b ">
		<h1 class=" mt-4 w-full text-center font-bold ">Create Page</h1>
		<form action="?/createSynth" method="post" id="upload" enctype="multipart/form-data">
			<div class="mb-4">
				<label class="mb-2 block  font-bold opacity-75" for="title">Title</label>
				<input
					type="text"
					name="title"
					id="title"
					class="focus:shadow-outline w-full appearance-none border-2 border-pastel-b px-3 py-2 text-sm leading-tight  shadow focus:outline-none"
				/>
			</div>
			<div class="mb-4">
				<label class="mb-2 block font-bold opacity-75" for="content">Description</label>
				<input
					type="text"
					name="content"
					id="content"
					class="focus:shadow-outline w-full appearance-none rounded border-2 border-pastel-b px-3 py-2 text-sm leading-tight shadow focus:outline-none"
				/>
			</div>
			<div class="mb-4">
				<label class="mb-2 block font-bold" for="file">File</label>
				<input type="file" name="file" id="file" bind:value={patcher} />
			</div>
			<input type="hidden" name="name" id="name" value={displayName} />
			<button type="submit" class="btn-base">Submit</button>
		</form>
	</div>
</div>
