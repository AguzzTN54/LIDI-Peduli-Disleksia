<script>
	import { browser } from '$app/env';
	import { setContext } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { APP_NAME } from '$lib/env';

	import { mobile } from '$lib/stores/global-store';
	import Sidebar from './_components/sidebar.svelte';
	import ButtonBack from '$lib/components/button/button-back.svelte';
	import LetterItem from './_components/letter-item.svelte';

	let sidebarOpen = false;
	const closeSidebar = () => (sidebarOpen = false);

	let activeLetter = 'A';
	const openLetter = (l) => {
		activeLetter = l;
		sidebarOpen = false;
	};

	if (browser) {
		setContext('closeSidebar', closeSidebar);
		setContext('openLetter', openLetter);
	}
</script>

<svelte:head>
	<title>Mengenal Huruf | {APP_NAME}</title>
</svelte:head>

<section class="h-full w-full flex bg-white/[.5] backdrop-blur-md">
	<div class="w-full h-full flex bg-[#ddf4e9]/[0.75]" in:fade={{ duration: 150 }}>
		{#if !$mobile}
			<Sidebar />
			<div class="p-10 text-lg w-full"><LetterItem letter={activeLetter} /></div>
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
					<ButtonBack />
					<button class="ml-auto text-3xl text-teal-700" on:click={() => (sidebarOpen = true)}>
						<i class="ld-nav" />
					</button>
				</div>
				<div class="w-full text-center font-semibold text-xl mb-2">
					<LetterItem letter={activeLetter} />
				</div>
			</div>
		{/if}
	</div>
</section>
