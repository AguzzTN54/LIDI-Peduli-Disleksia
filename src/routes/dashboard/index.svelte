<script context="module">
	export const prerender = true;
</script>

<script>
	import { browser } from '$app/env';
	import { setContext } from 'svelte';
	import { APP_NAME } from '$lib/env';
	import firestore from '$lib/firebase/firestore';
	import { user } from '$lib/stores/global-store';
	import Dashboard from './_dashboard.svelte';
	import Firstcome from './_firstcome.svelte';

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

	if (browser) setContext('skipTest', skipTest);
	$: if (browser && $user.uid) checkFirstCome($user.uid);
</script>

<svelte:head>
	<title>Dashboard | {APP_NAME}</title>
</svelte:head>

<section class="w-full h-full">
	<div class="w-full h-full bg-white/[.5] backdrop-blur-md flex flex-col relative">
		{#if firstCome}
			<Firstcome />
		{:else}
			<Dashboard />
		{/if}
	</div>
</section>
