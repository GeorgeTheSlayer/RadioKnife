<svelte:head>
	<title>RadioKnife Create Synth</title>
</svelte:head>

<div class="w-full max-w-xs">
	<h1 class="text-center text-lg font-bold text-gray-700">Create Page</h1>
	<form action="?/createSynth" method="post" id="upload" enctype="multipart/form-data">
		<div class="mb-4">
			<label class="mb-2 block text-sm font-bold text-gray-700" for="title">Title</label>
			<input
				class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
				type="text"
				id="title"
				name="title"
				placeholder="title"
			/>
		</div>
		<div class="mb-4">
			<label class="mb-2 block text-sm font-bold text-gray-700" for="content">Description</label>
			<input
				class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
				type="text"
				id="content"
				name="content"
				placeholder="content"
			/>
		</div>
		<div class="mb-4">
			<label class="mb-2 block text-sm font-bold text-gray-700" for="file">File</label>
			<input type="file" name="file" id="file" />
		</div>
		<button type="submit" class="btn-base">submit</button>
	</form>
</div>
