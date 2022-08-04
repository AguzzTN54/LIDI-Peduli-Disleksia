<script>
	import { browser } from '$app/env';
	import { getContext, onMount } from 'svelte';
	import OverlayScrollbar from 'overlayscrollbars';
	import ButtonBack from '$lib/components/button/button-back.svelte';

	export let expandable = false;
	export let number = false;

	let scrollable;
	let closeSidebar = browser ? getContext('closeSidebar') : null;
	let openLetter = browser ? getContext('openLetter') : null;

	// prettier-ignore
	const letterList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
	const numList = [
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
		50, 100, 1000
	];
	const list = number ? numList : letterList;

	onMount(() => {
		OverlayScrollbar(scrollable, { sizeAutoCapable: false, className: 'os-theme-light' });
	});
</script>

<div
	class="{!expandable
		? `w-1/4`
		: 'w-11/12'} sm:min-w-[280px] lg:min-w-[340px] h-full bg-white shadow-xl p-2 pl-5 pr-5 relative flex flex-col"
	class:ml-auto={expandable}
>
	<div class="top border-b">
		{#if !expandable}
			<ButtonBack />
		{:else}
			<div class="flex mb-2">
				<button class="ml-auto p-2 pb-0 text-teal-800" on:click={closeSidebar}>
					<i class="ld-close text-3xl leading-none" />
				</button>
			</div>
		{/if}
	</div>

	<div class="mt-5 h-full w-full" bind:this={scrollable}>
		<div class="flex flex-wrap justify-around w-full">
			{#each list as val}
				<div class="w-5/12 p-4 flex items-center justify-center aspect-square">
					<button
						class="active:scale-95 transition-all flex justify-center"
						on:click={() => openLetter(val)}
					>
						{#if typeof val !== 'string' && val > 10}
							{#each val.toString().split('') as v}
								<span class="w-full -ml-1 -mr-1">
									<img src="/images/number/{v}.png" alt="Bacaan" />
								</span>
							{/each}
						{:else}
							<span>
								<img
									src="/images/{typeof val === 'string' ? 'alpha' : 'number'}/{val}.png"
									alt="Bacaan"
								/>
							</span>
						{/if}
					</button>
				</div>
			{/each}
		</div>
	</div>
</div>
