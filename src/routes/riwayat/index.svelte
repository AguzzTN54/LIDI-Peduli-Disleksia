<script>
	import { APP_NAME } from '$lib/env';
	import Header from '$lib/components/header.svelte';
	import { onMount } from 'svelte';
	import { scoreDB } from '$lib/helpers/dbPreference';
	import { calculateColor } from '$lib/helpers/scoring';

	let score = [];
	onMount(async () => {
		const { data } = await scoreDB.get();
		score = [...data].reverse();
	});
</script>

<svelte:head>
	<title>Riwayat Tes | {APP_NAME}</title>
</svelte:head>

<section class="w-full h-full">
	<div class="w-full h-full bg-white/[.5] backdrop-blur-md flex flex-col relative">
		<Header />

		<div class="md:p-10 overflow-auto">
			<table class="w-full text-lg text-gray-500 text-center">
				<thead class="text-xs text-gray-700 uppercase bg-gray-50/[.7]">
					<tr>
						<th scope="col" class="px-6 py-3 text-left"> Tanggal </th>
						<th scope="col" class="px-6 py-3"> Skor </th>
						<th scope="col" class="px-6 py-3"> &nbsp; </th>
					</tr>
				</thead>
				<tbody>
					{#each score as { dateTime, score }, i}
						<tr class="border-b odd:bg-white/[.7] even:bg-gray-50/[.7]">
							<th
								scope="row"
								class="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap"
							>
								{dateTime}
							</th>
							<td class="px-6 py-4 font-bold" style={calculateColor(score / 100)}> {score}% </td>
							<td class="px-6 py-4">
								<a class="py-1 px-5 bg-teal-700 text-white rounded-3xl" href="/riwayat/{i}">
									Detail
								</a>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</section>
