<div class="w-full max-w-xs">
	<h1 class="text-center text-gray-700 text-lg font-bold">Create Page</h1>
	<form action="?/createSynth" method="post" id="upload" enctype="multipart/form-data">
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="title">Title</label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				type="text"
				id="title"
				name="title"
				placeholder="title"
			/>
		</div>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="content">Description</label>
			<input
				class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				type="text"
				id="content"
				name="content"
				placeholder="content"
			/>
		</div>
		<div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="file">File</label>
			<input type="file" name="file" id="file" />
		</div>
		<button type="submit" class="btn-base">submit</button>
	</form>
</div>
