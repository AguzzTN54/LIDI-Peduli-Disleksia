<script>
	import { fade } from 'svelte/transition';
	import Header from '$lib/components/header.svelte';

	const mainMenu = [
		{ pic: 'test', text: 'Tes <br/> Kemampuan', href: 'test' },
		{ pic: 'train', text: 'Latihan', href: 'training' }
	];

	const menu = [
		// { pic: 'game', text: 'Permainan' },
		{ pic: 'history', text: 'Riwayat', href: '/riwayat' },
		{ pic: 'guide', text: 'Panduan', href: '/panduan' },
		{ pic: 'log-out', text: 'Keluar' }
	];
</script>

<Header dashboard />
<div
	class="h-full w-full pt-2 pb-2 pl-5 pr-5 sm:pl-10 sm:pr-10 lg:pr-20 lg:pl-20 lg:pt-7 overflow-auto"
	in:fade
>
	<div class="w-full flex flex-wrap">
		{#each mainMenu as { pic, text, href }, i}
			<div class="w-full md:w-1/2 max-w-2xl flex p-2 md:p-3">
				<a
					{href}
					class="{i < 1 ? `bg-teal-600/[.5]` : `bg-amber-300/[.5]`}
						p-5 rounded-lg w-full flex items-center transition-all hover:shadow-lg active:scale-95 relative overflow-hidden backdrop-blur-xs"
				>
					<img
						src="/images/icons/{pic}-line.png"
						alt="bg"
						class="absolute w-4/12 min-w-[120px] -right-[7%] -bottom-[40%] opacity-5"
					/>
					<picture class="block w-[20%] mr-2">
						<img src="/images/icons/{pic}.png" alt={text} class="w-full" />
					</picture>
					<caption
						class:text-teal-900={i < 1}
						class:text-amber-700={i > 0}
						class="text-left uppercase font-semibold text-xl sm:text-2xl lg:text-3xl ml-3 lg:ml-8"
					>
						{@html text}
					</caption>
				</a>
			</div>
		{/each}
		<div class="w-full mt-4" />

		{#each menu as { pic, text, href }}
			<a
				{href}
				class="w-1/2 sm:w-4/12 md:w-3/12 lg:w-1/5 p-2 md:p-3 lg:max-w-[200px] aspect-square"
			>
				<div
					class="bg-white/[.8] p-5 rounded-lg w-full text-center hover:shadow-lg hover:bg-white transition-all active:scale-95"
				>
					<picture class="w-3/4 block m-auto">
						<img src="/images/icons/{pic}.png" alt={text} class="w-full" />
					</picture>
					<caption
						class="w-full block pt-5 uppercase whitespace-nowrap text-lg text-teal-800 font-semibold"
					>
						{text}
					</caption>
				</div>
			</a>
		{/each}
	</div>
</div>
