<script>
	import { browser } from '$app/env';
	import { getContext, onMount } from 'svelte';
	import OverlayScrollbar from 'overlayscrollbars';
	import { activeIndex, quizzes } from '$lib/stores/test-store';
	import Navigation from './navigation.svelte';

	export let expandable = false;

	let closeSidebar = browser ? getContext('closeSidebar') : null;
	let togglePopup = browser ? getContext('togglePopup') : null;

	let scrollable;
	onMount(() => {
		OverlayScrollbar(scrollable, { sizeAutoCapable: false, className: 'os-theme-light' });
	});

	$: quizNumber = $quizzes.map(({ answered }) => answered);

	const changeQuestion = (i) => {
		activeIndex.set(i);
		if (expandable) closeSidebar();
	};
</script>

<div
	class="{!expandable
		? `w-1/4`
		: 'w-11/12'} sm:min-w-[280px] lg:min-w-[340px] h-full bg-white shadow-xl p-2 pl-5 pr-5 relative flex flex-col"
	class:ml-auto={expandable}
>
	<div class="top border-b">
		{#if !expandable}
			<button class="mt-3 mb-2 hover:underline inline-block text-red-600" on:click={togglePopup}>
				<i class="ld-arrow-left text-lg inline-block align-middle" /> Batalkan Tes
			</button>
		{:else}
			<div class="flex mb-2">
				<button class="ml-auto p-2 pb-0 text-teal-800" on:click={closeSidebar}>
					<i class="ld-close text-3xl leading-none" />
				</button>
			</div>
		{/if}
		<div class="w-full text-center font-semibold text-3xl mb-2 text-teal-600">1 / 50</div>
	</div>

	<div class="flex flex-wrap justify-between h-full" bind:this={scrollable}>
		{#each quizNumber as answered, i}
			<button
				class="w-2/12 p-1 border-2 m-1 aspect-square transition-all hover:border-teal-600"
				class:bg-gray-200={$activeIndex === i}
				class:bg-green-200={answered}
				class:border-transparent={answered}
				class:border-teal-600={$activeIndex === i}
				on:click={() => changeQuestion(i)}
			>
				<span>{i + 1}</span>
			</button>
		{/each}
	</div>

	{#if !expandable}
		<div class="flex mt-auto border-t">
			<Navigation />
		</div>
	{/if}
</div>
