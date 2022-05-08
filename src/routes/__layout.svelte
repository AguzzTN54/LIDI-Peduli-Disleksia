<script>
	import { onAuthStateChanged } from 'firebase/auth';
	import { authApp as auth } from '$lib/firebase/app';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	const { routeId } = $page;

	onMount(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				console.log('logged in');
				if (routeId === '') goto('/dashboard');
			} else {
				if (routeId !== '') goto('/');
				console.log('signed out');
			}
		});
	});
</script>

<main class="h-screen w-screen overflow-hidden">
	<slot />
</main>

<style global lang="postcss">
	@import '../app.css';
</style>
