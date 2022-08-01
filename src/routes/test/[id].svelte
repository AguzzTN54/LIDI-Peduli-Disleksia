<script context="module">
	import { APP_NAME } from '$lib/env';
	export const prerender = false;
</script>

<script>
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getContext, setContext } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	import { mobile } from '$lib/stores/global-store';
	import { activeIndex, quizzes } from '$lib/stores/test-store';
	import Sidebar from '$lib/components/pages/test/sidebar.svelte';
	import Navigation from '$lib/components/pages/test/navigation.svelte';
	import QuizItem from '$lib/components/pages/test/quiz-item.svelte';

	let sidebarOpen = false;

	const closeSidebar = () => (sidebarOpen = false);
	if (browser) setContext('closeSidebar', closeSidebar);
	const togglePopup = browser ? getContext('togglePopup') : null;

	const { params } = $page;
	const index = $quizzes.findIndex(({ id }) => id === params.id);
	activeIndex.set(index);
	const quizItem = $quizzes[index];
	if (browser && (!params.id || !quizItem)) goto('/test', { replaceState: true });

	$: answeredQty = $quizzes.filter(({ answered }) => answered).length;
</script>

<svelte:head>
	<title>Test Kemampuan | {APP_NAME}</title>
</svelte:head>

<section class="h-full w-full flex">
	{#if !$mobile}
		<Sidebar />
		<div class="p-10 text-lg w-full">
			<QuizItem />
		</div>
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
				<button
					class="bg-transparent mt-3 mb-2 hover:underline inline-block text-red-600"
					on:click={togglePopup}
				>
					<i class="ld-arrow-left text-lg inline-block align-middle" /> Batalkan Tes
				</button>
				<button class="ml-auto text-3xl text-teal-700" on:click={() => (sidebarOpen = true)}>
					<i class="ld-nav" />
				</button>
			</div>
			<div class="w-full text-center font-semibold text-xl mb-2 text-teal-600">
				{answeredQty} / {$quizzes.length}
			</div>

			<div class="p-5 h-full text-xl overflow-auto">
				<QuizItem />
			</div>

			<div class="flex w-full border-t bg-white pb-2">
				<Navigation />
			</div>
		</div>
	{/if}
</section>
