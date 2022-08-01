<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import OverlayScrollbars from 'overlayscrollbars';
	import { APP_NAME } from '$lib/env';

	import { quizzes } from '$lib/stores/test-store';
	import { checkAnswer } from '$lib/helpers/quizzes/checkAnswer';
	import { dashToSpace } from '$lib/helpers/dashToSpace';
	import BtnMain from '$lib/components/utils/btn-main.svelte';

	const score = [];
	const evaluated = checkAnswer($quizzes);

	Object.keys(evaluated).forEach((key) => {
		const { trueAnswer, total } = evaluated[key];
		const skor = {
			trueAnswer,
			total,
			topik: dashToSpace(key),
			rate: (trueAnswer / total) * 100
		};
		score.push(skor);
	});
	console.log(score);

	const getAverage = (prev, key, i, arr) => {
		const { total, trueAnswer } = evaluated[key];
		const obj = {
			total: prev.total + total,
			trueAnswer: prev.trueAnswer + trueAnswer
		};
		if (i !== arr.length - 1) return obj;
		return (obj.trueAnswer / obj.total) * 100;
	};
	const average = Object.keys(evaluated).reduce(getAverage, { total: 0, trueAnswer: 0 });

	const calculateColor = (percentage) => {
		const hue = percentage * 120;
		return `color: hsl(${hue}, 100%, 45%);`;
	};

	const congratulateTxt = (avg) => {
		if (avg === 100) return 'Perfect';
		if (avg > 90) return 'Fantastic';
		if (avg > 80) return 'Sangat Bagus';
		if (avg > 70) return 'Bagus';
		if (avg > 60) return 'Rata-Rata';
		if (avg > 50) return 'Cukup';
		if (avg > 30) return 'Kurang';
		if (avg > 10) return 'Sangat Kurang';
		return 'Butuh Perhatian Khusus';
	};

	const saranTxt = (avg) => {
		if (avg === 100) {
			return 'Skor sempurna, Sebagai orangtua, anda tidak perlu khawatir terhadap kemampuan literasi anak anda';
		}
		if (avg > 90) return 'Hebat, Pertahankan kemampuan yang sudah dimiliki';
		if (avg > 80) {
			return 'Kemampuan literasi sudah sangat bagus, namun masih dapat ditingkatkan agar lebih baik';
		}
		if (avg > 70) {
			return 'Kemampuan di atas rata-rata, namun tetap memerlukan latihan agar kemampuan terus meningkat';
		}
		if (avg > 60) {
			return 'Latihan rutin adalah hal yang bisa dilakukan untuk meningkatkan kemampuan literasi';
		}
		if (avg > 50) {
			return 'Kemampuan cukup untuk memahami literasi di lingkungan sehari hari, namun disarankan untk tetap melakukan latihan untuk meningkatkan kemampuan';
		}
		if (avg > 30) return 'Diperlukan latihan untuk meningkatkan kemampuan literasi';
		if (avg > 10) {
			return 'Kemampuan literasi masih sangat kurang, disarankan untuk mengatur jadwal belajar dan latihan secara rutin';
		}
		return 'Kemampuan jauh di bawah rata-rata, perlu pendampingan khusus dalam proses belajar.';
	};

	const backToDashboard = () => {
		goto('/dashboard', { replaceState: true });
		quizzes.set([]);
	};

	let content;
	onMount(() => {
		if ($quizzes.length < 1) return goto('/dashboard', { replaceState: true });
		OverlayScrollbars(content, { sizeAutoCapable: false, className: 'os-theme-light' });
	});
</script>

<svelte:head>
	<title>Skor | {APP_NAME}</title>
</svelte:head>

<section class="h-full w-full flex justify-center pl-2 pr-2" bind:this={content} in:fade>
	<div class="content p-5 w-full text-lg sm:text-xl">
		<h1 class="text-[2em] leading-10 font-riangriung text-teal-800 text-center mb-10 sm:mb-16 pt-5">
			SKOR
		</h1>
		<div class="text-center mb-16">
			<h2
				class="text-[3em] leading-10 font-extrabold mb-6 sm:mb-10"
				style={calculateColor(average / 100)}
			>
				{average}%
			</h2>
			<span class="uppercase font-semibold text-2xl"> {congratulateTxt(average)} </span>
		</div>
		<p class="mb-7 sm:mb-12 max-w-[600px] ml-auto mr-auto text-center">
			{saranTxt(average)}
		</p>

		<div class="md:p-10 overflow-scroll">
			<table class="w-full text-sm text-gray-500 text-center">
				<thead class="text-xs text-gray-700 uppercase bg-gray-50/[.7]">
					<tr>
						<th scope="col" class="px-6 py-3 text-left"> Topik </th>
						<th scope="col" class="px-6 py-3"> Jumlah Soal </th>
						<th scope="col" class="px-6 py-3"> Jumlah Benar </th>
						<th scope="col" class="px-6 py-3"> Presentase </th>
					</tr>
				</thead>
				<tbody>
					{#each score as { rate, topik, trueAnswer, total }}
						<tr class="border-b odd:bg-white/[.7] even:bg-gray-50/[.7]">
							<th
								scope="row"
								class="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap"
							>
								{topik}
							</th>
							<td class="px-6 py-4"> {total} </td>
							<td class="px-6 py-4"> {trueAnswer} </td>
							<td class="px-6 py-4"> {rate}% </td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="max-w-[600px] m-auto pb-10">
			<BtnMain on:click={backToDashboard}>Kembali Ke Dashboard</BtnMain>
		</div>
	</div>
</section>
