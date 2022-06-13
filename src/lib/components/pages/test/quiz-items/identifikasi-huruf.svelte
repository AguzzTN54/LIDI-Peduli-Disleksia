<script>
	import { getContext, onMount } from 'svelte';

	export let letter;
	export let options;
	export let userAnswer;
	export let questionNumber;
	export let audio = false;

	const select = getContext('selectAnswer');
	let playAudio;

	onMount(async () => {
		const { speak } = await import('$lib/functions/speechSynth');
		playAudio = speak;
	});
</script>

<div class="flex flex-col justify-evenly bg-white rounded-3xl w-full h-full">
	<div class="flex flex-col items-center justify-center sm:p-5 pt-10 mt-5">
		{#if audio}
			<p class="text-center pb-5 pr-5 pl-5">
				{questionNumber}. Dengarkan Audio berikut, kemudian pilih huruf yang sesuai
			</p>
			<button
				class="border-2 pl-12 pr-12 pt-10 pb-10 rounded-xl bg-teal-700 text-white active:scale-95 transition-all"
				on:click={playAudio(letter)}
			>
				<i class="ld-volume block text-[5em]" />
				<span class="block">Play</span>
			</button>
		{:else}
			<div class="text-[10em] md:text-[15em] leading-[.8em] font-riangriung sm:mt-10">
				{letter}
			</div>
			<p class="text-center pr-5 pl-5">
				{questionNumber}. Pilih huruf yang sama dengan gambar di atas
			</p>
		{/if}
	</div>
	<div class="flex flex-wrap justify-between p-10">
		{#each options as l}
			<div class="w-4/12 text-center p-2 md:p-5">
				<button
					class="border-2 aspect-square inline-block w-20 max-w-[100%] text-2xl font-semibold
        rounded-lg transition-all hover:bg-gray-100"
					class:active={userAnswer === l}
					on:click={() => select(l)}
				>
					{l}
				</button>
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.active {
		@apply bg-teal-600 hover:bg-teal-600 text-white border-0;
	}
</style>
