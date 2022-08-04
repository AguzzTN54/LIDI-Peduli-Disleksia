<script>
	import { APP_NAME } from '$lib/env';
	import Header from '$lib/components/header.svelte';

	const category = [
		{ pic: '', name: 'Mengenal Huruf', path: '/huruf' },
		{ pic: '', name: 'Mengenal Angka', path: '/angka' },
		{ pix: '', name: 'Mengeja Kata', path: '/mengeja' },
		{ pix: '', name: 'Berhitung', path: '/berhitung' },
		{ pix: '', name: 'Mengenal Objek', path: '/objek' }
	];
</script>

<svelte:head>
	<title>Latihan | {APP_NAME}</title>
</svelte:head>

<section class="w-full h-full">
	<div class="w-full h-full bg-white/[.5] backdrop-blur-md flex flex-col relative">
		<Header />

		<div class="flex flex-wrap w-[900px] max-w-[90%] justify-center ml-auto mr-auto mt-5">
			{#each category as { name, path }}
				<div class="w-full md:w-1/2 pl-1 pr-1 mb-1">
					<a
						class="pl-3 pr-3 pt-4 pb-4 bg-white/80 border-b-2 border-teal-500 block hover:bg-white transition-all"
						href="/training{path}"
					>
						{name}
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>
