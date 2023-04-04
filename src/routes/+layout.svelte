<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { handleSession } from '@lucia-auth/sveltekit/client';

	//Lucia Get Session
	handleSession(page);
</script>

<slot />
