<script lang="ts">
</script>

<svelte:head>
	<title>Register | RadioKnife</title>
</svelte:head>

<form
	method="POST"
	class="mx-auto mt-10 flex h-1/2 w-1/4 flex-col gap-2 border-4 border-pastel-b p-10 text-center"
>
	<h1>Register</h1>
	<h2>To post articles, you'll need an account.</h2>

	<!--	<label for="name">Name</label>-->
	<input
		type="text"
		id="name"
		name="name"
		class="w-full border-4 border-pastel-b py-2 px-3 leading-tight text-gray-700"
		placeholder="Name"
		required
	/>

	<!--	<label for="username">Username</label>-->
	<input
		type="text"
		id="username"
		name="username"
		class="w-full border-4 border-pastel-b py-2 px-3 leading-tight text-gray-700"
		placeholder="Username"
		required
	/>

	<!--	<label for="password">Password</label>-->
	<input
		type="password"
		id="password"
		name="password"
		class="w-full border-4 border-pastel-b py-2 px-3 leading-tight text-gray-700"
		placeholder="Password"
		required
	/>

	<button type="submit" class="btn-base">Register</button>
	<p>Already have an account? <a href="/login" class="text-pastel-c hover:opacity-50">Login</a></p>
</form>
