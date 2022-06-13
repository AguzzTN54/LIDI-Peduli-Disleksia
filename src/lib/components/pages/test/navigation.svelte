<script>
	import { calculateTestScore } from '$lib/functions/quizzes/test-score';

	import { activeIndex, quizzes } from '$lib/stores/test-store';

	$: readyToSubmit = !$quizzes.map(({ answered }) => !!answered).includes(false);

	const previous = () => {
		if ($activeIndex < 1) return;
		const index = $activeIndex - 1;
		activeIndex.set(index);
	};

	const next = () => {
		if ($activeIndex >= $quizzes.length - 1) return;
		const index = $activeIndex + 1;
		activeIndex.set(index);
	};
</script>

{#if readyToSubmit}
	<div class="w-full p-2 pt-0 text-center">
		<button class="pl-5 pr-5 block w-full" on:click={() => calculateTestScore($quizzes)}>
			Kirim
		</button>
	</div>
{:else}
	<div class="w-1/2 p-2 pt-0 text-center">
		{#if $activeIndex > 0}
			<button on:click={previous}>Sebelumnya</button>
		{/if}
	</div>
	<div class="w-1/2 p-2 pt-0 text-center">
		{#if !($activeIndex >= $quizzes.length - 1)}
			<button on:click={next}>Selanjutnya</button>
		{/if}
	</div>
{/if}

<style lang="postcss">
	button {
		@apply p-2 pr-5 pl-5 mt-3 sm:mt-5 sm:mb-3 rounded-full text-base text-ellipsis whitespace-nowrap overflow-hidden
        bg-teal-700 text-white hover:bg-teal-800 transition-all active:scale-95;
	}
</style>
