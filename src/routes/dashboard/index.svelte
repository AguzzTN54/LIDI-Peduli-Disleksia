<script context="module">
	export const prerender = true;
</script>

<script>
	import { browser } from '$app/env';
	import { setContext } from 'svelte';
	import firestore from '$lib/firebase/firestore';
	import { user } from '$lib/store';
	import Dashboard from '$lib/components/pages/dashboard/dashboard.svelte';
	import Firstcome from '$lib/components/pages/dashboard/firstcome.svelte';

	let firstCome = false;

	const checkFirstCome = async (uid) => {
		const { data } = await firestore.getByUid(uid);
		firstCome = data?.newUser;
		return;
	};

	const skipTest = (uid) => {
		firstCome = false;
		firestore.set(uid, { newUser: false });
	};
	setContext('skipTest', skipTest);

	$: if (browser && $user.uid) checkFirstCome($user.uid);
</script>

<svelte:head>
	<title>Dashboard | LIDI - PEDULI DISLEKSIA</title>
</svelte:head>

<section class="bg-cover bg-center w-full h-full bg-emerald-500">
	<div class="w-full h-full bg-white/[.5] backdrop-blur-md flex flex-col relative">
		{#if firstCome}
			<Firstcome />
		{:else}
			<Dashboard />
		{/if}
	</div>
</section>

<style>
	section {
		background-image: url('/images/landing-background.jpg');
	}
</style>
