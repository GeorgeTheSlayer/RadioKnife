<h1 class="text-center">Create a New Forum Page</h1>
<form action="?/createTopic" method="post" id="upload" enctype="multipart/form-data">
	<div class="form-group">
		<label for="title">Title</label>
		<input type="text" class="form-control" id="title" name="title" placeholder="Enter title" />
	</div>
	<div class="form-group">
		<label for="content">Content</label>
		<textarea class="form-control" id="content" name="content" rows="3">Fixed</textarea>
	</div>
	<button type="submit" class="btn btn-primary">Submit</button>
</form>
