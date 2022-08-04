<script>
	import { letters } from '$lib/data/materi/letters.json';
	import { speak } from '$lib/helpers/speechSynth';
	import { terbilang } from '$lib/helpers/terbilang';

	export let letter;
	let playedTxt = '';
	let words = [];

	$: isString = typeof letter === 'string';
	$: if (isString) ({ words } = letters.find((l) => l.letter === letter));

	const playAudio = async (text) => {
		playedTxt = text;
		await speak(text);
		playedTxt = '';
	};
</script>

<h1 class="text-3xl font-bold text-teal-600">{isString ? 'Huruf' : 'Angka'}</h1>
<div
	class="w-full text-center flex justify-center"
	class:flex-col={!isString}
	class:items-center={!isString}
	class:items-end={isString}
>
	{#if typeof letter !== 'string' && letter > 10}
		<div class="md:w-96 max-w-[80%] aspect-square p-10 rounded-xl flex items-center justify-center">
			{#each letter.toString().split('') as n}
				<span class="w-full">
					<img src="/images/number/{n}.png" alt="Huruf" />
				</span>
			{/each}
		</div>
	{:else}
		<div class="md:w-96 max-w-[80%] aspect-square p-10 rounded-xl">
			<img src="/images/{isString ? 'alpha' : 'number'}/{letter}.png" alt="Huruf" />
		</div>
	{/if}
	<div class="flex items-center pb-10 flex-col">
		{#if !isString}
			<span class="text-3xl uppercase mb-4">
				{terbilang(letter)}
			</span>
		{/if}
		<button
			class="bg-teal-600 aspect-square text-white leading-[0] rounded"
			class:w-40={!isString}
			class:text-6xl={!isString}
			class:text-3xl={isString}
			class:p-4={isString}
			on:click={() => playAudio(letter)}
		>
			<i class="ld-{playedTxt === letter ? 'pause' : 'volume'}" />
		</button>
	</div>
</div>

{#if isString}
	<h2 class="pl-2 font-bold mb-3 block">Contoh Kata :</h2>
	<div class="flex flex-wrap w-full justify-between pl-3 pr-3">
		{#each words as word}
			<div
				class="bg-white/60 hover:bg-white/80 transition-all pt-3 pb-3 pl-10 pr-10 border-b-2 border-teal-600 mb-1 rounded capitalize flex justify-between items-center w-full md:w-[49%]"
			>
				<div>
					{word}
				</div>
				<div>
					<button
						class=" border-teal-600 border aspect-square text-xl p-2 leading-[0] rounded hover:bg-teal-600 hover:text-white transition-all"
						on:click={() => playAudio(word)}
					>
						<i class="ld-{playedTxt === word ? 'pause' : 'volume'}" />
					</button>
				</div>
			</div>
		{/each}
	</div>
{/if}
