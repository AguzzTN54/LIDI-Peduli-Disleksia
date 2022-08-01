<script>
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import { APP_NAME } from '$lib/env';
	import { quizzes } from '$lib/stores/test-store';
	import { getQuizzes } from '$lib/helpers/quizzes';
	import BtnMain from '$lib/components/utils/btn-main.svelte';

	const startQuiz = () => {
		const quiz = getQuizzes();
		quizzes.set(quiz);
		goto(`/test/${quiz[0].id}`, { replaceState: true });
	};
</script>

<svelte:head>
	<title>Test Kemampuan | {APP_NAME}</title>
</svelte:head>

<section class="h-full w-full flex justify-center pl-2 pr-2 overflow-auto" in:fade>
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
			Pendamping dapat membantu melakukan navigasi untuk mempermudah proses tes.
		</p>

		<BtnMain on:click={startQuiz}>Mulai Tes Sekarang</BtnMain>

		<div class="block text-center">
			<button
				class="bg-transparent mt-3 hover:underline inline-block text-teal-900"
				on:click={() => goto('/dashboard')}
			>
				<i class="ld-arrow-left text-lg inline-block align-middle" /> Batalkan Test
			</button>
		</div>
	</div>
</section>
