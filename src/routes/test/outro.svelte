<script>
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import OverlayScrollbars from 'overlayscrollbars';
	import { APP_NAME } from '$lib/env';

	import { quizzes } from '$lib/stores/test-store';
	import { checkAnswer } from '$lib/helpers/quizzes/checkAnswer';
	import { dashToSpace } from '$lib/helpers/dashToSpace';
	import { scoreDB } from '$lib/helpers/dbPreference';

	import BtnMain from '$lib/components/button/btn-main.svelte';
	import { calculateColor, congratulateTxt, saranTxt } from '$lib/helpers/scoring';

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

	const backToDashboard = () => {
		goto('/dashboard', { replaceState: true });
		quizzes.set([]);
	};

	const saveScore = async () => {
		const date = new Date();
		const dateTime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
		const data = { score: average, detail: score, dateTime };
		await scoreDB.set(data);
	};

	let content;
	onMount(() => {
		if ($quizzes.length < 1) return goto('/dashboard', { replaceState: true });
		OverlayScrollbars(content, { sizeAutoCapable: false, className: 'os-theme-light' });
		saveScore();
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

		<div class="md:p-10 overflow-auto">
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
