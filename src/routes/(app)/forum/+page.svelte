<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	console.log(data);
</script>

<h1 class="text-center">Forum Page</h1>

<div class="text-center">
	<a href="/forum/create"><button class="btn-base mt-4">Create</button></a>
</div>

{#each data.forums as thread}
	<div class="thread">
		<a href="/forum/thread/{thread.id}">
			<h2>{thread.title}</h2>
		</a>
		<p>{thread.content}</p>
	</div>
{/each}
