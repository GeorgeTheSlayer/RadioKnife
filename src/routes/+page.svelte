<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	if (browser) {
		if (window.location.pathname === '/') {
			goto('/home');
		}
	}
</script>
