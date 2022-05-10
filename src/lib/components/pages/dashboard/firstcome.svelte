<script>
	import { goto } from '$app/navigation';
	import { user } from '$lib/store';
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';

	const skipTest = getContext('skipTest');
</script>

<div
	class="absolute inset-x-2/4 inset-y-2/4 -translate-y-2/4 -translate-x-2/4 w-[90%] sm:w-3/4 md:w-8/12 lg:w-1/2 max-w-screen-sm h-max p-5 block bg-white rounded-xl"
	in:fade
>
	<header class="text-center">
		<span class="uppercase text-sm">Selamat Datang</span>
		<h1 class="uppercase font-extrabold text-lg sm:text-2xl text-teal-700">{$user.name}</h1>
		<p class="mt-5 mb-5">
			Lakukan <span class="font-semibold">Tes Disleksia</span> terlebih dahulu untuk mengukur seberapa
			besar masalah disleksia yang sedang dialami.
		</p>
		<button
			on:click={() => goto('/test')}
			class="bg-teal-700 text-white text-center p-3 mt-4 rounded-3xl uppercase transition-all w-full hover:bg-teal-800"
		>
			TES SEKARANG
		</button>
		<button
			class="bg-transparent mt-2 hover:underline inline-block text-teal-900 text-sm"
			on:click={() => skipTest($user.uid)}
		>
			Lanjutkan Tanpa Tes <i class="ld-arrow-right text-lg inline-block align-middle" />
		</button>
	</header>
</div>
