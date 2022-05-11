<script>
	import { goto } from '$app/navigation';
	import { APP_NAME } from '$lib/env';
	import BtnMain from '$lib/components/utils/btn-main.svelte';
</script>

<svelte:head>
	<title>Test Kemampuan | {APP_NAME}</title>
</svelte:head>

<section class="h-full w-full flex justify-center pl-2 pr-2 overflow-auto">
	<div class="content p-5 w-full max-w-[600px] text-lg sm:text-xl">
		<h1 class="text-3xl font-riangriung text-teal-800 text-center mb-5 sm:mb-10 pt-5">Ketentuan</h1>
		<p class="mb-5">
			Dalam Tes ini terdapat 50 Soal, terdiri dari soal-soal yang telah disesuaikan untuk mengukur
			aspek-aspek tertentu yang berkaitan dengan masalah disleksia, yaitu:
		</p>
		<ol class="list-decimal list-inside mb-5">
			<li>Mengenali Huruf / Angka</li>
			<li>Mengeja Kata</li>
			<li>Mendengar</li>
			<li>Berhitung</li>
		</ol>
		<p class="mb-7 sm:mb-12">
			Semua soal memiliki bobot yang sama, tidak ada batasan waktu namun harus dijawab seluruhnya.
			Pendaming dapat membantu melakukan navigasi untuk mempermudah proses tes.
		</p>

		<BtnMain on:click={() => goto('/test/001')}>Mulai Tes Sekarang</BtnMain>
	</div>
</section>
