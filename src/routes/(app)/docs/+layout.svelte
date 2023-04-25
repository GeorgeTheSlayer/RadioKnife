<script lang="ts">
	const baseLink = '/docs';
</script>

<div class="mt-4 flex">
	<ul class="w-1/4 bg-black ">
		<li class="text-6xl text-pastel-c hover:opacity-50"><a href={baseLink}>Welcome</a></li>
	</ul>
	<div class="">
		<slot />
	</div>
</div>
