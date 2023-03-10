<script lang="ts">
</script>

<form method="POST">
	<hgroup>
		<h2>Register</h2>
		<h3>To post articles, you'll need an account.</h3>
	</hgroup>

	<label for="name">Name</label>
	<input type="text" id="name" name="name" class="text-primary-b" required />

	<label for="username">Username</label>
	<input type="text" id="username" name="username" class="text-primary-b" required />

	<label for="password">Password</label>
	<input type="password" id="password" name="password" class="text-primary-b" required />

	<button type="submit" class="btn-base">Register</button>
</form>
<p>Already have an account? <a href="/login">Login</a></p>
