<script>
	import { APP_NAME } from '$lib/env';
	import Header from '$lib/components/header.svelte';

	const category = [
		{ pic: '/images/alpha/A.png', name: 'Mengenal Huruf', path: '/huruf' },
		{ pic: '/images/number/5.png', name: 'Mengenal Angka', path: '/angka' },
		{ pic: '/images/alpha/X.png', name: 'Mengeja Kata', path: '/mengeja' },
		{ pic: '/images/number/1.png', name: 'Berhitung', path: '/berhitung' }
	];
</script>

<svelte:head>
	<title>Latihan | {APP_NAME}</title>
</svelte:head>

<section class="w-full h-full">
	<div class="w-full h-full bg-white/[.5] backdrop-blur-md flex flex-col relative">
		<Header />

		<div class="flex flex-wrap w-[1100px] max-w-[90%] justify-center ml-auto mr-auto mt-5">
			{#each category as { name, path, pic }}
				<div class="w-full md:w-1/2 px-3 my-2">
					<a
						class="px-4 h-28 text-2xl uppercase bg-white/80 border-b-2 border-teal-500 flex items-center hover:bg-white transition-all relative rounded-xl active:scale-95 overflow-hidden"
						href="/training{path}"
					>
						<span>{name} </span>
						<img
							src={pic}
							alt={name}
							class="absolute top-[70%] -translate-y-1/2 -right-[5%] w-[20%] opacity-25"
						/>
					</a>
				</div>
			{/each}
		</div>
	</div>
</section>
