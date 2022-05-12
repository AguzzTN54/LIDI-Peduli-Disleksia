<script>
	import { activeIndex, quizzes } from '$lib/stores/test-store';

	$: quiz = $quizzes[$activeIndex];

	const select = (l) => {
		quizzes.update((arr) => {
			return arr.map((d) => {
				if (d.letter !== quiz.letter) return d;
				d.answered = true;
				d.answer = l;
				return d;
			});
		});
	};
</script>

{#if !!quiz}
	<div class="flex flex-col justify-evenly bg-white rounded-3xl w-full h-full">
		<div class="flex flex-col items-center justify-center sm:p-5 pt-10 mt-5">
			<div class="text-[10em] md:text-[15em] leading-[.8em] font-riangriung sm:mt-10">
				{quiz.letter}
			</div>
			<p class="text-center">Pilih Huruf yang sama dengan gambar di atas</p>
		</div>
		<div class="flex flex-wrap justify-between p-10">
			{#each quiz.options as l}
				<div class="w-4/12 text-center p-2 md:p-5">
					<button
						class="border-2 aspect-square inline-block w-20 max-w-[100%] text-2xl font-semibold
          rounded-lg transition-all hover:bg-gray-100"
						class:active={quiz.answer === l}
						on:click={() => select(l)}
					>
						{l}
					</button>
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.active {
		@apply bg-teal-600 text-white border-0;
	}
</style>
