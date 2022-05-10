<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { onAuthStateChanged } from 'firebase/auth';
	import { authApp as auth } from '$lib/firebase/app';
	import { user } from '$lib/store';
	import firestore from '$lib/firebase/firestore';

	const { routeId } = $page;

	onMount(() => {
		onAuthStateChanged(auth, async (userData) => {
			if (userData) {
				const { data } = await firestore.getByUid(userData.uid);
				const { isAnonymous, email, photoURL, uid, displayName } = userData;
				const name = displayName || data?.name || 'Anonim';
				user.set({ name, uid, photoURL, email, isAnonymous });
				console.log('logged in');
				if (routeId === '') return goto('/dashboard');
				return;
			}
			console.log('signed out');
			if (routeId !== '') return goto('/');
			return;
		});
	});
</script>

<main class="h-screen w-screen overflow-hidden bg-cover bg-center bg-emerald-500">
	<slot />
</main>

<style global lang="postcss">
	@import '../app.css';

	main {
		background-image: url('/images/landing-background.jpg');
	}
</style>
