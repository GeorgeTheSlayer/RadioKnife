<svelte:head>
	<title>Login | RadioKnife</title>
</svelte:head>

<form
	class="mx-auto mt-10 flex h-1/2 w-1/4 flex-col gap-1 border-4 border-pastel-b p-10 text-center"
	method="POST"
>
	<div>
		<h1 class="text-bold">Account Login</h1>
		<p>Enter your Account Details here.</p>
	</div>
	<div class="mt-8">
		<!--		<label for="username">Username</label>-->
		<input
			class="w-full border-4 border-pastel-b py-2 px-3 leading-tight text-gray-700"
			type="text"
			id="username"
			name="username"
			placeholder="Username"
			required
		/>
	</div>
	<div class="mt-4">
		<input
			class="w-full border-4 border-pastel-b py-2 px-3 leading-tight text-gray-700"
			type="password"
			id="password"
			name="password"
			placeholder="Password"
			required
		/>
	</div>

	<button class="btn-base mt-4" type="submit">Login</button>
	<p>Don't have an account? <a href="/register" class=" text-pastel-c">Register</a></p>
</form>
