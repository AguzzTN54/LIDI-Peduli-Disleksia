<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import OverlayScrollbars from 'overlayscrollbars';
	import { APP_NAME } from '$lib/env';
	import { scoreDB } from '$lib/helpers/dbPreference';

	import BtnMain from '$lib/components/button/btn-main.svelte';
	import { calculateColor, congratulateTxt, saranTxt } from '$lib/helpers/scoring';
	import { page } from '$app/stores';

	let detailInfo = [];
	let average = 0;
	const { params } = $page;

	const backToDashboard = () => {
		window.history.back();
	};

	let content;
	onMount(async () => {
		const { data } = await scoreDB.get();
		const { detail, score } = [...data].reverse()[params.id];
		detailInfo = detail;
		average = score;
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
					{#each detailInfo as { rate, topik, trueAnswer, total }}
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
			<BtnMain on:click={backToDashboard}>Kembali</BtnMain>
		</div>
	</div>
</section>
