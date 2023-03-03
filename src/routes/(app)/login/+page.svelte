<form method="POST">
	<hgroup class="text-center">
		<h2 class="text-bold">Login</h2>
		<h3>Welcome back!</h3>
	</hgroup>
	<div class="mt-4">
		<label for="username">Username</label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			type="text"
			id="username"
			name="username"
			required
		/>
	</div>
	<div class="mt-4">
		<label for="password">Password</label>
		<input
			class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
			type="password"
			id="password"
			name="password"
			required
		/>
	</div>

	<button class="btn-base mt-4" type="submit">Login</button>
</form>
<p>Don't have an account? <a href="/register" class=" text-indigo-600">Register</a></p>
