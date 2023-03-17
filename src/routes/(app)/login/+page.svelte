<svelte:head>
	<title>RadioKnife Login Page</title>
</svelte:head>

<form class="flex h-full w-full flex-col  border-pastel-b" method="POST">
	<div class="text-center">
		<h1 class="text-bold">Login</h1>
		<h3>Welcome back!</h3>
	</div>
	<div class="mt-4">
		<label for="username">Username</label>
		<input
			class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
			type="text"
			id="username"
			name="username"
			required
		/>
	</div>
	<div class="mt-4">
		<label for="password">Password</label>
		<input
			class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
			type="password"
			id="password"
			name="password"
			required
		/>
	</div>

	<button class="btn-base mt-4" type="submit">Login</button>
	<p>Don't have an account? <a href="/register" class=" text-indigo-600">Register</a></p>
</form>
