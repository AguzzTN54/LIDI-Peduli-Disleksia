<script context="module">
	import { APP_NAME } from '$lib/env';
	export const prerender = false;
</script>

<script>
	import { browser } from '$app/env';
	import { setContext } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { mobile } from '$lib/store';
	import Sidebar from '$lib/components/pages/test/sidebar.svelte';
	import Navigation from '$lib/components/pages/test/navigation.svelte';

	let sidebarOpen = false;

	const closeSidebar = () => (sidebarOpen = false);
	$: if (browser) setContext('closeSidebar', closeSidebar);
</script>

<svelte:head>
	<title>Test Kemampuan | {APP_NAME}</title>
</svelte:head>

<section class="h-full w-full flex">
	{#if !$mobile}
		<Sidebar />
	{:else}
		{#if sidebarOpen}
			<div class="fixed top-0 right-0 h-full w-full">
				<div
					class="fixed top-0 right-0 h-full w-full bg-black/[.2] backdrop-blur-lg"
					transition:fade={{ duration: 100 }}
				/>
				<div class="z-20 h-full w-full" transition:fly={{ x: 100, duration: 250 }}>
					<Sidebar expandable />
				</div>
			</div>
		{/if}
		<div class="flex-col flex w-full">
			<div class="flex w-full pl-5 pr-5 pt-2 items-center">
				<button class="bg-transparent mt-3 mb-2 hover:underline inline-block text-red-600">
					<i class="ld-arrow-left text-lg inline-block align-middle" /> Batalkan Tes
				</button>
				<button class="ml-auto text-3xl text-teal-700" on:click={() => (sidebarOpen = true)}>
					<i class="ld-nav" />
				</button>
			</div>
			<div class="w-full text-center font-semibold text-xl mb-2 text-teal-600">1 / 50</div>

			<div class="flex mt-auto border-t bg-white pb-2">
				<Navigation />
			</div>
		</div>
	{/if}
</section>
