<script lang="ts">
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
			<label class="mb-2 block text-sm font-bold text-gray-700" for="file">File</label>
			<input type="file" name="file" id="file" bind:value={patcher} />
		</div>
		<button type="submit" class="btn-base">submit</button>
	</form>
</div>
